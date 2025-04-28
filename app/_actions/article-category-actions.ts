"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  getEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type ArticleCategory = Schema["ArticleCategory"]["type"];

const checkUniqueCategory = async (category: string) => {
  const { data: existing } =
    await cookiesClient.models.ArticleCategory.listArticleCategoryByCategory({
      category,
    });

  return existing;
};

export const getArticleCategories = async () => {
  const articleCategoriesGetter = getEntityFactory<ArticleCategory>();

  return articleCategoriesGetter({
    modelName: "ArticleCategory",
    limit: 20,
    selectionSet: ["id", "category"],
  });
};

export const createArticleCategory = async (formData: FormData) => {
  const base = formDataToObject<ArticleCategory>(formData);
  const articleCategoryCreator = createEntityFactory<
    ArticleCategory,
    ArticleCategory
  >();

  return await articleCategoryCreator({
    modelName: "ArticleCategory",
    input: base,
    selectionSet: ["id", "category"],
    pathToRevalidate: "/cp/article-categories",
    validate: async (input) => {
      if ((await checkUniqueCategory(input.category)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `category "${input.category}" already exists.`,
        };
      }

      return { valid: true };
    },
  });
};

export const updateArticleCategory = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<ArticleCategory>(formData);
  const articleUpdater = updateEntityFactory<
    ArticleCategory,
    ArticleCategory
  >();

  return await articleUpdater({
    modelName: "ArticleCategory",
    id,
    input: base,
    selectionSet: ["id", "category"],
    pathToRevalidate: "/cp/article-categories",
    validate: async (input) => {
      if (input.category !== currentUniqueValue) {
        if ((await checkUniqueCategory(input.category)).length > 0) {
          return {
            status: "error",
            valid: false,
            message: `category "${input.category}" already exists.`,
          };
        }
      }
      return { valid: true };
    },
  });
};

export async function deleteArticleCategory(id: string) {
  return await deleteEntity({
    id,
    modelName: "ArticleCategory",
    pathToRevalidate: "/cp/article-categories",
  });
}
