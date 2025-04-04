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

  const errorToast = (err: any) => {
    createToast("Error", err?.message || "Something went wrong.", "error");
  };

  const mutationToast = (longName: string, method: "update" | "create") => {
    createToast(
      "Success",
      `${
        method === "create" ? "Created" : "Updated"
      } player position: ${longName}`,
      "success"
    );
  };

  return { createToast, errorToast, mutationToast };
}

export default useToast;
