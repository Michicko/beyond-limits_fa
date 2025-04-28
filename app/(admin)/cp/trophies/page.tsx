"use client";
import TrophyCard from "@/components/admin/Card/TrophyCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, Flex, HStack, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import TrophyFormDialog from "@/components/admin/Forms/TrophyFormDialog";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import useSWR from "swr";
import { getTrophies } from "@/app/_actions/tropy-actions";
import { getCompetitions } from "@/app/_actions/competition-actions";

function Trophies() {
  const {
    data: trophiesData,
    error: trophiesError,
    isLoading,
  } = useSWR("trophies", getTrophies);
  const {
    data: competitionsData,
    error: competitionsError,
    isLoading: competitionsLoading,
  } = useSWR("competitions", getCompetitions);

  const competitions = competitionsData && competitionsData.data;
  const trophies = trophiesData && trophiesData.data;

  return (
    <>
      <PageTitle pageTitle="Trophies" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        {competitionsLoading ? (
          <HStack justify={"flex-end"} mb={"20px"} gap="2">
            <Skeleton
              h={isLoading ? "40px" : "auto"}
              w={isLoading ? "140px" : "auto"}
              loading={isLoading}
            />
          </HStack>
        ) : competitionsError ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={competitionsError.message}
          />
        ) : (
          competitions && (
            <HStack justify={"flex-end"} mb={"20px"} gap="2">
              <TrophyFormDialog competitions={competitions} />
            </HStack>
          )
        )}
        {isLoading ? (
          <Stack gap={4}>
            <Skeleton h={"300px"} w={"full"} maxW={"600px"} />
            <Skeleton h={"300px"} w={"full"} maxW={"600px"} />
            <Skeleton h={"300px"} w={"full"} maxW={"600px"} />
          </Stack>
        ) : trophiesError ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={trophiesError.message}
          />
        ) : !trophies || trophies.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Trophy."
            message={"No trophy available, create some to get started."}
          />
        ) : (
          <Flex my={"20px"} direction={"column"} gap={"4"}>
            {trophies.map((trophy) => {
              return <TrophyCard key={trophy.id} trophy={trophy} />;
            })}
          </Flex>
        )}
      </Box>
    </>
  );
}

export default Trophies;
