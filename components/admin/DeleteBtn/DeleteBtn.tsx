"use client";
import useToast from "@/hooks/useToast";
import { Nullable } from "@/lib/definitions";
import { getIcon } from "@/lib/icons";
import { Button, IconButton, Menu } from "@chakra-ui/react";
import React, { useState } from "react";

type DeleteBtnProps = {
  id: string;
  name: string;
  module:
    | "Article"
    | "Team"
    | "Competition"
    | "Match"
    | "Player"
    | "PlayerPosition"
    | "ArticleCategory"
    | "Banner"
    | "Visual"
    | "Highlight"
    | "LeagueRound"
    | "CompetitionSeason";
  images?: Nullable<string>[];
  type?: "menu" | "btn" | "iconBtn";
};

function DeleteBtn({ id, name, type, images, module }: DeleteBtnProps) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const [isPending, setIsPending] = useState(false);
  const { mutationPromiseToast } = useToast();

  const success = {
    title: `${module.slice(0, 1).toUpperCase() + module.slice(1)} Deleted`,
    desc: `${
      module.slice(0, 1).toUpperCase() + module.slice(1)
    } "${name}" deleted successfully!`,
  };
  const error = {
    title: `Error deleting ${
      module.slice(0, 1).toUpperCase() + module.slice(1)
    }`,
    desc: `Failed to delete ${
      module.slice(0, 1).toUpperCase() + module.slice(1)
    } "${name}"`,
  };
  const loading = {
    title: `Deleting ${module.slice(0, 1).toUpperCase() + module.slice(1)}`,
    desc: `Deleting ${
      module.slice(0, 1).toUpperCase() + module.slice(1)
    } "${name}", please wait...`,
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    if (type === "btn") setIsPending(true);

    const promise = fetch("/api/delete-item", {
      method: "POST",
      body: JSON.stringify({ id, module, images }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        return res.data ?? res;
      });

    mutationPromiseToast(promise, success, error, loading, setIsPending);

    if (type === "btn") {
      promise.finally(() => setIsPending(false));
    }
  };

  return type === "iconBtn" ? (
    <>
      <IconButton
        size={"sm"}
        color={"red"}
        position={"absolute"}
        top={"2"}
        right={"2"}
        zIndex={"100"}
        variant={"plain"}
        disabled={isPending}
        onClick={handleDelete}
      >
        {getIcon("trash")}
      </IconButton>
    </>
  ) : type === "btn" ? (
    <Button
      css={styles}
      px={"20px"}
      color={"fg.error"}
      variant={"outline"}
      colorPalette={"red"}
      disabled={isPending}
      onClick={handleDelete}
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
      onClick={handleDelete}
    >
      Delete
    </Menu.Item>
  );
}

export default DeleteBtn;
