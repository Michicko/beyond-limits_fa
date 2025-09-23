"use server";
import { IMatchFormData } from "@/lib/definitions";
import { deleteEntity, processPromise } from "@/lib/factoryFunctions";
import { cookiesClient } from "@/utils/amplify-utils";

export const getMatches = async (nextToken?: string | null) => {
  return cookiesClient.models.Match.listMatchByConstantKeyAndCreatedAt(
    {
      constantKey: "all",
    },
    {
      selectionSet: [
        "id",
        "competitionSeasonId",
        "competitionSeason.id",
        "competitionSeason.logo",
        "competitionSeason.shortName",
        "date",
        "time",
        "venue",
        "status",
        "homeTeam.*",
        "awayTeam.*",
        "createdAt",
      ],
      nextToken,
      limit: 25,
      authMode: "userPool",
      sortDirection: "DESC",
    }
  );
};

export const createMatch = async (matchData: IMatchFormData) => {
  const createMatchPromise = cookiesClient.models.Match.create(
    {
      ...matchData,
      id: undefined,
      review: JSON.stringify(matchData.review),
      report: JSON.stringify(matchData.report),
      scorers: JSON.stringify(matchData.scorers),
    },
    {
      selectionSet: ["homeTeam.longName", "awayTeam.longName"],
      authMode: "userPool",
    }
  );
  return await processPromise(createMatchPromise);
};

export const updateMatch = async (matchData: IMatchFormData) => {
  const updateMatchPromise = cookiesClient.models.Match.update(
    {
      ...matchData,
      id: matchData.id,
      review: JSON.stringify(matchData.review),
      report: JSON.stringify(matchData.report),
      scorers: JSON.stringify(matchData.scorers),
    },
    {
      selectionSet: ["homeTeam.longName", "awayTeam.longName"],
      authMode: "userPool",
    }
  );
  return await processPromise(updateMatchPromise);
};

export async function deleteMatch(id: string) {
  return await deleteEntity({
    id,
    modelName: "Match",
    pathToRevalidate: "/cp/matches",
  });
}
