"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Banner = Schema["Banner"]["type"];

export const getBanners = async () => {
  return cookiesClient.models.Banner.list({
    selectionSet: ["id", "url"],
    authMode: "userPool",
    sortDirection: "DESC",
  });
};

export const createBanner = async (formData: FormData) => {
  const base = formDataToObject<Banner>(formData);
  const bannerCreator = createEntityFactory<Banner, Banner>();

  return await bannerCreator({
    modelName: "Banner",
    input: base,
    selectionSet: ["id", "url"],
    pathToRevalidate: "/cp/banners",
  });
};
