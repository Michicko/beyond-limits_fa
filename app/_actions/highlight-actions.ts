"use server";
import { Schema } from "@/amplify/data/resource";
import {
  checkUniqueField,
  createEntityFactory,
  deleteEntity,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Highlight = Schema["Highlight"]["type"];

export const getHighlights = async () => {
  return cookiesClient.models.Highlight.list({
    selectionSet: ["id", "title", "coverImage", "createdAt", "videoId", "tags"],
  });
};

export const createHighlight = async (formData: FormData) => {
  const base = formDataToObject<Highlight>(formData);
  const highlightCreator = createEntityFactory<Highlight, Highlight>();

  return await highlightCreator({
    modelName: "Highlight",
    input: base,
    selectionSet: ["id", "title", "coverImage"],
    pathToRevalidate: "/cp/highlights",
    preprocess: (input) => ({
      ...input,
      title: input.title.toLowerCase(),
      tags: JSON.parse(formData.get("tags") as string),
    }),
    validate: async (input) => {
      if (
        (
          await checkUniqueField("Highlight", {
            title: input.title.toLowerCase(),
          })
        ).length > 0
      ) {
        return {
          status: "error",
          valid: false,
          message: `title "${input.title}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updateHighlight = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string,
) => {
  const base = formDataToObject<Highlight>(formData);
  const highlightUpdater = updateEntityFactory<Highlight, Highlight>();

  return await highlightUpdater({
    modelName: "Highlight",
    id,
    input: base,
    selectionSet: ["id", "title", "coverImage"],
    pathToRevalidate: "/cp/highlights",
    preprocess: (input) => ({
      ...input,
      title: input.title.toLowerCase(),
      tags: JSON.parse(formData.get("tags") as string),
    }),
    validate: async (input) => {
      if (input.title !== currentUniqueValue) {
        if (
          (
            await checkUniqueField("Highlight", {
              title: input.title.toLowerCase(),
            })
          ).length > 0
        ) {
          return {
            status: "error",
            valid: false,
            message: `title "${input.title}" already exists.`,
          };
        }
      }

      return { valid: true };
    },
  });
};

export async function deleteHighlight(id: string) {
  return await deleteEntity({
    id,
    modelName: "Highlight",
    pathToRevalidate: "/cp/highlights",
    // postDelete: async () => {
    //   try {
    //     const publicId = getCloudinaryPublicId(image);
    //     if (publicId) {
    //       await deleteCloudinaryImage(publicId);
    //     }
    //   } catch (error) {
    //     console.error("Error deleting images:", error);
    //   }
    // },
  });
}
