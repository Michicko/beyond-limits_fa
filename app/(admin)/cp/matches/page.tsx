"use client";
import { getMatches } from "@/app/_actions/match-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import MatchCard from "@/components/admin/Card/MatchCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import CreateButton from "@/components/Buttons/CreateButton";
import { Box, Grid, GridItem, HStack, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";

function Matches() {
  const { data, isLoading, error } = useSWR("matches", getMatches);

  const matches = data && data.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMatches = matches?.slice(startIndex, endIndex);
  const totalPages = matches && Math.ceil(matches.length / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PageTitle pageTitle="Matches" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-end"} mb={4}>
          <CreateButton link="/cp/matches/create" text="Create Match" />
        </HStack>
        {error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error.message}
          />
        ) : isLoading ? (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={"20px"}
            mb={"100px"}
          >
            {Array.from({ length: 6 }).map((_, i) => {
              return (
                <GridItem key={i + 1}>
                  <Skeleton w={"full"} h={"160px"} />
                </GridItem>
              );
            })}
          </Grid>
        ) : !currentMatches || currentMatches.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Match."
            message={"No match available, create some to get started."}
          />
        ) : (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={"20px"}
            mb={"100px"}
          >
            {currentMatches &&
              currentMatches.map((match) => {
                return (
                  <GridItem key={match.id}>
                    <MatchCard match={match} showMenu={true} />
                  </GridItem>
                );
              })}
          </Grid>
        )}
        {totalPages && totalPages > 1 ? (
          <HStack justifyContent={"center"}>
            <HStack
              display={{ base: "flex", sm: "none" }}
              justifyContent={"center"}
            >
              <Pagination
                page={currentPage}
                pageCount={totalPages}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                type="mobile"
              />
            </HStack>
            <HStack
              display={{ base: "none", sm: "flex" }}
              justifyContent={"center"}
            >
              <Pagination
                page={currentPage}
                pageCount={totalPages}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                type="web"
              />
            </HStack>
          </HStack>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}

export default Matches;
