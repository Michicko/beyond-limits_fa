import { cookiesClient } from "@/utils/amplify-utils";
import { Box } from "@chakra-ui/react";
import React from "react";
import CustomAlert from "../Alert/CustomAlert";
import { Schema } from "@/amplify/data/resource";
import CompetitionSeasonForm from "./CompetitionSeasonForm";


type ICompetitionSeason = Pick<
  Schema["CompetitionSeason"]["type"],
  "id" | 'season' | 'status' | 'winnerId' | 'competitionId'
>;


async function CompetitionSeasonFormWrapper({ competitionId, competitionSeason }: {competitionId: string;  competitionSeason?:  ICompetitionSeason }) {
  const { data: teams, errors: teamsErrors } =
    await cookiesClient.models.Team.list({
      selectionSet: ["id", 'logo', "longName", "createdAt"],
    });
  const { data: seasons, errors: seasonsErrors } =
    await cookiesClient.models.Season.list({
      selectionSet: ["id", "season"],
    });

  const statuses = cookiesClient.enums.CompetitionStatus.values();

  return (
    <Box w={"full"}>
      {(teamsErrors || seasonsErrors )&& (
        <CustomAlert
          status="error"
          title="Something went wrong."
          message={teamsErrors ? teamsErrors[0].message : seasonsErrors ?  seasonsErrors[0].message : 'Something went wrong.' }
        />
      )}
      {teams && seasons && statuses && (
        <CompetitionSeasonForm 
        teams={teams} 
        seasons={seasons} 
        statuses={statuses} 
        competitionId={competitionId}
        competitionSeason={competitionSeason} 
        />
      )}
    </Box>
  );
}

export default CompetitionSeasonFormWrapper;
