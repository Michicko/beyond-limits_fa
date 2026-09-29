"use client";
import React, { useState } from "react";
import PlayerGroups from "../PlayerGroups/PlayerGroups";
import PositiontFilters from "../PositiontFilters/PositiontFilters";
import { IPlayer } from "@/lib/definitions";
import PlaterStatus from "../PlaterStatus";
import { Stack, Text } from "@chakra-ui/react";

function AdminPlayers({
  positions,
  statuses,
  ageGroups,
  players,
}: {
  positions: string[];
  statuses: ("ACTIVE" | "LOAN" | "INJURED" | "INACTIVE")[] | undefined;
  ageGroups: string[];
  players: IPlayer[];
}) {
  const [selectedPositionFilter, setSelectedPositionFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("active");

  let filteredPlayers = players.filter((player) => {
    if (selectedPositionFilter === "all") return player;
    else
      return (
        player.playerPosition?.longName.toLowerCase() ===
        selectedPositionFilter.toLowerCase()
      );
  });

  filteredPlayers = players.filter((player) => {
    if (selectedStatus === "all") return player;
    else {
      return player.status?.toLowerCase() === selectedStatus.toLowerCase();
    }
  });

  return (
    <>
      {statuses && (
        <Stack>
          <Text fontSize={"sm"} fontWeight={"500"} color={"primary"}>
            Player Status
          </Text>
          <PlaterStatus
            statuses={statuses}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </Stack>
      )}
      <Stack>
        <Text fontSize={"sm"} fontWeight={"500"} color={"primary"}>
          Positions
        </Text>
        <PositiontFilters
          positions={positions}
          selectedPositionFilter={selectedPositionFilter}
          setSelectedPositionFilter={setSelectedPositionFilter}
        />
      </Stack>
      <Stack>
        <Text fontSize={"sm"} fontWeight={"500"} color={"primary"}>
          Age Groups
        </Text>
        <PlayerGroups ageGroups={ageGroups} players={filteredPlayers} />
      </Stack>
    </>
  );
}

export default AdminPlayers;
