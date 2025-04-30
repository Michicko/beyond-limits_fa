"use client";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import CreateButton from "@/components/Buttons/CreateButton";
import AdminPlayers from "@/components/admin/AdminPlayers/AdminPlayers";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import {
  getAgeGroups,
  getPlayersLazyLoaded,
} from "@/app/_actions/player-actions";
import useSWR from "swr";
import PlayersSkeleton from "@/components/admin/Skeletons/PlayersSkeleton";

function Players() {
  const { data: ageGroupsData } = useSWR("age-groups", getAgeGroups);
  const { data, error, isLoading } = useSWR("players", getPlayersLazyLoaded);
  const ageGroups = ageGroupsData;
  const players = data && data.data;
  const positions = players && players.map((el) => el.playerPosition.longName);

  return (
    <>
      <PageTitle pageTitle="Players" />
      <Box w={"full"} h={"full"} mt={"10px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <Skeleton
            h={"40px"}
            w={isLoading ? "120px" : "auto"}
            loading={isLoading}
          >
            <CreateButton link="/cp/players/create" text="Create Player" />
          </Skeleton>
        </HStack>
        {error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error.message}
          />
        ) : isLoading ? (
          <PlayersSkeleton isLoading={isLoading} />
        ) : !players || players.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Players."
            message={"No player available, create some to get started."}
          />
        ) : (
          ageGroups &&
          players &&
          positions && (
            <AdminPlayers
              ageGroups={ageGroups}
              players={players}
              positions={positions}
            />
          )
        )}
      </Box>
    </>
  );
}

export default Players;
