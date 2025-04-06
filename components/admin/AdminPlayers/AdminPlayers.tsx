"use client";
import React, { useState } from "react";
import PlayerGroups from "../PlayerGroups/PlayerGroups";
import PositiontFilters from "../PositiontFilters/PositiontFilters";
import { IPlayer } from "@/lib/definitions";

function AdminPlayers({
  positions,
  ageGroups,
  players,
}: {
  positions: string[];
  ageGroups: string[];
  players: IPlayer[];
}) {
  const [selectedPositionFilter, setSelectedPositionFilter] = useState("all");

  const filteredPlayers = players.filter((player) => {
    if (selectedPositionFilter === "all") return player;
    else
      return (
        player.playerPosition?.longName.toLowerCase() ===
        selectedPositionFilter.toLowerCase()
      );
  });

  return (
    <>
      <PositiontFilters
        positions={positions}
        selectedPositionFilter={selectedPositionFilter}
        setSelectedPositionFilter={setSelectedPositionFilter}
      />
      <PlayerGroups ageGroups={ageGroups} players={filteredPlayers} />
    </>
  );
}

export default AdminPlayers;
