"use server";
import { Schema } from "@/amplify/data/resource";
import {
  checkUniqueField,
  createEntityFactory,
  getEntityFactory,
  getOneEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type CompetitionSeason = Schema["CompetitionSeason"]["type"];

export const getCompetitionSeasons = async (competitionId: string) => {
  const competitionSeasonGetter = getEntityFactory<CompetitionSeason>();

  return competitionSeasonGetter({
    modelName: "CompetitionSeason",
    limit: 150,
    selectionSet: [
      "id",
      "status",
      "name",
      "season",
      "type",
      "startingYear",
      "teamIds",
      "logo",
      "competitionId",
      "format.*",
    ],
    filter: {
      competitionId: {
        eq: competitionId,
      },
    },
  });
};

export const getCompetitionSeason = async (id: string) => {
  const teamGetter = getOneEntityFactory<CompetitionSeason>();

  return teamGetter({
    modelName: "CompetitionSeason",
    id,
    selectionSet: [
      "id",
      "name",
      "logo",
      "season",
      "type",
      "status",
      "teamIds",
      "standingIds",
    ],
  });
};

export const createCompetitionSeason = async (formData: FormData) => {
  const base = formDataToObject<CompetitionSeason>(formData);
  const competitionSeasonCreator = createEntityFactory<
    CompetitionSeason,
    CompetitionSeason
  >();

  return await competitionSeasonCreator({
    modelName: "CompetitionSeason",
    input: base,
    selectionSet: ["id", "name", "season", "createdAt"],
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons",
    preprocess: (input) => ({
      ...input,
      format: JSON.parse(formData.get("format") as string),
      teamIds: JSON.parse(formData.get("teamIds") as string),
    }),
    validate: async (base) => {
      if (
        (
          await checkUniqueField("CompetitionSeason", {
            season: base.season,
            name: base.name,
          })
        ).length > 0
      ) {
        return {
          status: "error",
          valid: false,
          message: `season "${base.season}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updateCompetitionSeason = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<CompetitionSeason>(formData);
  const competitionSeasonUpdater = updateEntityFactory<
    CompetitionSeason,
    CompetitionSeason
  >();

  return await competitionSeasonUpdater({
    modelName: "CompetitionSeason",
    id,
    input: base,
    selectionSet: ["id", "name", "season", "createdAt"],
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons/",
    preprocess: (input) => ({
      ...input,
      format: JSON.parse(formData.get("format") as string),
      teamIds: JSON.parse(formData.get("teamIds") as string),
    }),
    validate: async (input) => {
      if (input.season !== currentUniqueValue) {
        if (
          (
            await checkUniqueField("CompetitionSeason", {
              season: base.season,
              name: base.name,
            })
          ).length > 0
        ) {
          return {
            status: "error",
            valid: false,
            message: `season "${input.season}" already exists.`,
          };
        }
      }
      return { valid: true };
    },
  });
};

export async function deleteCompetitionSeason(id: string) {
  try {
    const { data: competitionSeason, errors } =
      await cookiesClient.models.CompetitionSeason.get({ id });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    if (!competitionSeason) {
      return {
        status: "error",
        message: "No competition season with that id" + id,
      };
    }
    const [
      { data: matches = [] },
      { data: playOffs = [] },
      { data: leagueRounds = [] },
      { data: standings = [] },
    ] = await Promise.all([
      cookiesClient.models.Match.list({
        filter: { competitionSeasonId: { eq: id } },
      }),
      cookiesClient.models.PlayOff.list({
        filter: { competitionSeasonId: { eq: id } },
      }),
      cookiesClient.models.LeagueRound.list({
        filter: { competitionSeasonId: { eq: id } },
      }),
      cookiesClient.models.Standing.list({
        filter: { competitionSeasonId: { eq: id } },
      }),
    ]);

    const anyExists =
      matches.length > 0 ||
      playOffs.length > 0 ||
      leagueRounds.length > 0 ||
      standings.length > 0;

    if (anyExists) {
      return {
        status: "error",
        message:
          "Cannot proceed with delete. Data exists for this competition season.",
      };
    }

    // Delete the CompetitionSeason itself
    await cookiesClient.models.CompetitionSeason.delete({ id });

    revalidatePath("/cp/competitions/[competitionId]/competition-seasons/");
    return {
      status: "success",
      data: null,
      message: "Competition season and all related data deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}
