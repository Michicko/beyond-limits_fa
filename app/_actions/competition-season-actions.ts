"use server";
import { Schema } from "@/amplify/data/resource";
import { Nullable } from "@/lib/definitions";
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

export const getCompetitionSeasonLazyLoaded = async (id: string) => {
  return cookiesClient.models.CompetitionSeason.get(
    {
      id,
    },
    {
      selectionSet: [
        "id",
        "name",
        "logo",
        "season",
        "type",
        "status",
        "cupId",
        "leagueId",
        "matches.*",
        "league.*",
        "cup.playOffs.*",
        "league.standings.*",
        "league.leagueRounds.*",
        "isWinner",
      ],
    }
  );
};

export const getCompetitionSeasonsForCompetition = async (
  competitionId: string,
  nextToken?: string | null
) => {
   return cookiesClient.models.CompetitionSeason.list({
    filter: {
      competitionId: {
        eq: competitionId
      }
    },
    selectionSet: [
      "id",
      "status",
      "name",
      "season",
      "matches.status",
      "isWinner",
      "cupId",
      "leagueId",
      "createdAt"
    ],
      nextToken,
      limit: 15,
      authMode: "userPool",
      sortDirection: "DESC",
    });
};

export const getCompetitionSeasons = async (competitionId: string) => {
  const competitionSeasonGetter = getEntityFactory<CompetitionSeason>();

  return competitionSeasonGetter({
    modelName: "CompetitionSeason",
    limit: 200,
    selectionSet: ["id", "status", "season"],
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
      "cupId",
      "leagueId",
      "matches.*",
      "league.*",
      "cup.playOffs.*",
      "league.standings.*",
      "league.leagueRounds.*",
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
    validate: async (base) => {
      if (
        (
          await checkUniqueField("CompetitionSeason", {
            name: base.name.toLowerCase(),
            season: base.season,
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
      isWinner: JSON.parse(formData.get("isWinner") as string),
    }),
  });
};

export async function endCompetitionSeason(
  seasonId: string,
  resources: { cupId?: Nullable<string>; leagueId?: Nullable<string> }
) {
  try {
    const { data, errors } =
      await cookiesClient.models.CompetitionSeason.update(
        { id: seasonId, status: "COMPLETED" },
        {
          selectionSet: ["id", "name", "season"],
        }
      );

    if (resources.cupId) {
      await cookiesClient.models.Cup.update({
        id: resources.cupId,
        status: "COMPLETED",
      });
    }

    if (resources.leagueId) {
      await cookiesClient.models.League.update({
        id: resources.leagueId,
        status: "COMPLETED",
      });
    }

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    revalidatePath("/cp/competitions/[competitionId]/competition-seasons");
    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}
