"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Team = Schema["Team"]["type"];

const checkUniqueTeamName = async (longName: string) => {
  const { data: existing } = await cookiesClient.models.Team.listTeamByLongName(
    {
      longName,
    }
  );

  return existing;
};

export const createTeam = async (formData: FormData) => {
  const base = formDataToObject<Team>(formData);
  const teamCreator = createEntityFactory<Team, Team>();

  return await teamCreator({
    modelName: "Team",
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/teams",
    validate: async (input) => {
      if ((await checkUniqueTeamName(input.longName)).length > 0) {
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

export const updateTeam = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<Team>(formData);
  const teamUpdater = updateEntityFactory<Team, Team>();

  return await teamUpdater({
    modelName: "Team",
    id,
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/teams",
    validate: async (input) => {
      if (input.longName !== currentUniqueValue) {
        if ((await checkUniqueTeamName(input.longName)).length > 0) {
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

export async function deleteTeam(id: string) {
  return await deleteEntity({
    id,
    modelName: "Team",
    pathToRevalidate: "/cp/teams",
  });
}
