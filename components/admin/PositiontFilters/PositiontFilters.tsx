"use client";
import { Button, Flex } from "@chakra-ui/react";
import React from "react";

function PositiontFilters({
  positions,
  selectedPositionFilter,
  setSelectedPositionFilter,
}: {
  selectedPositionFilter: string;
  setSelectedPositionFilter: React.Dispatch<React.SetStateAction<string>>;
  positions: string[];
}) {
  const positionFilterStyles = {
    px: "20px",
    borderRadius: "3xl",
    fontSize: "sm",
    textTransform: "uppercase",
    fontWeight: "semibold",
    bg: "blue.100",
    color: "black",
    "&:hover": {
      bg: "primary",
      color: "white",
    },
    "&.current": {
      bg: "primary",
      color: "white",
    },
  };
  return (
    <Flex gap={"2"} flexWrap={"wrap"} mb={"20px"}>
      {["all", ...positions].map((position) => {
        if (!position) return;
        return (
          <Button
            key={position}
            size={"sm"}
            css={positionFilterStyles}
            className={position === selectedPositionFilter ? "current" : ""}
            onClick={() => setSelectedPositionFilter(position)}
          >
            {position}
          </Button>
        );
      })}
    </Flex>
  );
}

export default PositiontFilters;
