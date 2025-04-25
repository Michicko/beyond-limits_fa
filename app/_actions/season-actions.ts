"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Season = Schema["Season"]["type"];

const checkUniqueSeason = async (season: string) => {
  const { data: existing } =
    await cookiesClient.models.Season.listSeasonBySeason({
      season,
    });

  return existing;
};

export const createSeason = async (formData: FormData) => {
  const base = formDataToObject<Season>(formData);
  const seasonCreator = createEntityFactory<Season, Season>();

  return await seasonCreator({
    modelName: "Season",
    input: base,
    selectionSet: ["id", "season", "createdAt"],
    pathToRevalidate: "/cp/seasons",
    validate: async (input) => {
      if ((await checkUniqueSeason(input.season)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `season "${input.season}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updateSeason = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<Season>(formData);
  const seasonUpdater = updateEntityFactory<Season, Season>();

  return await seasonUpdater({
    modelName: "Season",
    id,
    input: base,
    selectionSet: ["id", "season", "createdAt"],
    pathToRevalidate: "/cp/seasons",
    validate: async (input) => {
      if (input.season !== currentUniqueValue) {
        if ((await checkUniqueSeason(input.season)).length > 0) {
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

export async function deleteSeason(id: string) {
  return await deleteEntity({
    id,
    modelName: "Season",
    pathToRevalidate: "/cp/seasons",
  });
}
