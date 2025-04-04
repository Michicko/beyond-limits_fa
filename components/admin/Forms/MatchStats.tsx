import { IMatch, IStackStyles } from "@/lib/definitions";
import { Box, Separator, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import StatInput from "./StatInput";
import FormLabel from "./FormLabel";

function MatchStats({
  stackStyles,
  matchForm,
  handleMatchTeamChange,
}: {
  stackStyles: IStackStyles;
  matchForm: IMatch;
  handleMatchTeamChange: (
    e: { target: { name: string; value: string | number } },
    team: "home" | "away"
  ) => void;
}) {
  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Match Stats</FormLabel>
      <Box>
        <FormLabel as="Text">Home Team</FormLabel>
        <SimpleGrid
          columns={{ base: 2, md: 3, lg: 6 }}
          gap={"4"}
          alignItems={"center"}
        >
          <StatInput
            team="home"
            onChange={handleMatchTeamChange}
            value={matchForm.home.stats.passes}
            name="passes"
          />
          <StatInput
            team="home"
            onChange={handleMatchTeamChange}
            value={matchForm.home.stats.offsides}
            name="offsides"
          />
          <StatInput
            team="home"
            onChange={handleMatchTeamChange}
            value={matchForm.home.stats.corners}
            name="corners"
          />
          <StatInput
            team="home"
            onChange={handleMatchTeamChange}
            value={matchForm.home.stats.shots}
            name="shots"
          />
          <StatInput
            team="home"
            onChange={handleMatchTeamChange}
            value={matchForm.home.stats.yellows}
            name="yellows"
          />
          <StatInput
            team="home"
            onChange={handleMatchTeamChange}
            value={matchForm.home.stats.reds}
            name="reds"
          />
        </SimpleGrid>
      </Box>
      <Separator
        my={"5"}
        height={"1px"}
        variant={"solid"}
        colorPalette={"gray"}
        bg={"gray"}
      />
      <Box>
        <FormLabel as="Text">Away Team</FormLabel>
        <SimpleGrid
          gap={"4"}
          alignItems={"center"}
          columns={{ base: 2, md: 3, lg: 6 }}
        >
          <StatInput
            team="away"
            onChange={handleMatchTeamChange}
            value={matchForm.away.stats.passes}
            name="passes"
          />
          <StatInput
            team="away"
            onChange={handleMatchTeamChange}
            value={matchForm.away.stats.offsides}
            name="offsides"
          />
          <StatInput
            team="away"
            onChange={handleMatchTeamChange}
            value={matchForm.away.stats.corners}
            name="corners"
          />
          <StatInput
            team="away"
            onChange={handleMatchTeamChange}
            value={matchForm.away.stats.shots}
            name="shots"
          />
          <StatInput
            team="away"
            onChange={handleMatchTeamChange}
            value={matchForm.away.stats.yellows}
            name="yellows"
          />
          <StatInput
            team="away"
            onChange={handleMatchTeamChange}
            value={matchForm.away.stats.reds}
            name="reds"
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default MatchStats;
