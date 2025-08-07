"use server";
import { Schema } from "@/amplify/data/resource";
import {
  checkUniqueField,
  createEntityFactory,
  deleteEntity,
  getEntityFactory,
  getOneEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject, getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";

type Team = Schema["Team"]["type"];

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

export const getTeams = async (nextToken?: string | null) => {
  return cookiesClient.models.Team.list({
    selectionSet: [
      "id",
      "logo",
      "shortName",
      "longName",
      "isBeyondLimits",
      "stadium",
      "createdAt",
    ],
    nextToken,
    limit: 25,
    authMode: "userPool",
    sortDirection: "DESC",
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
    preprocess: (input) => ({
      ...input,
      longName: input.longName.toLowerCase(),
      shortName: input.shortName.toLowerCase(),
    }),
    validate: async (input) => {
      if (
        (
          await checkUniqueField(
            "Team",
            "longName",
            input.longName.toLowerCase()
          )
        ).length > 0
      ) {
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
    preprocess: (input) => ({
      ...input,
      longName: input.longName.toLowerCase(),
      shortName: input.shortName.toLowerCase(),
    }),
    validate: async (input) => {
      if (input.longName !== currentUniqueValue) {
        if (
          (
            await checkUniqueField(
              "Team",
              "longName",
              input.longName.toLowerCase()
            )
          ).length > 0
        ) {
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

export async function updateTeamInAllStanding(
  teamId: string,
  newLogo: string,
  auth: boolean
) {
  try {
    const { data } = await cookiesClient.models.Standing.list({
      filter: {
        teamId: {
          eq: teamId,
        },
      },
      authMode: auth ? "userPool" : "iam",
    });

    if (data.length > 0) {
    }
  } catch (error) {
    return {
      status: "error",
      message: `${(error as Error).message}`,
    };
  }
}

export async function deleteTeam(id: string) {
  return await deleteEntity({
    id,
    modelName: "Team",
    pathToRevalidate: "/cp/teams",
  });
}
