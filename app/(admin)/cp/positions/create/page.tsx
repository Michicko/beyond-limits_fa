import BackButton from "@/components/admin/BackButton";
import PlayerPositionForm from "@/components/admin/Forms/PlayerPositionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React, { Suspense } from "react";

function CreatePosition() {
  return (
    <>
      <PageTitle pageTitle="Create Position" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <Suspense fallback={null}>
          <PlayerPositionForm position={null} />
        </Suspense>
      </Box>
    </>
  );
}

export default CreatePosition;
