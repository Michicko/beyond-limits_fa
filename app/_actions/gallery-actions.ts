"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Visual = Schema["Visual"]["type"];

export const getVisuals = async (nextToken?: string | null) => {
  return cookiesClient.models.Visual.list({
    selectionSet: ["id", "url", "alt"],
    nextToken,
    limit: 25,
    authMode: "userPool",
    sortDirection: "DESC",
  });
};

export const createVisual = async (formData: FormData) => {
  const base = formDataToObject<Visual>(formData);
  const visualCreator = createEntityFactory<Visual, Visual>();

  return await visualCreator({
    modelName: "Visual",
    input: base,
    selectionSet: ["id", "url", "alt"],
    pathToRevalidate: "/cp/visuals",
  });
};
