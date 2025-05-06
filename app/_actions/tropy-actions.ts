"use server";
import { Schema } from "@/amplify/data/resource";
import {
  checkUniqueField,
  createEntityFactory,
  deleteEntity,
  getEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject, getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { deleteCloudinaryImage } from "./actions";

type Trophy = Schema["Trophy"]["type"];

export const getTrophies = async () => {
  return cookiesClient.models.Trophy.list({
    selectionSet: [
      "id",
      "image",
      "competition.longName",
      "trophyName",
      "articleId",
      "competitionId",
    ],
    authMode: "userPool",
  });
};

export const createTrophy = async (formData: FormData) => {
  const base = formDataToObject<Trophy>(formData);
  const trophyCreator = createEntityFactory<Trophy, Trophy>();

  console.log(base);

  return await trophyCreator({
    modelName: "Trophy",
    input: base,
    selectionSet: ["id", "image", "trophyName", "competition.longName"],
    pathToRevalidate: "/cp/trophies",
    validate: async (input) => {
      if (
        (
          await checkUniqueField("Trophy", {
            trophyName: input.trophyName.toLowerCase(),
          })
        ).length > 0
      ) {
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

export const updateTrophy = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string,
) => {
  const base = formDataToObject<Trophy>(formData);
  const trophyUpdater = updateEntityFactory<Trophy, Trophy>();

  return await trophyUpdater({
    modelName: "Trophy",
    id,
    input: base,
    selectionSet: [
      "id",
      "image",
      "trophyName",
      "competition.longName",
      "articleId",
    ],
    pathToRevalidate: "/cp/trophies",
    validate: async (input) => {
      if (input.trophyName !== currentUniqueValue) {
        if (
          (
            await checkUniqueField("Trophy", {
              trophyName: input.trophyName.toLowerCase(),
            })
          ).length > 0
        ) {
          return {
            status: "error",
            valid: false,
            message: `trophyName "${input.trophyName}" already exists.`,
          };
        }
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
