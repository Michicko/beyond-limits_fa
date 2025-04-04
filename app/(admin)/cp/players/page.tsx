"use client";
import PlayerCard from "@/components/admin/Card/PlayerCard";
import CustomFileUpload from "@/components/admin/CustomFileUpload/CustomFileUpload";
import FormDialog from "@/components/admin/FormDialog/FormDialog";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CheckBox from "@/components/CheckBox/CheckBox";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomTabContent from "@/components/Tabs/CustomTabContent";
import CustomTabList from "@/components/Tabs/CustomTabList";
import CustomTabs from "@/components/Tabs/CustomTabs";
import CustomTabTrigger from "@/components/Tabs/CustomTabTrigger";
import { player_positions, players } from "@/lib/placeholder-data";
import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

function Players() {
  const [ageGroup, setAgeGroup] = useState("");
  const [playerPosition, setPlayerPosition] = useState("");
  const [dominantFoot, setDominantFoot] = useState("");
  const [isTwoFooted, setIsTwoFooted] = useState<boolean>(false);
  const player_groups = [...new Set(players.map((el) => el.ageGroup))];

  const position_groups = [
    ...new Set(players.map((el) => el.position?.longName)),
  ];

  const [selectedPositionFilter, setSelectedPositionFilter] = useState("all");

  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

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

  const filtered_players = players.filter((player) => {
    if (selectedPositionFilter === "all") return player;
    else return player.position?.longName === selectedPositionFilter;
  });

  const getGroup = (group: string) => {
    const groupedPlayers = filtered_players.filter(
      (el) => el.ageGroup === group
    );
    return groupedPlayers.filter((el) => el !== undefined);
  };

  return (
    <>
      <PageTitle pageTitle="Players" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <Button
            colorPalette={"blue"}
            variant={"solid"}
            css={btnStyles}
            size={"md"}
            asChild
          >
            <Link href={"/cp/players/create"}>Create Player</Link>
          </Button>
        </HStack>

        {/* position filters */}
        <Flex gap={"2"} flexWrap={"wrap"} mb={"20px"}>
          {["all", ...position_groups].map((position) => {
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

        {/* age group tabs */}
        <Box>
          <CustomTabs defaultValue={"UNDER-19"}>
            <>
              {
                <CustomTabList>
                  <>
                    {player_groups.map((group) => {
                      return (
                        <CustomTabTrigger
                          key={group}
                          label={group}
                          value={group}
                        />
                      );
                    })}
                  </>
                </CustomTabList>
              }
              {player_groups.map((group, i) => {
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
      </Box>
    </>
  );
}

export default Players;
