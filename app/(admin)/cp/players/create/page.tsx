import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import PlayerForm from "@/components/admin/Forms/PlayerForm";
import PlayerFormWrapper from "@/components/admin/Forms/PlayerFormWrapper";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function CreatePlayer() {
  return (
    <>
      <PageTitle pageTitle="Create Player" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <PlayerFormWrapper />
      </Box>
    </>
  );
}

export default CreatePlayer;
