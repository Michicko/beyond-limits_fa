import BackButton from "@/components/admin/BackButton";
import CompetitionTypeForm from "@/components/admin/Forms/CompetitionTypeForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function CreateCup({ params }: { params: { competitionId: string } }) {
  return (
    <>
      <PageTitle pageTitle="Create Cup" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <CompetitionTypeForm competition_id={params.competitionId} type="Cup" />
      </Box>
    </>
  );
}

export default CreateCup;
