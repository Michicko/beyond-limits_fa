import BackButton from "@/components/admin/BackButton";
import TeamForm from "@/components/admin/Forms/TeamForm";
import PageTitle from "@/components/admin/Layout/PageTitle";

import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function CreateTeam() {
  return (
    <>
      <PageTitle pageTitle="Create Team" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <TeamForm />
      </Box>
    </>
  );
}

export default CreateTeam;
