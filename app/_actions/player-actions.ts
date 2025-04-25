"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntityFactory,
  deleteEntity,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";

type Player = Schema["Player"]["type"];

export const createPlayer = async (formData: FormData) => {
  const base = formDataToObject<Player>(formData);
  const playerCreator = createEntityFactory<Player, Player>();

  return await playerCreator({
    modelName: "Player",
    input: base,
    selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
    pathToRevalidate: "/cp/players",
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
  });
};

export async function deletePlayer(id: string) {
  return await deleteEntity({
    id,
    modelName: "Player",
    pathToRevalidate: "/cp/players",
  });
}
