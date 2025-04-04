import BackButton from "@/components/admin/BackButton";
import CompetitionForm from "@/components/admin/Forms/CompetitionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { competitions } from "@/lib/placeholder-data";
import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

function EditCompetition({ params }: { params: { competitionId: string } }) {
  const competition = competitions.find(
    (competition) => competition.id === params.competitionId
  );
  return (
    <>
      <PageTitle
        pageTitle={`Edit ${competition ? competition.long_name : ""}`}
      />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {!competition ? (
          <Text>No Competition with id {params.competitionId}</Text>
        ) : (
          <CompetitionForm competition={competition} />
        )}
      </Box>
    </>
  );
}

export default EditCompetition;
