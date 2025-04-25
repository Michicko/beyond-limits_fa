"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory, deleteEntity } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Trophy = Schema["Trophy"]["type"];

const checkUniqueTrophyName = async (trophyName: string) => {
  const { data: existing } =
    await cookiesClient.models.Trophy.listTrophyByTrophyName({
      trophyName,
    });

  return existing;
};

export const createTrophy = async (formData: FormData) => {
  const base = formDataToObject<Trophy>(formData);
  const trophyCreator = createEntityFactory<Trophy, Trophy>();

  return await trophyCreator({
    modelName: "Trophy",
    input: base,
    selectionSet: ["id", "image", "trophyName", "competition.longName"],
    pathToRevalidate: "/cp/trophies",
    validate: async (input) => {
      if ((await checkUniqueTrophyName(input.trophyName)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `trophyName "${input.trophyName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export async function deleteTrophy(id: string) {
  return await deleteEntity({
    id,
    modelName: "Trophy",
    pathToRevalidate: "/cp/trophies",
  });
}
