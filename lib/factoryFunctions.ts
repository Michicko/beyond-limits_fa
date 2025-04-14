import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type CreateEntityOptions<TInput, TOutput> = {
  modelName: keyof typeof cookiesClient.models;
  input: TInput;
  pathToRevalidate?: string;
  validate?: (input: TInput) => Promise<{ valid: boolean; message?: string }>;
  preprocess?: (input: TInput) => Promise<TInput> | TInput;
  selectionSet?: string[];
};

export function createEntityFactory<TInput, TOutput>() {
  return async ({
    modelName,
    input,
    pathToRevalidate,
    validate,
    preprocess,
    selectionSet,
  }: CreateEntityOptions<TInput, TOutput>) => {
    try {
      let finalInput = preprocess ? await preprocess(input) : input;

      if (validate) {
        const { valid, message } = await validate(finalInput);
        if (!valid) {
          return {
            status: "error",
            message: message || "Validation failed",
          };
        }
      }

      const model = cookiesClient.models[modelName] as {
        create: (
          input: TInput,
          options?: { authMode?: "userPool"; selectionSet?: string[] }
        ) => Promise<{ data: TOutput | null; errors?: { message: string }[] }>;
      };

      const { data, errors } = await model.create(finalInput, {
        authMode: "userPool",
        selectionSet,
      });

      if (errors && errors.length > 0) {
        return {
          status: "error",
          message: errors[0].message || "An unknown error occurred",
        };
      }

      if (pathToRevalidate) {
        revalidatePath(pathToRevalidate);
      }

      return {
        status: "success",
        data,
      };
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: (error as Error).message || "An unknown error occurred",
      };
    }
  };
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
