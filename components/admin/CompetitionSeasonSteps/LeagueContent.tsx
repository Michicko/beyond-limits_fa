import { Flex, HStack, Stack, Steps, Text, Box, Image } from "@chakra-ui/react";
import React from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import FormBtn from "../Forms/FormBtn";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";
import CustomSeparator from "../CustomSeparator";
import CheckBox from "../CheckBox/CheckBox";
import { Schema } from "@/amplify/data/resource";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("competitionNameSeason", competitionName + season);
    formData.append("status", "PENDING");
    formData.append("winnerId", "");
    formData.append("teams", JSON.stringify(selectedTeams));

    const data = Array.from(formData.entries(), ([key, val]) => [key, val]);

    console.log(data);

    goToNextStep();
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
            <FormBtn type="submit">Create League</FormBtn>
          </HStack>
        </CompetitionSeasonCard>
      </form>
    </Steps.Content>
  );
}

export default LeagueContent;
