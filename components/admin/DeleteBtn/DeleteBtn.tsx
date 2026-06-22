"use client";
import useToast from "@/hooks/useToast";
import { Nullable } from "@/lib/definitions";
import { getIcon } from "@/lib/icons";
import { Button, IconButton, Menu } from "@chakra-ui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
    | "PlayOff"
    | "CompetitionSeason";
  images?: Nullable<string>[];
  type?: "menu" | "btn" | "iconBtn";
  position?: "relative" | "absolute";
};

function DeleteBtn({
  id,
  name,
  type,
  images,
  module,
  position,
}: DeleteBtnProps) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const moduleName = module.charAt(0).toUpperCase() + module.slice(1);

    if (isDeleting) return;
    if (!confirm("Are you sure?")) return;

    setIsDeleting(true);

    try {
      const deletePromise = fetch("/api/delete-item", {
        method: "POST",
        body: JSON.stringify({ id, module, images }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error || data.message || `Error deleting ${module}`,
          );
        }

        return data;
      });

      await toast.promise(deletePromise, {
        loading: `Deleting ${moduleName}`,
        success: `${moduleName} Deleted`,
        error: (err) => err.message || `Error deleting ${moduleName}`,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return type === "iconBtn" ? (
    <>
      <IconButton
        size={"sm"}
        color={"red"}
        position={position || "absolute"}
        top={position ? "unset" : "2"}
        right={position ? "unset" : "2"}
        zIndex={"100"}
        variant={"plain"}
        disabled={isDeleting}
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
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? "Deleting" : "Delete"}
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
