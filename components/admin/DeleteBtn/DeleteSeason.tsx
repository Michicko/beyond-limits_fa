"use client";
import { deleteSeason } from "@/app/_actions/actions";
import useToast from "@/hooks/useToast";
import { Menu } from "@chakra-ui/react";
import React from "react";

function DeleteSeason({ id, name }: { id: string; name: string }) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const { promiseToast } = useToast();

  const handleDelete = () => {
    const promise = deleteSeason(id);
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

export default DeleteSeason;
