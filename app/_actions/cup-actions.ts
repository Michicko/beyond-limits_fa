"use server";
import { Schema } from "@/amplify/data/resource";
import { checkUniqueField, createEntityFactory } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Cup = Schema["Cup"]["type"];

export const createCup = async (formData: FormData) => {
  const base = formDataToObject<Cup>(formData);
  const cupCreator = createEntityFactory<Cup, Cup>();

  return await cupCreator({
    modelName: "Cup",
    input: base,
    selectionSet: ["id", "competitionNameSeason"],
    validate: async (input) => {
      if (
        (
          await checkUniqueField("Cup", {
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
  });
};

export async function updateCup(formData: FormData) {
  const body = formDataToObject<Cup>(formData);

  try {
    const { data, errors } = await cookiesClient.models.Cup.update(body, {
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
