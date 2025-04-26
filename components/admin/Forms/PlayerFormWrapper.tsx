"use server";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box } from "@chakra-ui/react";
import React from "react";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import PlayerForm from "@/components/admin/Forms/PlayerForm";
import { IPlayer } from "@/lib/definitions";

async function PlayerFormWrapper({ player }: { player?: IPlayer | null }) {
  const { data: positions, errors: positionErrors } =
    await cookiesClient.models.PlayerPosition.list({
      selectionSet: ["id", "longName", "shortName"],
    });

  const statuses = cookiesClient.enums.PlayerStatus.values();
  const ageGroups = cookiesClient.enums.AgeGroup.values();
  const dominantFoots = cookiesClient.enums.DominantFoot.values();

  return (
    <Box w={"full"}>
      {positionErrors && (
        <CustomAlert
          status="error"
          title="Something went wrong."
          message={positionErrors[0].message}
        />
      )}
      {statuses && ageGroups && dominantFoots && positions && (
        <PlayerForm
          positions={positions}
          statuses={statuses}
          ageGroups={ageGroups}
          dominantFoots={dominantFoots}
          player={player}
        />
      )}
    </Box>
  );
}

export default PlayerFormWrapper;
