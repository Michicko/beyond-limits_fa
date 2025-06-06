"use client";
import { usePageContext } from "@/contexts/pageContext";
import useToast from "@/hooks/useToast";
import { getIcon } from "@/lib/icons";
import { IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function DeleteUserBtn({ userId }: { userId: string }) {
  const { mutationPromiseToast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const { authenticatedUserId } = usePageContext();
  const router = useRouter();

  const success = {
    title: "user deleted",
    desc: `user deleted successfully!`,
  };
  const err = {
    title: "Error deleting user",
    desc: `Failed to delete user`,
  };
  const loading = {
    title: "deleting user",
    desc: `deleting user, please wait...`,
  };

  const onSuccess = () => {
    router.refresh();
  };

  const handleSubmit = () => {
    if (confirm("Are you sure?")) {
      setIsPending(true);
      const promise = fetch("/api/delete-user", {
        method: "POST",
        body: JSON.stringify({ userId }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "failed deleting user");
        }
        return data;
      });

      mutationPromiseToast(
        promise,
        success,
        err,
        loading,
        setIsPending,
        onSuccess
      );
    }
  };

  return (
    <IconButton
      colorPalette={"red"}
      variant={"plain"}
      size={"sm"}
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: "scale(1.05)",
        opacity: 0.85,
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      disabled={isPending || authenticatedUserId === userId}
      onClick={handleSubmit}
    >
      {getIcon("trash")}
    </IconButton>
  );
}

export default DeleteUserBtn;
