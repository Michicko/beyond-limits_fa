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
import { revalidatePath } from "next/cache";

type Article = Schema["Article"]["type"];

export const filterArticle = async (text: string) => {
  return cookiesClient.models.Article.list({
    filter: {
      title: {
        contains: text,
      },
    },
    authMode: "userPool",
    selectionSet: ["id", "title"],
  });
};

export const getLazyLoadedArticles = async () => {
  return cookiesClient.models.Article.list({
    selectionSet: [
      "id",
      "title",
      "category",
      "status",
      "createdAt",
      "coverImage",
    ],
    authMode: "userPool",
    sortDirection: "DESC",
  });
};

export const getArticle = async (id: string) => {
  return cookiesClient.models.Article.get(
    {
      id,
    },
    {
      selectionSet: ["id", "title"],
      authMode: "userPool",
    }
  );
};

export const createArticle = async (formData: FormData) => {
  const base = formDataToObject<Article>(formData);
  const articleCreator = createEntityFactory<Article, Article>();

  return await articleCreator({
    modelName: "Article",
    input: base,
    selectionSet: ["id", "title", "content", "coverImage"],
    pathToRevalidate: "/cp/articles",
    preprocess: (input) => ({
      ...input,
      title: base.title.toLowerCase(),
    }),
    validate: async (input) => {
      if (
        (await checkUniqueField("Article", { title: input.title })).length > 0
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

export const updateArticle = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<Article>(formData);
  const articleUpdater = updateEntityFactory<Article, Article>();

  return await articleUpdater({
    modelName: "Article",
    id,
    input: base,
    selectionSet: ["id", "title", "content", "coverImage"],
    pathToRevalidate: "/cp/articles",
    preprocess: (input) => ({
      ...input,
      title: base.title.toLowerCase(),
    }),
    validate: async (input) => {
      if (input.title !== currentUniqueValue) {
        if (
          (await checkUniqueField("Article", { title: input.title })).length > 0
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

export async function publishArticle(formData: FormData) {
  const body = formDataToObject<Article>(formData);

  const { data, errors } = await cookiesClient.models.Article.update(body, {
    selectionSet: ["id", "title", "content", "coverImage"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/articles");
  return {
    status: "success",
    data,
  };
}

export async function deleteArticle(id: string) {
  return await deleteEntity({
    id,
    modelName: "Article",
    pathToRevalidate: "/cp/articles",
  });
}
