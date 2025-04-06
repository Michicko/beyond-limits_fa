import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import PlayerPositionForm from "@/components/admin/Forms/PlayerPositionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React, { Suspense } from "react";

async function EditPosition({ params }: { params: { positionId: string } }) {
  const { data: position, errors } =
    await cookiesClient.models.PlayerPosition.get(
      {
        id: params.positionId,
      },
      {
        selectionSet: [
          "id",
          "shortName",
          "longName",
          "attributes",
          "createdAt",
        ],
      }
    );

  return (
    <>
      <PageTitle pageTitle="Edit Position" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            title={`No player position with id ${params.positionId}`}
            status="error"
          />
        ) : (
          <Suspense fallback={null}>
            <PlayerPositionForm position={position} />
          </Suspense>
        )}
      </Box>
    </>
  );
}

export default EditPosition;
