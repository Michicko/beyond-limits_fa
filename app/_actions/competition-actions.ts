"use server";
import { Schema } from "@/amplify/data/resource";
import {
  checkUniqueField,
  createEntityFactory,
  getEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject, getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImage } from "./actions";

type Competition = Schema["Competition"]["type"];

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
    preprocess: (input) => ({
      ...input,
      longName: input.longName.toLowerCase(),
      shortName: input.shortName.toLowerCase(),
    }),
    validate: async (input) => {
      if (
        (
          await checkUniqueField("Competition", {
            longName: base.longName.toLowerCase(),
          })
        ).length > 0
      ) {
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
    preprocess: (input) => ({
      ...input,
      longName: input.longName.toLowerCase(),
      shortName: input.shortName.toLowerCase(),
    }),
    validate: async (input) => {
      if (input.longName !== currentUniqueValue) {
        if (
          (
            await checkUniqueField("Competition", {
              longName: base.longName.toLowerCase(),
            })
          ).length > 0
        ) {
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

    const public_id = getCloudinaryPublicId(competition.logo);
    await cookiesClient.models.Competition.delete({ id });
    if (public_id) {
      await deleteCloudinaryImage(public_id);
    }

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
