"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  getEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type Competition = Schema["Competition"]["type"];

const checkUniqueCompetitionName = async (longName: string) => {
  const { data: existing } =
    await cookiesClient.models.Competition.listCompetitionByLongName({
      longName,
    });

  return existing;
};

export const getCompetitions = async () => {
  const competitionsGetter = getEntityFactory<Competition>();

  return competitionsGetter({
    modelName: "Competition",
    limit: 20,
    selectionSet: ["id", "logo", "shortName", "longName", "competitionType"],
  });
};

export const createCompetition = async (formData: FormData) => {
  const base = formDataToObject<Competition>(formData);
  const competitionCreator = createEntityFactory<Competition, Competition>();

  return await competitionCreator({
    modelName: "Competition",
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/competitions",
    validate: async (input) => {
      if ((await checkUniqueCompetitionName(input.longName)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `longName "${input.longName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updateCompetition = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<Competition>(formData);
  const competitionUpdater = updateEntityFactory<Competition, Competition>();

  return await competitionUpdater({
    modelName: "Competition",
    id,
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/competitions",
    validate: async (input) => {
      if (input.longName !== currentUniqueValue) {
        if ((await checkUniqueCompetitionName(input.longName)).length > 0) {
          return {
            status: "error",
            valid: false,
            message: `longName "${input.longName}" already exists.`,
          };
        }
      }
      return { valid: true };
    },
  });
};

export async function deleteCompetition(id: string) {
  try {
    const { data: competition, errors } =
      await cookiesClient.models.Competition.get({ id });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    if (!competition) {
      return {
        status: "error",
        message: "No competition with that id" + id,
      };
    }

    //  find competition season
    const { data: competitionSeasons } =
      await cookiesClient.models.CompetitionSeason.list({
        filter: {
          competitionId: {
            eq: id,
          },
        },
      });

    if (competitionSeasons && competitionSeasons.length > 0) {
      return {
        status: "error",
        message:
          "Please delete competition seasons associated with this competition",
      };
    }

    await cookiesClient.models.Competition.delete({ id });

    revalidatePath("/cp/competitions");
    return {
      status: "success",
      data: null,
      message: "Competition deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}
