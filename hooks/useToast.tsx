import { toaster } from "@/components/ui/toaster";

function useToast() {
  const createToast = (title: string, description: string, type: string) => {
    return toaster.create({
      title,
      description,
      type,
      duration: 4000,
    });
  };

  const sendError = (name: string, type: "delete" | "upload") => {
    return {
      title: `Failed ${type === "delete" ? "Deleting" : "Uploading"} ${name}!`,
      description: "Something went wrong",
    };
  };

  const promiseToast = (promise: Promise<any>, name: string) => {
    toaster.promise(promise, {
      success: (res) => {
        if (res.status === "success") {
          return {
            title: `Successfully Deleted ${name}!`,
            description: "Looks great",
          };
        } else {
          return sendError(name, "delete");
        }
      },
      error: sendError(name, "delete"),
      loading: { title: `Deleting ${name}...`, description: "Please wait" },
    });
  };

  const uploadPromiseToast = (
    promise: Promise<any>,
    name: string,
    onUploaded: (res: string) => void
  ) => {
    toaster.promise(promise, {
      success: (res) => {
        if (res.data) {
          onUploaded(res.data.url);
          return {
            title: `Successfully Uploaded ${name}!`,
            description: "Looks great",
          };
        } else {
          return sendError(name, "upload");
        }
      },
      error: sendError(name, "upload"),
      loading: { title: `Uploading ${name}...`, description: "Please wait" },
    });
  };

  const errorToast = (err: any) => {
    createToast("Error", err?.message || "Something went wrong.", "error");
  };

  const mutationToast = (
    entityName: string,
    name: string,
    method: "update" | "create" | "delete"
  ) => {
    createToast(
      "Success",
      `${
        method === "create"
          ? "Created"
          : method === "update"
          ? "Updated"
          : "Deleted"
      } ${entityName}: ${name}`,
      "success"
    );
  };

  return {
    createToast,
    errorToast,
    mutationToast,
    toaster,
    promiseToast,
    uploadPromiseToast,
  };
}

export default useToast;
