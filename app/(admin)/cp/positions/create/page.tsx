import BackButton from "@/components/admin/BackButton";
import PlayerPositionForm from "@/components/admin/Forms/PlayerPositionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, Card, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function CreatePosition() {
  return (
    <>
      <PageTitle pageTitle="Create Position" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <PlayerPositionForm position={null} />
      </Box>
    </>
  );
}

export default CreatePosition;
