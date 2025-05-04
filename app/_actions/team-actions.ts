"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  getEntityFactory,
  getOneEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject, getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { deleteCloudinaryImage } from "./actions";

type Team = Schema["Team"]["type"];

const checkUniqueTeamName = async (longName: string) => {
  const { data: existing } = await cookiesClient.models.Team.listTeamByLongName(
    {
      longName,
    }
  );

  return existing;
};

export const getTeamsLazyLoaded = async () => {
  return cookiesClient.models.Team.list({
    selectionSet: [
      "id",
      "logo",
      "shortName",
      "longName",
      "isBeyondLimits",
      "stadium",
    ],
  });
};

export const getTeams = async () => {
  const teamsGetter = getEntityFactory<Team>();

  return teamsGetter({
    modelName: "Team",
    limit: 150,
    selectionSet: [
      "id",
      "logo",
      "longName",
      "shortName",
      "isBeyondLimits",
      "stadium",
    ],
  });
};

export const getTeam = async (id: string) => {
  const teamGetter = getOneEntityFactory<Team>();

  return teamGetter({
    modelName: "Team",
    id,
    selectionSet: [
      "id",
      "logo",
      "shortName",
      "longName",
      "isBeyondLimits",
      "stadium",
    ],
  });
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
    // postDelete: async () => {
    //   try {
    //     const publicId =  getCloudinaryPublicId(image)
    //      await deleteCloudinaryImage(publicId);
    //   } catch (error) {
    //     console.error("Error deleting images:", error);
    //   }
    // },
  });
}
