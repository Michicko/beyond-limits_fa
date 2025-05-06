"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  getEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject, getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { deleteCloudinaryImage } from "./actions";

type Player = Schema["Player"]["type"];

export const getAgeGroups = () => {
  return cookiesClient.enums.AgeGroup.values();
};

export const getPlayersLazyLoaded = async () => {
  return cookiesClient.models.Player.list({
    selectionSet: [
      "id",
      "firstname",
      "lastname",
      "ageGroup",
      "homeKit",
      "squadNo",
      "playerPosition.shortName",
      "playerPosition.longName",
      "dob",
      "dominantFoot",
      "status",
      "isTwoFooted",
      "playerPosition.id",
      "awayKit",
    ],
  });
};

export const getPlayers = async () => {
  const playersGetter = getEntityFactory<Player>();

  return playersGetter({
    modelName: "Player",
    limit: 200,
    selectionSet: [
      "id",
      "firstname",
      "lastname",
      "ageGroup",
      "homeKit",
      "squadNo",
      "playerPosition.shortName",
      "playerPosition.longName",
      "dob",
      "dominantFoot",
      "status",
      "isTwoFooted",
      "playerPosition.id",
      "awayKit",
    ],
  });
};

export const createPlayer = async (formData: FormData) => {
  const base = formDataToObject<Player>(formData);
  const playerCreator = createEntityFactory<Player, Player>();

  return await playerCreator({
    modelName: "Player",
    input: base,
    selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
    pathToRevalidate: "/cp/players",
    preprocess: (input) => ({
      ...input,
      firstname: base.firstname.toLowerCase(),
      lastname: base.lastname.toLowerCase(),
    }),
  });
};

export const updatePlayer = async (id: string, formData: FormData) => {
  const base = formDataToObject<Player>(formData);
  const playerUpdater = updateEntityFactory<Player, Player>();

  return await playerUpdater({
    modelName: "Player",
    id,
    input: base,
    selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
    pathToRevalidate: "/cp/players",
    preprocess: (input) => ({
      ...input,
      firstname: base.firstname.toLowerCase(),
      lastname: base.lastname.toLowerCase(),
    }),
  });
};

export async function deletePlayer(id: string) {
  return await deleteEntity({
    id,
    modelName: "Player",
    pathToRevalidate: "/cp/players",
  });
}
