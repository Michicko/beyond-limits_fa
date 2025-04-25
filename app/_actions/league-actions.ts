import { Schema } from "@/amplify/data/resource";
import { createEntityFactory } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type League = Schema["League"]["type"];

const checkUniqueLeague = async (competitionNameSeason: string) => {
  const { data: existing } =
    await cookiesClient.models.League.listLeagueByCompetitionNameSeason({
      competitionNameSeason,
    });

  return existing;
};

export const createLeague = async (formData: FormData) => {
  const base = formDataToObject<League>(formData);
  const leagueCreator = createEntityFactory<League, League>();

  return await leagueCreator({
    modelName: "League",
    input: base,
    selectionSet: ["id", "competitionNameSeason"],
    validate: async (input) => {
      const uniqueLeague = await checkUniqueLeague(input.competitionNameSeason);
      if (uniqueLeague && uniqueLeague.length > 0) {
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
