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
import { deleteCloudinaryImage } from "./actions";
import { cookiesClient } from "@/utils/amplify-utils";

type Competition = Schema["Competition"]["type"];

export const getCompetitions = async () => {
  const competitionsGetter = getEntityFactory<Competition>();

  return competitionsGetter({
    modelName: "Competition",
    limit: 20,
    selectionSet: [
      "id",
      "logo",
      "shortName",
      "longName",
      "type",
      "competitionSeasonIds",
      "trophyImage",
      "trophyArticleId",
    ],
  });
};

export const getCompetition = async (id: string) => {
  return (
    await cookiesClient.models.Competition.get(
      {
        id,
      },
      {
        selectionSet: ["id", "logo", "longName", "type"],
        authMode: "userPool",
      }
    )
  ).data;
};

export const createCompetition = async (formData: FormData) => {
  const base = formDataToObject<Competition>(formData);
  const competitionCreator = createEntityFactory<Competition, Competition>();

  return await competitionCreator({
    modelName: "Competition",
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/competitions",
    validate: async (input) => {
      if (
        (await checkUniqueField("Competition", { longName: input.longName }))
          .length > 0
      ) {
        return {
          status: "error",
          valid: false,
          message: `longName "${input.longName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updateCompetition = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<Competition>(formData);
  const competitionUpdater = updateEntityFactory<Competition, Competition>();

  return await competitionUpdater({
    modelName: "Competition",
    id,
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/competitions",
    validate: async (input) => {
      if (input.longName !== currentUniqueValue) {
        if (
          (await checkUniqueField("Competition", { longName: input.longName }))
            .length > 0
        ) {
          return {
            status: "error",
            valid: false,
            message: `longName "${input.longName}" already exists.`,
          };
        }
      }
      return { valid: true };
    },
  });
};

export async function deleteCompetition(id: string, images: string[]) {
  return await deleteEntity({
    id,
    modelName: "Competition",
    pathToRevalidate: "/cp/competitions",
    postDelete: async () => {
      try {
        for (const image of images) {
          await deleteCloudinaryImage(image);
        }
      } catch (error) {
        console.error("Error deleting images:", error);
      }
    },
  });
}
