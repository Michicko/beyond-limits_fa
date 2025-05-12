import BackButton from "@/components/admin/BackButton";
import TeamForm from "@/components/admin/Forms/TeamForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function CreateTeam() {
    const {data: teams} = await cookiesClient.models.Team.list({
      filter: {
        isBeyondLimits: {
          eq: true
        }
      },
      selectionSet: ['isBeyondLimits']
    });
  
    const isBeyondLimits = teams[0]?.isBeyondLimits ?? null;

  return (
    <>
      <PageTitle pageTitle="Create Team" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <TeamForm beyondLimitsExists={isBeyondLimits} />
      </Box>
    </>
  );
}

export default CreateTeam;
