"use server";
import { Schema } from "@/amplify/data/resource";
import {
  checkUniqueField,
  createEntityFactory,
  deleteEntity,
  getEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
type PlayerPosition = Schema["PlayerPosition"]["type"];

export const getPositions = async () => {
  const positionGetter = getEntityFactory<PlayerPosition>();

  return positionGetter({
    modelName: "PlayerPosition",
    limit: 20,
    selectionSet: ["id", "longName", "attributes"],
  });
};

export const createPosition = async (formData: FormData) => {
  const base = formDataToObject<PlayerPosition>(formData);
  const positionCreator = createEntityFactory<PlayerPosition, PlayerPosition>();

  return await positionCreator({
    modelName: "PlayerPosition",
    input: base,
    selectionSet: ["id", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/positions",
    preprocess: (input) => ({
      ...input,
      shortName: base.shortName.toLowerCase(),
      longName: base.longName.toLowerCase(),
      attributes: JSON.parse(formData.get("attributes") as string),
    }),
    validate: async (input) => {
      if (
        (
          await checkUniqueField("PlayerPosition",
            'longName', input.longName.toLowerCase()
          )
        ).length > 0
      ) {
        return {
          status: "error",
          valid: false,
          message: `shortName "${input.shortName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updatePosition = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<PlayerPosition>(formData);
  const positionUpdater = updateEntityFactory<PlayerPosition, PlayerPosition>();

  return await positionUpdater({
    modelName: "PlayerPosition",
    id,
    input: base,
    selectionSet: ["id", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/positions",
    preprocess: (input) => ({
      ...input,
      attributes: JSON.parse(formData.get("attributes") as string),
    }),
    validate: async (input) => {
      if (input.shortName !== currentUniqueValue) {
        if (
          (
            await checkUniqueField("PlayerPosition",
            'longName', input.longName.toLowerCase())
          ).length > 0
        ) {
          return {
            status: "error",
            valid: false,
            message: `shortName "${input.shortName}" already exists.`,
          };
        }
      }
      return { valid: true };
    },
  });
};

export async function deletePosition(id: string) {
  return await deleteEntity({
    id,
    modelName: "PlayerPosition",
    pathToRevalidate: "/cp/positions",
  });
}
