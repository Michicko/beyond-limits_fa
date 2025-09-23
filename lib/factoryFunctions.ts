import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type GetEntityOptions<TOutput> = {
  modelName: keyof typeof cookiesClient.models;
  limit: number;
  selectionSet?: string[];
  filter?: Record<string, any>;
};

type GetOneEntityOptions<TOutput> = {
  modelName: keyof typeof cookiesClient.models;
  id: string;
  selectionSet?: string[];
};

type CreateEntityOptions<TInput, TOutput> = {
  modelName: keyof typeof cookiesClient.models;
  input: TInput;
  pathToRevalidate?: string;
  validate?: (input: TInput) => Promise<{ valid: boolean; message?: string }>;
  preprocess?: (input: TInput) => Promise<TInput> | TInput;
  selectionSet?: string[];
};

type UpdateEntityOptions<TInput, TOutput> = {
  modelName: keyof typeof cookiesClient.models;
  id: string;
  input: TInput;
  pathToRevalidate?: string;
  validate?: (input: TInput) => Promise<{ valid: boolean; message?: string }>;
  preprocess?: (input: TInput) => Promise<TInput> | TInput;
  selectionSet?: string[];
};

type Primitive = string | number | boolean;

const validatePath = (pathToRevalidate: string) => {
  if (pathToRevalidate.includes("[")) {
    revalidatePath(pathToRevalidate, "page");
  } else {
    revalidatePath(pathToRevalidate);
  }
};

export const processPromise = async (promise: Promise<any>) => {
  try {
    const result = await promise;
    let errorMessage = "";

    if (result.errors) {
      result.errors.forEach((err: any) => {
        errorMessage += `${err.message}`;
      });

      return {
        status: "error",
        message: errorMessage,
      };
    }

    return {
      status: "success",
      data: result.data,
    };
  } catch (error) {
    // console.error("Error creating match:", error);

    if (cookiesClient.isCancelError(error)) {
      // console.warn("Request cancelled:", (error as any).message);

      cookiesClient.cancel(promise);
    }

    return {
      status: "error",
      message: (error as any).message,
    };
  }
};

export const checkUniqueField = async (
  modelName: keyof typeof cookiesClient.models,
  field: string,
  value: string
) => {
  const model = cookiesClient.models[modelName] as any;

  const filter = {
    [field]: { eq: value },
  };

  const { data: existing } = await model.list({ filter });
  return existing;
};

export const checkUniqueFields = async (
  modelName: keyof typeof cookiesClient.models,
  fields: Record<string, string>
) => {
  const model = cookiesClient.models[modelName] as any;

  const filter = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, { eq: value }])
  );

  const { data: existing } = await model.list({ filter });
  return existing;
};

export function getOneEntityFactory<TOutput>() {
  return async ({
    modelName,
    id,
    selectionSet,
  }: GetOneEntityOptions<TOutput>) => {
    try {
      const model = cookiesClient.models[modelName] as unknown as {
        get: (options?: {
          id: string;
          authMode?: "userPool";
          selectionSet?: string[];
        }) => Promise<{
          data: TOutput | null;
          errors?: { message: string }[];
        }>;
      };

      const { data, errors } = await model.get({
        id,
        authMode: "userPool",
        selectionSet,
      });

      if (errors && errors.length > 0) {
        return {
          status: "error",
          message: errors[0].message || "An unknown error occurred",
        };
      }

      return {
        status: "success",
        data: data ?? [],
      };
    } catch (error) {
      return {
        status: "error",
        message: (error as Error).message || "An unknown error occurred",
      };
    }
  };
}

export function getEntityFactory<TOutput>() {
  return async ({
    modelName,
    limit,
    selectionSet,
    filter,
  }: GetEntityOptions<TOutput>) => {
    try {
      const model = cookiesClient.models[modelName] as unknown as {
        list: (options?: {
          authMode?: "userPool";
          selectionSet?: string[];
          limit: number;
          sortDirection: string;
          filter?: Record<string, any>;
        }) => Promise<{
          data: TOutput[] | null;
          errors?: { message: string }[];
        }>;
      };

      const { data, errors } = await model.list({
        authMode: "userPool",
        selectionSet,
        limit,
        sortDirection: "ASC",
        filter,
      });

      if (errors && errors.length > 0) {
        return {
          status: "error",
          message: errors[0].message || "An unknown error occurred",
        };
      }

      return {
        status: "success",
        data: data ?? [],
      };
    } catch (error) {
      return {
        status: "error",
        message: (error as Error).message || "An unknown error occurred",
      };
    }
  };
}

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
        validatePath(pathToRevalidate);
      }

      return {
        status: "success",
        data,
      };
    } catch (error) {
      return {
        status: "error",
        message: (error as Error).message || "An unknown error occurred",
      };
    }
  };
}

export function updateEntityFactory<TInput, TOutput>() {
  return async ({
    modelName,
    id,
    input,
    pathToRevalidate,
    validate,
    preprocess,
    selectionSet,
  }: UpdateEntityOptions<TInput, TOutput>) => {
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

      const model = cookiesClient.models[modelName] as unknown as {
        update: (
          input: { id: string } & TInput,
          options?: { authMode?: "userPool"; selectionSet?: string[] }
        ) => Promise<{ data: TOutput | null; errors?: { message: string }[] }>;
      };
      const { data, errors } = await model.update(
        { id, ...finalInput },
        {
          authMode: "userPool",
          selectionSet,
        }
      );

      if (errors && errors.length > 0) {
        return {
          status: "error",
          message: errors[0].message || "An unknown error occurred",
        };
      }

      if (pathToRevalidate) {
        validatePath(pathToRevalidate);
      }

      return {
        status: "success",
        data,
      };
    } catch (error) {
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
  postDelete,
}: {
  modelName: keyof typeof cookiesClient.models;
  id: string;
  pathToRevalidate?: string;
  postDelete?: (id: string) => Promise<void> | void;
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

    if (postDelete) {
      await postDelete(id);
    }

    // Revalidate path if provided
    if (pathToRevalidate) {
      validatePath(pathToRevalidate);
    }

    return {
      status: "success",
      message: `${modelName} deleted successfully`,
      data: true,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
      error: (error as Error).message || "Something went wrong",
    };
  }
}
