import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionSeasonFormWrapper from "@/components/admin/Forms/CompetitionSeasonFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function EditCompetitionSeason({params}: {params: {competitionId: string; competitionSeasonId: string}}) {

  const {data: competitionSeason, errors} = await cookiesClient.models.CompetitionSeason.get({
    id: params.competitionSeasonId
  }, {
    selectionSet: ['id', 'season', 'winnerId', 'competitionId']
  })

  return  <>
      <PageTitle pageTitle="Edit Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : !competitionSeason ? (
          <CustomAlert
            status="error"
            title={`No season with id ${params.competitionSeasonId}`}
          />
        ) :
        <CompetitionSeasonFormWrapper 
          competitionId={params.competitionId} 
          competitionSeason={competitionSeason} 
        />
      }
      </Box>
    </>
}

export default EditCompetitionSeason;
