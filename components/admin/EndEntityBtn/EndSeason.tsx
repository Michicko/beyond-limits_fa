"use client";
import { endCompetitionSeason } from "@/app/_actions/actions";
import useToast from "@/hooks/useToast";
import { Nullable } from "@/lib/definitions";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

function EndSeason({
  id,
  cupId,
  leagueId,
  season,
  disabled,
}: {
  id: string;
  cupId?: Nullable<string>;
  leagueId?: Nullable<string>;
  season: string;
  disabled: boolean;
}) {
  const styles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
  };

  const { mutationPromiseToast } = useToast();
  const [isEnding, setIsEnding] = useState(false);

  const endSeason = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", "COMPLETED");
    setIsEnding(true);

    mutationPromiseToast(
      endCompetitionSeason(id, { cupId, leagueId }),
      { title: "Season ended", desc: `${season} ended successfully!` },
      { title: "Failed to end season", desc: `Failed to end ${season}` },
      { title: "Ending season", desc: `Ending ${season}, please wait...` },
      setIsEnding
    );
  };

  return (
    <Button
      css={styles}
      w={"full"}
      textAlign={"left"}
      justifyContent={"flex-start"}
      color={"fg.error"}
      variant={"plain"}
      colorPalette={"red"}
      borderBottom={"1px solid"}
      borderBottomColor={"gray.200"}
      onClick={async () => await endSeason()}
      _hover={{ bg: "gray.100" }}
      disabled={disabled || isEnding}
    >
      End Season
    </Button>
  );
}

export default EndSeason;
