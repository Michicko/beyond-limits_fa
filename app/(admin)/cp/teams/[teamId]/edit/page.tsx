import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import TeamForm from "@/components/admin/Forms/TeamForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function EditTeam({ params }: { params: { teamId: string } }) {
  const { data: team, errors } = await cookiesClient.models.Team.get(
    { id: params.teamId },
    {
      selectionSet: [
        "id",
        "logo",
        "longName",
        "shortName",
        "isBeyondLimits",
        "stadium",
      ],
      authMode: "userPool",
    }
  );
  return (
    <>
      <PageTitle pageTitle="Edit Team" />
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
        ) : !team ? (
          <CustomAlert
            status="info"
            title="No Team."
            message={`No team with id ${params.teamId} available.`}
          />
        ) : (
          <TeamForm team={team} />
        )}
      </Box>
    </>
  );
}

export default EditTeam;
