"use client";
import BackButton from "@/components/admin/BackButton";
import PlayerPositionForm from "@/components/admin/Forms/PlayerPositionForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { data, type Schema } from "@/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import CustomAlert from "@/components/admin/Alert/CustomAlert";

const client = generateClient<Schema>();

function EditPosition({ params }: { params: { positionId: string } }) {
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState<
    Schema["PlayerPosition"]["type"] | null
  >(null);
  const [error, setError] = useState(false);

  const getPosition = useCallback(async () => {
    const { data, errors } = await client.models.PlayerPosition.get({
      id: params.positionId,
    });
    if (data) {
      setPosition(data);
      setLoading(false);
    }

    if (errors) {
      console.log(errors);
      setError(true);
    }
  }, []);

  useEffect(() => {
    getPosition();
  }, []);

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
