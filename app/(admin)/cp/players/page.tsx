import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import { cookiesClient } from "@/utils/amplify-utils";
import CreateButton from "@/components/Buttons/CreateButton";
import AdminPlayers from "@/components/admin/AdminPlayers/AdminPlayers";
import CustomAlert from "@/components/admin/Alert/CustomAlert";

async function Players() {
  const ageGroups = cookiesClient.enums.AgeGroup.values();
  const { data: players, errors } = await cookiesClient.models.Player.list({
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
    ],
  });

  const { data: positions, errors: positionErrors } =
    await cookiesClient.models.PlayerPosition.list({
      selectionSet: ["id", "longName"],
    });

  const transformedPositions = positions.map((el) => el.longName);

  return (
    <>
      <PageTitle pageTitle="Players" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <CreateButton link="/cp/players/create" text="Create Player" />
        </HStack>
        {errors || positionErrors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={
              (errors && errors[0].message) ||
              (positionErrors && positionErrors[0].message)
            }
          />
        ) : players.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Players."
            message={"No player available, create some to get started."}
          />
        ) : (
          <AdminPlayers
            ageGroups={ageGroups}
            players={players}
            positions={transformedPositions}
          />
        )}
      </Box>
    </>
  );
}

export default Players;
