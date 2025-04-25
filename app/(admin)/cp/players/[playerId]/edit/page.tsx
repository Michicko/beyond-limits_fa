import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import PlayerFormWrapper from "@/components/admin/Forms/PlayerFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function EditPlayer({ params }: { params: { playerId: string } }) {
  const { data: player, errors } = await cookiesClient.models.Player.get(
    { id: params.playerId },
    {
      selectionSet: [
        "id",
        "firstname",
        "lastname",
        "ageGroup",
        "homeKit",
        "squadNo",
        "playerPosition.shortName",
        "playerPosition.longName",
        "dob",
        "dominantFoot",
        "status",
        "isTwoFooted",
        "playerPosition.id",
        "awayKit",
        "height",
        "weight",
      ],
    }
  );

  return (
    <>
      <PageTitle pageTitle="Edit Player" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert title={`${errors[0].message}`} status="error" />
        ) : !player ? (
          <CustomAlert
            status="error"
            title={`No player with id ${params.playerId}`}
          />
        ) : (
          <PlayerFormWrapper player={player} />
        )}
      </Box>
    </>
  );
}

export default EditPlayer;
