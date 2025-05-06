"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  updateEntityFactory,
  getEntityFactory,
  checkUniqueField,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Season = Schema["Season"]["type"];

export const fetchSeasons = async () => {
  const seasonsGetter = getEntityFactory<Season>();

  return seasonsGetter({
    modelName: "Season",
    limit: 50,
    selectionSet: ["id", "season", "createdAt"],
  });
};

export const getSeason = async (id: string) => {
  return cookiesClient.models.Season.get(
    {
      id,
    },
    {
      selectionSet: ["id", "season", "createdAt"],
    },
  );
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
      if (
        (await checkUniqueField("Season", { season: input.season })).length > 0
      ) {
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
  currentUniqueValue: string,
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
        if (
          (await checkUniqueField("Season", { season: input.season })).length >
          0
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

export async function deleteSeason(id: string) {
  return await deleteEntity({
    id,
    modelName: "Season",
    pathToRevalidate: "/cp/seasons",
  });
}
