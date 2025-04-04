"use client";
import { deletePosition } from "@/app/_actions/actions";
import useToast from "@/hooks/useToast";
import { Menu } from "@chakra-ui/react";
import React from "react";

function DeletePositionBtn({ id, name }: { id: string; name: string }) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const { promiseToast } = useToast();

  const handleDelete = () => {
    const promise = deletePosition(id);
    promiseToast(promise, name);
  };

  return (
    <Menu.Item
      value={"Delete"}
      css={styles}
      color={"fg.error"}
      borderColor={"transparent"}
      disabled={false}
      onClick={handleDelete}
    >
      Delete
    </Menu.Item>
  );
}

export default DeletePositionBtn;
