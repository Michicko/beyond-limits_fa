"use client";
import useToast from "@/hooks/useToast";
import { Button, Menu } from "@chakra-ui/react";
import React, { useState } from "react";

function DeleteBtn({
  id,
  name,
  onDelete,
  type,
}: {
  id: string;
  name: string;
  onDelete: (id: string) => Promise<{
    status: string;
    message: string;
    error?: string;
  }>;
  type?: "menu" | "btn";
}) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const [isPending, setIsPending] = useState(false);
  const { promiseToast } = useToast();

  const handleDelete = async () => {
    if (type === "btn") {
      setIsPending(true);
    }
    if (confirm("Are you sure?")) {
      const promise = onDelete(id);
      promiseToast(promise, name);

      if (type === "btn") {
        promise.then((res) => {
          setIsPending(false);
        });
      }
    }
  };

  return type === "btn" ? (
    <Button
      css={styles}
      px={"20px"}
      color={"fg.error"}
      variant={"outline"}
      colorPalette={"red"}
      disabled={isPending}
      onClick={async () => await handleDelete()}
    >
      {isPending ? "Deleting" : "Delete"}
    </Button>
  ) : (
    <Menu.Item
      value={"Delete"}
      css={styles}
      color={"fg.error"}
      borderColor={"transparent"}
      disabled={false}
      onClick={async () => await handleDelete()}
    >
      Delete
    </Menu.Item>
  );
}

export default DeleteBtn;
