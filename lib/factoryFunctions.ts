import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

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
