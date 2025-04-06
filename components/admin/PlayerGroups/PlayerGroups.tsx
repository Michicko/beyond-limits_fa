"use client";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import CustomTabs from "../Tabs/CustomTabs";
import CustomTabList from "../Tabs/CustomTabList";
import CustomTabContent from "../Tabs/CustomTabContent";
import CustomTabTrigger from "../Tabs/CustomTabTrigger";
import PlayerCard from "../Card/PlayerCard";
import { IPlayer } from "../../../lib/definitions";

function PlayerGroups({
  ageGroups,
  players,
}: {
  ageGroups: string[];
  players: IPlayer[];
}) {
  const getGroup = (group: string) => {
    const groupedPlayers = players.filter((el) => el.ageGroup === group);
    return groupedPlayers;
  };

  return (
    <Box>
      <CustomTabs defaultValue={"UNDER_19"}>
        <>
          <CustomTabList>
            <>
              {ageGroups.map((group) => {
                return (
                  <CustomTabTrigger key={group} label={group} value={group} />
                );
              })}
            </>
          </CustomTabList>
          {ageGroups.map((group, i) => {
            return (
              <CustomTabContent value={group} key={group + i}>
                <Flex my={"20px"} direction={"column"} gap={"4"}>
                  {getGroup(group).map((player) => {
                    return <PlayerCard key={player.id} player={player} />;
                  })}
                </Flex>
              </CustomTabContent>
            );
          })}
        </>
      </CustomTabs>
    </Box>
  );
}

export default PlayerGroups;
