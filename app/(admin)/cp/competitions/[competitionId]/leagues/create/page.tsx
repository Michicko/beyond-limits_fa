import BackButton from "@/components/admin/BackButton";
import LeagueForm from "@/components/admin/Forms/LeagueForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function CreateLeague({ params }: { params: { competitionId: string } }) {
  return (
    <>
      <PageTitle pageTitle="Create League" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <LeagueForm competition={params.competitionId} />
      </Box>
    </>
  );
}

export default CreateLeague;
