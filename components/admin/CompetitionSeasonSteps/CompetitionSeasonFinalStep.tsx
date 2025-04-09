import { HStack, Stack, Steps } from "@chakra-ui/react";
import React from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";
import FormBtn from "../Forms/FormBtn";

function CompetitionSeasonFinalStep({
  competitionType,
  season,
  competitionName,
  goToNextStep,
  competitionId,
  cupId,
  leagueId,
}: {
  competitionType: string | null;
  season: string;
  competitionName: string;
  goToNextStep: () => void;
  competitionId: string;
  cupId?: string;
  leagueId?: string;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("season", season);
    formData.append("competitionId", competitionId);
    formData.append("status", "PENDING");
    formData.append("winnerId", "");

    if (cupId) {
      formData.append("cupId", cupId);
    }

    if (leagueId) {
      formData.append("leagueId", leagueId);
    }

    const data = Array.from(formData.entries(), ([key, val]) => [key, val]);

    console.log(data);
    goToNextStep();
  };

  return (
    <Steps.Content index={competitionType === "MIXED" ? 3 : 2}>
      <form onSubmit={handleSubmit}>
        <CompetitionSeasonCard title="Create Competition Season">
          <Stack gap={2} mb={"5"}>
            <CompetitionSeasonInfo label={"Name"} value={competitionName} />
            <CompetitionSeasonInfo label={"Season"} value={season} />
            {competitionType === "MIXED" ? (
              <>
                <CompetitionSeasonInfo label={"Type"} value={competitionType} />
                <CompetitionSeasonInfo label={"Main"} value={"LEAGUE"} />
                <CompetitionSeasonInfo label={"Knockout"} value={"CUP"} />
              </>
            ) : (
              <CompetitionSeasonInfo label={"Type"} value={competitionType} />
            )}
          </Stack>
          <HStack justifyContent={"flex-end"}>
            <FormBtn type="submit">Create Season</FormBtn>
          </HStack>
        </CompetitionSeasonCard>
      </form>
    </Steps.Content>
  );
}

export default CompetitionSeasonFinalStep;
