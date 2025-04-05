import BackButton from "@/components/admin/BackButton";
import CompetitionForm from "@/components/admin/Forms/CompetitionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function CreateCompetition() {
  const competitionTypes = cookiesClient.enums.CompetitionType.values();

  return (
    <>
      <PageTitle pageTitle="Create Competition" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {competitionTypes && (
          <CompetitionForm competitionTypes={competitionTypes} />
        )}
      </Box>
    </>
  );
}

export default CreateCompetition;
