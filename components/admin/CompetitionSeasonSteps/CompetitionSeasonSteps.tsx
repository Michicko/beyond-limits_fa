"use client";
import { Box, Steps, Stack, useSteps } from "@chakra-ui/react";
import { useState } from "react";
import { Schema } from "@/amplify/data/resource";
import LeagueContent from "./LeagueContent";
import CompetitionSeasonSelector from "./CompetitionSeasonSelector";
import CompetitionSeasonFinalStep from "./CompetitionSeasonFinalStep";
import CupContent from "./CupContent";
import CompetitionSeasonComplete from "./CompetitionSeasonComplete";

function CompetitionSeasonSteps({
  competitionLogo,
  competitionId,
  competitionType,
  competitionName,
  teams,
}: {
  competitionLogo: string;
  competitionId: string;
  competitionType: "CUP" | "LEAGUE" | "MIXED" | null;
  competitionName: string;
  teams: Pick<Schema["Team"]["type"], "id" | "logo" | "longName">[];
}) {
  const [season, setSeason] = useState("");
  const [cupId, setCupId] = useState("");
  const [leagueId, setLeagueId] = useState("");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const count = competitionType === "MIXED" ? 4 : 3;

  const { value, setStep } = useSteps({
    defaultStep: 0,
    count: count,
  });

  const stepTitleStyles = {
    display: { base: "none", md: "block" },
  };

  const goToNextStep = () => {
    const nextStep = value + 1;
    setStep(nextStep);
  };

  return (
    <Box>
      <Steps.Root
        defaultStep={0}
        step={value}
        count={count}
        linear={true}
        size={"sm"}
      >
        <Steps.List
          maxW={{ base: "auto", md: "763px" }}
          w={{ base: "auto", md: "full" }}
          margin={{ base: "unset", md: "0 auto" }}
        >
          <Steps.Item index={0} title={"Enter Season"}>
            <Steps.Indicator />
            <Steps.Title css={stepTitleStyles}>Enter Season</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
          {competitionType === "CUP" && (
            <Steps.Item index={1} title={"Create Cup"}>
              <Steps.Indicator />
              <Steps.Title css={stepTitleStyles}>Create Cup</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          )}
          {competitionType === "LEAGUE" && (
            <Steps.Item index={1} title={"Create League"}>
              <Steps.Indicator />
              <Steps.Title css={stepTitleStyles}>Create League</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          )}
          {competitionType === "MIXED" && (
            <>
              <Steps.Item index={1} title={"Create Cup"}>
                <Steps.Indicator />
                <Steps.Title css={stepTitleStyles}>Create Cup</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
              <Steps.Item index={2} title={"Create League"}>
                <Steps.Indicator />
                <Steps.Title css={stepTitleStyles}>Create League</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            </>
          )}
          <Steps.Item
            index={competitionType === "MIXED" ? 3 : 2}
            title={"Create Competition Season"}
          >
            <Steps.Indicator />
            <Steps.Title css={stepTitleStyles}>Competition Season</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        </Steps.List>

        <Stack w={"full"} mt={"10"} outline={"transparent"}>
          <CompetitionSeasonSelector
            goToNextStep={goToNextStep}
            season={season}
            setSeason={setSeason}
          />
          {competitionType === "CUP" && (
            <CupContent
              competitionName={competitionName}
              season={season}
              index={1}
              setCupId={setCupId}
              goToNextStep={goToNextStep}
            />
          )}
          {competitionType === "LEAGUE" && (
            <LeagueContent
              index={1}
              season={season}
              competitionName={competitionName}
              teams={teams}
              selectedTeams={selectedTeams}
              setSelectedTeams={setSelectedTeams}
              goToNextStep={goToNextStep}
              setLeagueId={setLeagueId}
            />
          )}
          {competitionType === "MIXED" && (
            <>
              <CupContent
                competitionName={competitionName}
                season={season}
                index={1}
                setCupId={setCupId}
                goToNextStep={goToNextStep}
              />
              <LeagueContent
                index={2}
                season={season}
                competitionName={competitionName}
                teams={teams}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
                goToNextStep={goToNextStep}
                setLeagueId={setLeagueId}
              />
            </>
          )}
          <CompetitionSeasonFinalStep
            cupId={cupId}
            leagueId={leagueId}
            competitionLogo={competitionLogo}
            competitionName={competitionName}
            competitionType={competitionType}
            season={season}
            goToNextStep={goToNextStep}
            competitionId={competitionId}
          />
          <CompetitionSeasonComplete competitionId={competitionId} />
        </Stack>
      </Steps.Root>
    </Box>
  );
}

export default CompetitionSeasonSteps;
