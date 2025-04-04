"use client";
import { Field, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import FormBtn from "./FormBtn";
import Standing from "../Standing/Standing";
import { teams } from "@/lib/placeholder-data";
import CheckBox from "@/components/CheckBox/CheckBox";
import { IStandingRow } from "@/lib/definitions";

function LeagueStandingForm({ league_id }: { league_id: string }) {
  const [standing, setStanding] = useState<IStandingRow[]>([]);
  const organizeStanding = (prevStanding: IStandingRow[]) => {
    let standing = prevStanding;
    standing = standing
      .sort((a, b) => {
        const teamA = teams
          .find((team) => team.id === a.team_id)
          ?.longName.toLowerCase();
        const teamB = teams
          .find((team) => team.id === b.team_id)
          ?.longName.toLowerCase();
        if (teamA && teamB) {
          if (teamA < teamB) return -1;
          else if (teamA > teamB) return 1;
          else return 0;
        } else return 0;
      })
      .map((el, i) => {
        return {
          ...el,
          position: i + 1,
        };
      });
    return standing;
  };

  const AddTeamToTable = (teamId: string) => {
    let prevStanding = standing;
    const newStanding = {
      league_id,
      team_id: teamId,
      position: standing.length + 1,
      stats: {
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        g: "0",
        gd: 0,
        pts: 0,
      },
    };
    prevStanding = [...prevStanding, newStanding];
    setStanding(organizeStanding(prevStanding));
  };

  const removeTeamFromTable = (teamId: string) => {
    const standingRows = standing.filter((el) => el.team_id !== teamId);
    setStanding(organizeStanding(standingRows));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack justifyContent={"flex-end"}>
        <FormBtn disabled={standing.length < 1}>Create Standing</FormBtn>
      </HStack>
      <Text fontSize={"sm"} my={"1.5"}>
        Tick checkbox to add team to table
      </Text>
      <Standing standings={standing} />
      <Flex flexWrap={"wrap"} gap={"4"} alignItems={"center"} mt={"4"}>
        {teams.map((team) => {
          return (
            <Flex
              key={team.id}
              alignItems={"center"}
              gap={"2"}
              bg={"card_bg"}
              p={"2"}
              borderRadius={"xs"}
            >
              <Field.Root>
                <CheckBox
                  name={team.id}
                  checked={standing.map((el) => el.team_id).includes(team.id)}
                  size="xs"
                  label={team.longName}
                  onCheckedChange={
                    standing.map((el) => el.team_id).includes(team.id)
                      ? () => removeTeamFromTable(team.id)
                      : () => AddTeamToTable(team.id)
                  }
                  showLabel={false}
                />
              </Field.Root>
              <Image src={team.logo} width={"25px"} />
              <Text whiteSpace={"nowrap"}>{team.longName}</Text>
            </Flex>
          );
        })}
      </Flex>
    </form>
  );
}

export default LeagueStandingForm;
