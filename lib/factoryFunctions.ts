import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type Nullable<T> = T | null;

type EntityOptions<T> = {
  modelName: keyof typeof cookiesClient.models;
  id?: string;
  formData: FormData;
  uniqueCheckFn: (value: string) => Promise<{ data: T[] }>;
  uniqueFieldName: string;
  currentUniqueValue?: string;
  attributes?: string[] | Nullable<string>[];
  selectionSet?: (keyof T)[];
  revalidatePath?: string;
};

export async function createEntity<T>({
  modelName,
  formData,
  uniqueCheckFn,
  uniqueFieldName,
  attributes,
  selectionSet = ["id"] as (keyof T)[],
  revalidatePath: pathToRevalidate,
}: EntityOptions<T>): Promise<T | null> {
  const uniqueValue = formData.get(uniqueFieldName)?.toString() || "";
  const existing = await uniqueCheckFn(uniqueValue);

  if (existing.data.length > 0) {
    throw new Error(
      `${modelName} with this ${uniqueFieldName} already exists.`
    );
  }

  const input: Record<string, any> = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, value.toString()])
  );

  // Conditionally include attributes
  if (attributes) {
    input["attributes"] = attributes;
  }

  try {
    const model = cookiesClient.models[modelName] as {
      create: (
        input: Record<string, any>,
        options: { authMode: "userPool"; selectionSet: string[] }
      ) => Promise<{ data: T | null }>;
    };

    const { data } = await model.create(input, {
      authMode: "userPool",
      selectionSet: selectionSet as string[],
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return data ?? null;
  } catch (error) {
    console.error("Error during create operation:", error);
    throw error;
  }
}

export async function updateEntity<T>({
  modelName,
  id,
  formData,
  uniqueCheckFn,
  uniqueFieldName,
  currentUniqueValue,
  attributes,
  selectionSet = ["id"] as (keyof T)[],
  revalidatePath: pathToRevalidate,
}: EntityOptions<T>): Promise<T | null> {
  const uniqueValue = formData.get(uniqueFieldName)?.toString() || "";

  // Only run the unique check if the unique value has changed
  if (uniqueValue !== currentUniqueValue) {
    const existing = await uniqueCheckFn(uniqueValue);
    if (existing.data.length > 0) {
      console.log(
        `Found existing ${modelName} with the same ${uniqueFieldName}`
      );
      throw new Error(
        `${modelName} with this ${uniqueFieldName} already exists.`
      );
    }
  }

  const input: Record<string, any> = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, value.toString()])
  );

  input["id"] = id;

  // Conditionally include attributes
  if (attributes) {
    input["attributes"] = attributes;
  }

  try {
    const model = cookiesClient.models[modelName] as {
      update: (
        input: T,
        options: { authMode: "userPool"; selectionSet: string[] }
      ) => Promise<{ data: T | null }>;
    };

    const { data } = await model.update(input as T, {
      authMode: "userPool",
      selectionSet: selectionSet as string[],
    });

    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return data ?? null;
  } catch (error) {
    console.error("Error during create operation:", error);
    throw error;
  }
}

export async function deleteEntity<T>({
  modelName,
  id,
  pathToRevalidate,
}: {
  modelName: keyof typeof cookiesClient.models;
  id: string;
  pathToRevalidate?: string;
}) {
  try {
    const model = cookiesClient.models[modelName] as {
      delete: (
        input: { id: string },
        options: { authMode: "userPool" }
      ) => Promise<{ data: T | null }>;
    };

    // Call the delete method on the specified model
    await model.delete({ id }, { authMode: "userPool" });

    // Revalidate path if provided
    if (pathToRevalidate) {
      revalidatePath(pathToRevalidate);
    }

    return {
      status: "success",
      message: `${modelName} deleted successfully`,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
      error: (error as Error).message || "Something went wrong",
    };
  }
}
