import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import TeamForm from "@/components/admin/Forms/TeamForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { teams } from "@/lib/placeholder-data";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function EditTeam({ params }: { params: { teamId: string } }) {
  const team = teams.find((team) => team.id === params.teamId);
  return (
    <>
      <PageTitle pageTitle="Edit Team" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {!team ? (
          <CustomAlert
            status="error"
            title={`No team with id ${params.teamId}`}
          />
        ) : (
          <TeamForm team={team} />
        )}
      </Box>
    </>
  );
}

export default EditTeam;
