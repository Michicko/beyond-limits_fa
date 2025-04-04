import BackButton from "@/components/admin/BackButton";
import CompetitionForm from "@/components/admin/Forms/CompetitionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function CreateCompetition() {
  return (
    <>
      <PageTitle pageTitle="Create Competition" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <CompetitionForm />
      </Box>
    </>
  );
}

export default CreateCompetition;
