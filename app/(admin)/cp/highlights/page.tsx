"use client";
import { getHighlights } from "@/app/_actions/highlight-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import HighlightCard from "@/components/admin/Card/HighlightCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import CreateButton from "@/components/Buttons/CreateButton";
import { Box, Grid, GridItem, HStack, Skeleton } from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";

function Highlight() {
  const { data, isLoading, error } = useSWR("highlights", getHighlights);

  const highlights = data && data.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentHighlights = highlights?.slice(startIndex, endIndex);
  const totalPages = highlights && Math.ceil(highlights.length / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PageTitle pageTitle="Highlights" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-end"} mb={6}>
          <Skeleton
            loading={isLoading}
            w={isLoading ? "130px" : "auto"}
            h={isLoading ? "40px" : "auto"}
          >
            <CreateButton
              link="/cp/highlights/create"
              text="Create Highlight"
            />
          </Skeleton>
        </HStack>
        {isLoading ? (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={"20px"}
            mb={"100px"}
          >
            {Array.from({ length: 6 }).map((el, i) => {
              return (
                <GridItem key={i}>
                  <Skeleton h={"200px"} w={"full"} maxW={"360px"} />
                </GridItem>
              );
            })}
          </Grid>
        ) : error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error.message}
          />
        ) : !highlights || highlights.length < 1 ? (
          <CustomAlert
            status="info"
            title="No highlights."
            message={"No highlight available, create some to get started."}
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
            {currentHighlights &&
              currentHighlights.map((highlight) => {
                return (
                  <GridItem key={highlight.id}>
                    <HighlightCard highlight={highlight} />
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

export default Highlight;
