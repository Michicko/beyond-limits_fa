"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntity,
  deleteEntity,
  updateEntity,
} from "@/lib/factoryFunctions";
import { cookiesClient } from "@/utils/amplify-utils";

type Nullable<T> = T | null;
type PlayerPosition = Schema["PlayerPosition"]["type"];
type Season = Schema["Season"]["type"];
type Competition = Schema["Competition"]["type"];

export async function createPosition(
  formData: FormData,
  attributes: string[] | Nullable<string>[] = []
) {
  return await createEntity<PlayerPosition>({
    modelName: "PlayerPosition",
    formData,
    uniqueFieldName: "shortName",
    uniqueCheckFn: (shortName) =>
      cookiesClient.models.PlayerPosition.listPlayerPositionByShortName({
        shortName,
      }),
    attributes,
    selectionSet: ["id", "shortName", "longName", "attributes", "createdAt"],
    revalidatePath: "/cp/positions",
  });
}

export async function updatePosition(
  id: string,
  formData: FormData,
  attributes: string[] | Nullable<string>[] = [],
  currentUniqueValue: string
) {
  return await updateEntity<PlayerPosition>({
    modelName: "PlayerPosition",
    id,
    formData,
    uniqueFieldName: "shortName",
    uniqueCheckFn: (shortName) =>
      cookiesClient.models.PlayerPosition.listPlayerPositionByShortName({
        shortName,
      }),
    currentUniqueValue,
    attributes,
    selectionSet: ["id", "shortName", "longName", "attributes", "createdAt"],
    revalidatePath: "/cp/positions",
  });
}

export async function deletePosition(id: string) {
  return await deleteEntity({
    id,
    modelName: "PlayerPosition",
    pathToRevalidate: "/cp/positions",
  });
}

export async function createSeason(formData: FormData) {
  return await createEntity<Season>({
    modelName: "Season",
    formData,
    uniqueFieldName: "season",
    uniqueCheckFn: (season) =>
      cookiesClient.models.Season.listSeasonBySeason({
        season,
      }),
    selectionSet: ["id", "season", "createdAt"],
    revalidatePath: "/cp/seasons",
  });
}

export async function updateSeason(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<Season>({
    modelName: "Season",
    id,
    formData,
    uniqueFieldName: "season",
    uniqueCheckFn: (season) =>
      cookiesClient.models.Season.listSeasonBySeason({
        season,
      }),
    currentUniqueValue,
    selectionSet: ["id", "season", "createdAt"],
    revalidatePath: "/cp/seasons",
  });
}

export async function deleteSeason(id: string) {
  return await deleteEntity({
    id,
    modelName: "Season",
    pathToRevalidate: "/cp/seasons",
  });
}

export async function createCompetition(formData: FormData) {
  return await createEntity<Competition>({
    modelName: "Competition",
    formData,
    uniqueFieldName: "longName",
    uniqueCheckFn: (longName) =>
      cookiesClient.models.Competition.listCompetitionByLongName({
        longName,
      }),
    selectionSet: ["id", "logo", "shortName", "longName", "competitionType"],
    revalidatePath: "/cp/competitions",
  });
}

export async function updateCompetition(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<Competition>({
    modelName: "Competition",
    id,
    formData,
    uniqueFieldName: "longName",
    uniqueCheckFn: (longName) =>
      cookiesClient.models.Competition.listCompetitionByLongName({
        longName,
      }),
    currentUniqueValue,
    selectionSet: ["id", "logo", "shortName", "longName", "competitionType"],
    revalidatePath: "/cp/competitions",
  });
}

export async function deleteCompetition(id: string) {
  return await deleteEntity({
    id,
    modelName: "Competition",
    pathToRevalidate: "/cp/competitions",
  });
}
