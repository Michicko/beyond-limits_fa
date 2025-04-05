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

  revalidatePath("/cp/positions");
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

  revalidatePath("/cp/positions");
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

export async function createSeason(formData: FormData) {
  const season = formData.get("season")?.toString() || "";

  // Query to check if `shortName` already exists
  const existingSeasons = await cookiesClient.models.Season.listSeasonBySeason({
    season,
  });

  // If a record with the same shortName exists, throw an error
  if (existingSeasons.data.length > 0) {
    throw new Error("Season already exists.");
  }

  const { data } = await cookiesClient.models.Season.create(
    {
      season,
    },
    { authMode: "userPool" }
  );

  revalidatePath("/cp/seasons");
  return data
    ? {
        id: data.id,
        season: data.season,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    : null;
}

export async function updateSeason(id: string, formData: FormData) {
  const season = formData.get("season")?.toString() || "";

  const { data } = await cookiesClient.models.Season.update(
    {
      id,
      season,
    },
    { authMode: "userPool" }
  );

  revalidatePath("/cp/seasons");
  return data
    ? {
        id: data.id,
        season: data.season,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    : null;
}

export async function deleteSeason(id: string) {
  try {
    await cookiesClient.models.Season.delete(
      {
        id,
      },
      { authMode: "userPool" }
    );

    revalidatePath("/cp/seasons");
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
