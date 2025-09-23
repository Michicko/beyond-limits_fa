import { IMatch, IMatchFormData, IStackStyles } from "@/lib/definitions";
import { Box, Separator, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import StatInput from "./StatInput";
import FormLabel from "./FormLabel";
import { Schema } from "@/amplify/data/resource";

function MatchStats({
  stackStyles,
  matchForm,
  setMatchForm,
}: {
  stackStyles: IStackStyles;
  matchForm: IMatchFormData;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchFormData>>;
}) {
  const handleTeam = (
    e: { target: { name: string; value: any } },
    team: "home" | "away"
  ) => {
    const { name, value } = e.target;
    const teamKey = team === "home" ? "homeTeam" : "awayTeam";

    setMatchForm((prevForm) => ({
      ...prevForm,
      [teamKey]: {
        ...prevForm[teamKey],
        [name]: value,
      },
    }));
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Match Stats</FormLabel>
      <Box>
        <FormLabel as="Text">Home Team</FormLabel>
        {matchForm.homeTeam && (
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 6 }}
            gap={"4"}
            alignItems={"center"}
          >
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.possession || ""}
              name="possession"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.passes || ""}
              name="passes"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.successful_passes || ""}
              name="successful_passes"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.offsides || ""}
              name="offsides"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.corners || ""}
              name="corners"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.shots || ""}
              name="shots"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.yellows || ""}
              name="yellows"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.reds || ""}
              name="reds"
            />
            <StatInput
              team="home"
              onChange={(e) => handleTeam(e, "home")}
              value={matchForm.homeTeam.penalties || ""}
              name="penalties"
            />
          </SimpleGrid>
        )}
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
        {matchForm.awayTeam && (
          <SimpleGrid
            gap={"4"}
            alignItems={"center"}
            columns={{ base: 2, md: 3, lg: 6 }}
          >
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.possession || ""}
              name="possession"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.passes || ""}
              name="passes"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.successful_passes || ""}
              name="successful_passes"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.offsides || ""}
              name="offsides"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.corners || ""}
              name="corners"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.shots || ""}
              name="shots"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.yellows || ""}
              name="yellows"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.reds || ""}
              name="reds"
            />
            <StatInput
              team="away"
              onChange={(e) => handleTeam(e, "away")}
              value={matchForm.awayTeam.penalties || ""}
              name="penalties"
            />
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

export default MatchStats;
