"use server";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  username: string;
}) {
  const { name, email, password, username } = data;

  try {
    const { data, errors } = await cookiesClient.mutations.createUser({
      name,
      email,
      password,
      username,
    });

    if (errors && errors.length > 0) {
      const message = errors.map((err) => err.message).join(", ");
      return {
        status: "error",
        message: message || "An unknown error occurred",
      };
    }

    revalidatePath("/cp/users");

    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: `${(error as Error).message}`,
    };
  }
}

export async function removeUserFromGroup(userId: string, groupName: string) {
  try {
    const { data, errors } = await cookiesClient.mutations.removeUserFromGroup({
      userId,
      groupName,
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }
    const res = JSON.parse(data as string);
    revalidatePath("/cp/users");

    return {
      status: "success",
      data: res,
    };
  } catch (error) {
    return {
      status: "error",
      message: `${(error as Error).message}`,
    };
  }
}

export async function addUserToGroup(userId: string, groupName: string) {
  try {
    const { data, errors } = await cookiesClient.mutations.addUserToGroup({
      userId,
      groupName,
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }
    const res = JSON.parse(data as string);
    revalidatePath("/cp/users");

    return {
      status: "success",
      data: res,
    };
  } catch (error) {
    return {
      status: "error",
      message: `${(error as Error).message}`,
    };
  }
}
