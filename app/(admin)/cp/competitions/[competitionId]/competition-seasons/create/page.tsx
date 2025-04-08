import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionSeasonSteps from "@/components/admin/CompetitionSeasonSteps/CompetitionSeasonSetps";
import CompetitionSeasonFormWrapper from "@/components/admin/Forms/CompetitionSeasonFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import {
  Box,
  HStack,
  Button,
  ButtonGroup,
  Steps,
  Stack,
} from "@chakra-ui/react";
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
        selectionSet: ["id", "longName", "competitionType"],
      }
    );

  const { data: seasons, errors: seasonsErrors } =
    await cookiesClient.models.Season.list({
      selectionSet: ["season"],
    });

  return (
    <>
      <PageTitle pageTitle="Create Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        {errors || seasonsErrors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={
              errors
                ? errors[0].message
                : seasonsErrors
                ? seasonsErrors[0].message
                : "something went wrong."
            }
          />
        ) : !competition ? (
          <CustomAlert
            status="error"
            title={`No competiton with id ${params.competitionId}`}
          />
        ) : (
          <CompetitionSeasonSteps
            competitionType={competition.competitionType}
            seasons={seasons}
            competitionName={competition.longName}
          />
        )}
      </Box>
    </>
  );
}

export default CreateCompetitionSeason;
