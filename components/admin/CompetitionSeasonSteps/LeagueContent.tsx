"use client";
import { Flex, HStack, Stack, Steps, Text, Box, Image } from "@chakra-ui/react";
import React, { useRef, useTransition } from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import FormBtn from "../Forms/FormBtn";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";
import CustomSeparator from "../CustomSeparator";
import CheckBox from "../CheckBox/CheckBox";
import { Schema } from "@/amplify/data/resource";
import useToast from "@/hooks/useToast";
import { createLeague } from "@/app/_actions/league-actions";
import { getButtonStatus } from "@/lib/helpers";

function LeagueContent({
  index,
  season,
  competitionName,
  teams,
  selectedTeams,
  setSelectedTeams,
  goToNextStep,
  setLeagueId,
}: {
  index: number;
  season: string;
  competitionName: string;
  teams: Pick<Schema["Team"]["type"], "id" | "logo" | "longName">[];
  selectedTeams: string[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;
  goToNextStep: () => void;
  setLeagueId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const toggleTeam = (teamId: string) => {
    const isSelected = selectedTeams.includes(teamId);
    let teams = selectedTeams;
    if (isSelected) {
      teams = teams.filter((el) => el !== teamId);
    } else {
      teams = [...teams, teamId];
    }
    setSelectedTeams(teams);
  };

  const formRef = useRef<HTMLFormElement | null>(null);
  const { errorToast, mutationToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("competitionNameSeason", competitionName + " " + season);
    formData.append("status", "PENDING");
    formData.append("winnerId", "");
    formData.append("teams", JSON.stringify(selectedTeams));

    startTransition(async () => {
      const res = await createLeague(formData);

      if (res.status === "success" && res.data) {
        mutationToast("league", res.data.competitionNameSeason, "create");
        formRef.current?.reset();
        setLeagueId(res.data.id);
        const time = setTimeout(() => {
          goToNextStep();
          return () => clearTimeout(time);
        }, 200);
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
  };

  return (
    <Steps.Content index={index}>
      <form onSubmit={handleSubmit}>
        <CompetitionSeasonCard title={`Create League`}>
          <Stack gap={2} mb={"5"}>
            <CompetitionSeasonInfo label={"Name"} value={competitionName} />
            <CompetitionSeasonInfo label={"Season"} value={season} />
            <CompetitionSeasonInfo
              label={"Teams"}
              value={String(selectedTeams.length)}
            />
            <CustomSeparator />
            <Text mb={"1"}>Select Teams</Text>
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
                    <Box>
                      <CheckBox
                        name={team.id}
                        checked={selectedTeams.includes(team.id)}
                        size="xs"
                        label={team.longName}
                        onCheckedChange={() => toggleTeam(team.id)}
                        showLabel={false}
                      />
                    </Box>
                    <Image src={team.logo} width={"25px"} />
                    <Text whiteSpace={"nowrap"} textTransform={"capitalize"}>
                      {team.longName}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </Stack>
          <HStack justifyContent={"flex-end"}>
            <FormBtn type="submit" disabled={isPending}>
              {getButtonStatus(null, "League", isPending)}
            </FormBtn>
          </HStack>
        </CompetitionSeasonCard>
      </form>
    </Steps.Content>
  );
}

export default LeagueContent;
