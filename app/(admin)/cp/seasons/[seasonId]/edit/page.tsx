"use client";
import { getSeason } from "@/app/_actions/season-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import SeasonForm from "@/components/admin/Forms/SeasonForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, HStack } from "@chakra-ui/react";
import React, { Suspense } from "react";
import useSWR from "swr";

function EditSeason({ params }: { params: { seasonId: string } }) {
  const { data, error, isLoading } = useSWR(["seasons", params.seasonId], () =>
    getSeason(params.seasonId),
  );
  const season = data?.data ?? null;

  return (
    <>
      <PageTitle pageTitle="Edit Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <BackButton />
        </HStack>

        {error ? (
          <CustomAlert
            status="error"
            title={"Something went wrong"}
            message={`${error.message}`}
          />
        ) : !season ? (
          <CustomAlert
            title={`No season with id ${params.seasonId}`}
            status="error"
          />
        ) : (
          <Suspense fallback={null}>
            <SeasonForm season={season} />
          </Suspense>
        )}
      </Box>
    </>
  );
}

export default EditSeason;
