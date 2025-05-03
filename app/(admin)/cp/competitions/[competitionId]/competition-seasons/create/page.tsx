import CustomAlert from "@/components/admin/Alert/CustomAlert";
import CompetitionSeasonSteps from "@/components/admin/CompetitionSeasonSteps/CompetitionSeasonSteps";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box } from "@chakra-ui/react";
import React from "react";

async function CreateCompetitionSeason({
  params,
}: {
  params: { competitionId: string };
}) {
  const { data: competition, errors } =
    await cookiesClient.models.Competition.get(
      {
        id: params.competitionId,
      },
      {
        selectionSet: ["id", "longName", "competitionType", "logo"],
      }
    );

  const { data: seasons, errors: seasonsErrors } =
    await cookiesClient.models.Season.list({
      selectionSet: ["season"],
    });

  const { data: teams, errors: teamsErrors } =
    await cookiesClient.models.Team.list({
      selectionSet: ["id", "logo", "longName"],
    });

  return (
    <>
      <PageTitle pageTitle="Create Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        {errors || seasonsErrors || teamsErrors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={
              errors
                ? errors[0].message
                : seasonsErrors
                ? seasonsErrors[0].message
                : teamsErrors
                ? teamsErrors[0].message
                : "something went wrong."
            }
          />
        ) : !teams || teams.length < 1 ? (
          <CustomAlert
            status="error"
            title={`No teams. Please create some teams before starting a competition season`}
          />
        ) : !seasons || seasons.length < 1 ? (
          <CustomAlert
            status="error"
            title={`No season. Please start a season before creating a competition season`}
          />
        ) : !competition ? (
          <CustomAlert
            status="error"
            title={`No competiton with id ${params.competitionId}`}
          />
        ) : (
          <CompetitionSeasonSteps
            competitionLogo={competition.logo}
            competitionType={competition.competitionType}
            seasons={seasons}
            competitionName={competition.longName}
            teams={teams}
            competitionId={params.competitionId}
          />
        )}
      </Box>
    </>
  );
}

export default CreateCompetitionSeason;
