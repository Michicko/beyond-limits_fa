"use client";
import useToast from "@/hooks/useToast";
import { Menu } from "@chakra-ui/react";
import React from "react";

function DeleteBtn({
  id,
  name,
  onDelete,
}: {
  id: string;
  name: string;
  onDelete: (id: string) => Promise<{
    status: string;
    message: string;
    error?: string;
  }>;
}) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const { promiseToast } = useToast();

  const handleDelete = async () => {
    const promise = onDelete(id);
    promiseToast(promise, name);
  };

  return (
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
