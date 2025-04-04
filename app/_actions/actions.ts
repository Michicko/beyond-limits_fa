"use server";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type Nullable<T> = T | null;

export async function createPosition(
  formData: FormData,
  attrs: string[] | Nullable<string>[]
) {
  const shortName = formData.get("shortName")?.toString() || "";

  // Query to check if `shortName` already exists
  const existingPosition =
    await cookiesClient.models.PlayerPosition.listPlayerPositionByShortName({
      shortName,
    });

  // If a record with the same shortName exists, throw an error
  if (existingPosition.data.length > 0) {
    throw new Error("player position with this short name already exists.");
  }

  const { data } = await cookiesClient.models.PlayerPosition.create(
    {
      shortName,
      longName: formData.get("longName")?.toString() || "",
      attributes: attrs ? attrs : ([] as Nullable<string>[]),
    },
    { authMode: "userPool" }
  );

  return data
    ? {
        id: data.id,
        shortName: data.shortName,
        longName: data.longName,
        attributes: data.attributes,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    : null;
}

export async function updatePosition(
  id: string,
  formData: FormData,
  attrs: string[] | Nullable<string>[]
) {
  const shortName = formData.get("shortName")?.toString() || "";
  const { data } = await cookiesClient.models.PlayerPosition.update(
    {
      id,
      shortName,
      longName: formData.get("longName")?.toString() || "",
      attributes: attrs ? attrs : ([] as Nullable<string>[]),
    },
    { authMode: "userPool" }
  );

  return data
    ? {
        id: data.id,
        shortName: data.shortName,
        longName: data.longName,
        attributes: data.attributes,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    : null;
}

export async function deletePosition(id: string) {
  try {
    await cookiesClient.models.PlayerPosition.delete(
      {
        id,
      },
      { authMode: "userPool" }
    );

    revalidatePath("/cp/positions");
    return {
      status: "success",
      message: "deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      error: (error as Error).message || "Something went wrong",
    };
  }
}
