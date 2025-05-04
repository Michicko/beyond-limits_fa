"use server";
import { Schema } from "@/amplify/data/resource";
import { checkUniqueField, createEntityFactory } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type League = Schema["League"]["type"];

export const createLeague = async (formData: FormData) => {
  const base = formDataToObject<League>(formData);
  const leagueCreator = createEntityFactory<League, League>();

  return await leagueCreator({
    modelName: "League",
    input: base,
    selectionSet: ["id", "competitionNameSeason"],
    validate: async (input) => {
      if (
        (
          await checkUniqueField("League", {
            competitionNameSeason: input.competitionNameSeason.toLowerCase(),
          })
        ).length > 0
      ) {
        return {
          status: "error",
          valid: false,
          message: `name "${input.competitionNameSeason}" already exists.`,
        };
      }
      return { valid: true };
    },
    preprocess: (input) => ({
      ...input,
      teams: JSON.parse(formData.get("teams") as string),
    }),
  });
};

export async function updateLeague(formData: FormData) {
  const body = formDataToObject<League>(formData);

  try {
    const { data, errors } = await cookiesClient.models.League.update(body, {
      selectionSet: ["id"],
    });

    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}
