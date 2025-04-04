import BackButton from "@/components/admin/BackButton";
import PlayerPositionForm from "@/components/admin/Forms/PlayerPositionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

function EditPosition({ params }: { params: { positionId: string } }) {
  const loading = false;
  const position = {};
  return (
    <>
      <PageTitle pageTitle="Edit Position" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {loading || data ? (
          <PlayerPositionForm position={position} loading={loading} />
        ) : (
          <CustomAlert title="Something went wrong" status="error" />
        )}
      </Box>
    </>
  );
}

export default EditPosition;
