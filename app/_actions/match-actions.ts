"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Match = Schema["Match"]["type"];

export const getMatches = async (nextToken?: string | null) => {
  return cookiesClient.models.Match.list({
    selectionSet: [
      "id",
      "status",
      "competitionSeasonId",
      "competitionSeason.id",
      "competitionSeason.logo",
      "competitionSeason.name",
      "competitionSeason.season",
      "date",
      "time",
      "venue",
      "status",
      "aboutKeyPlayer",
      "keyPlayerId",
      "aboutMvp",
      "mvpId",
      "time",
      "status",
      "review",
      "report",
      "lineup",
      "substitutes",
      "homeTeam.*",
      "awayTeam.*",
      "coach.name",
      "coach.role",
      "scorers",
      "createdAt"
    ],
    nextToken,
    limit: 25,
    authMode: "userPool",
    sortDirection: "DESC",
  });
};

export const createMatch = async (formData: FormData) => {
  const base = formDataToObject<Match>(formData);
  const matchCreator = createEntityFactory<Match, Match>();

  return await matchCreator({
    modelName: "Match",
    input: base,
    selectionSet: ["id", "homeTeam.*", "awayTeam.*"],
    pathToRevalidate: "/cp/matches",
    preprocess: (input) => ({
      ...input,
      lineup: JSON.parse(formData.get("lineup") as string),
      coach: JSON.parse(formData.get("coach") as string),
      substitutes: JSON.parse(formData.get("substitutes") as string),
      homeTeam: JSON.parse(formData.get("homeTeam") as string),
      awayTeam: JSON.parse(formData.get("awayTeam") as string),
    }),
  });
};

export const updateMatch = async (id: string, formData: FormData) => {
  const base = formDataToObject<Match>(formData);
  const positionUpdater = updateEntityFactory<Match, Match>();

  return await positionUpdater({
    modelName: "Match",
    id,
    input: base,
    selectionSet: ["id", "homeTeam.*", "awayTeam.*"],
    pathToRevalidate: "/cp/matches",
    preprocess: (input) => ({
      ...input,
      lineup: JSON.parse(formData.get("lineup") as string),
      coach: JSON.parse(formData.get("coach") as string),
      substitutes: JSON.parse(formData.get("substitutes") as string),
      homeTeam: JSON.parse(formData.get("homeTeam") as string),
      awayTeam: JSON.parse(formData.get("awayTeam") as string),
    }),
  });
};

export async function deleteMatch(id: string) {
  return await deleteEntity({
    id,
    modelName: "Match",
    pathToRevalidate: "/cp/matches",
  });
}
