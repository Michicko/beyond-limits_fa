"use client";
import React, { useEffect, useTransition } from "react";
import CustomMenuItem from "../CustomMenu/CustomMenuItem";
import useToast from "@/hooks/useToast";

function DeleteBtn({
  id,
  entityName,
  deletedItemName,
}: {
  id: string;
  entityName: string;
  deletedItemName: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { errorToast, mutationToast, pendingToast, deleteToastId, toaster } =
    useToast();

  //   const handleDelete = () => {
  //     startTransition(async () => {
  //       const result = await handleOnClick(id);
  //       try {
  //         if (result?.status === "success") {
  //           mutationToast(entityName, deletedItemName, "delete");
  //         }
  //       } catch (error) {
  //         errorToast(error);
  //       }
  //     });
  //   };

  useEffect(() => {
    if (isPending) {
      pendingToast(`Deleting ${entityName}`, `Please wait.`);
    } else {
      toaster.remove(deleteToastId);
    }
  }, [isPending]);

  return <CustomMenuItem label="Delete" showBorder={false} />;
}

export default DeleteBtn;
