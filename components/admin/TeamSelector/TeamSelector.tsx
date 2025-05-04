import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import CheckBox from "../CheckBox/CheckBox";

interface ITeam {
  id: string;
  logo: string;
  longName: string;
}

function TeamSelector({
  teams,
  selectedTeams,
  setSelectedTeams,
}: {
  teams: ITeam[];
  selectedTeams: string[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<string[]>>;
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

  return (
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
  );
}

export default TeamSelector;
