import BackButton from "@/components/admin/BackButton";
import CompetitionSeasonFormWrapper from "@/components/admin/Forms/CompetitionSeasonFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function CreateCompetitionSeason({params}: {params: {competitionId: string}}) {
  return (
    <>
      <PageTitle pageTitle="Create Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <CompetitionSeasonFormWrapper competitionId={params.competitionId} />
      </Box>
    </>
  )
}

export default CreateCompetitionSeason;
