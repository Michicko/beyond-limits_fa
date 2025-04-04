import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import PlayerForm from "@/components/admin/Forms/PlayerForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { players } from "@/lib/placeholder-data";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function EditPlayer({ params }: { params: { playerId: string } }) {
  const player = players.find((player) => player.id === params.playerId);
  return (
    <>
      <PageTitle pageTitle="Edit Player" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {!player ? (
          <CustomAlert
            status="error"
            title={`No player with id ${params.playerId}`}
          />
        ) : (
          <PlayerForm player={player} />
        )}
      </Box>
    </>
  );
}

export default EditPlayer;
