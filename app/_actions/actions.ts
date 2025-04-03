"use server";
import { cookiesClient } from "@/utils/amplify-utils";

type Nullable<T> = T | null;

export async function createPosition(formData: FormData) {
  const attrs = formData.get("attributes")?.toString();

  try {
    const { data, errors } = await cookiesClient.models.PlayerPosition.create(
      {
        shortName: formData.get("shortName")?.toString() || "",
        longName: formData.get("longName")?.toString() || "",
        attributes: attrs ? JSON.parse(attrs) : ([] as Nullable<string>[]),
      },
      { authMode: "userPool" }
    );

    if (data) {
      console.log("position created", data);
      //   return {
      //     message: "created successfully",
      //     status: "success",
      //     data,
      //   };
    }

    if (errors) {
      console.log(errors);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create task");
  }
}
