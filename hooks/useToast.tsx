import { toaster } from "@/components/ui/toaster";

function useToast({
  loading,
  success,
  error,
}: {
  loading: { title: string; description: string };
  success: { title: string; description: string };
  error: { title: string; description: string };
}) {
  const toast = (promise: Promise<unknown>) => {
    toaster.promise(promise, {
      success: {
        title: success.title,
        description: success.description,
      },
      error: {
        title: error.title,
        description: error.description,
      },
      loading: {
        title: loading.title,
        description: loading.description,
      },
    });
  };

  return { toast };
}

export default useToast;
