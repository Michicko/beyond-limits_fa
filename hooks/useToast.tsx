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

  const promiseToast = (promise: Promise<any>, name: string) => {
    toaster.promise(promise, {
      success: (res) => {
        if (res.status === "success") {
          return {
            title: `Successfully Deleted ${name}!`,
            description: "Looks great",
          };
        } else {
          return {
            title: `Failed Deleting ${name}!`,
            description: "Something went wrong",
          };
        }
      },
      error: {
        title: `Failed Deleting ${name}`,
        description: "Something wrong deleting",
      },
      loading: { title: `Deleting ${name}...`, description: "Please wait" },
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
  };
}

export default useToast;
