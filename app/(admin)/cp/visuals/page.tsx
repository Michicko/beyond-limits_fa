"use client";
import { getVisuals } from "@/app/_actions/gallery-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import VisualCard from "@/components/admin/Card/VisualCard";
import VisualForm from "@/components/admin/Forms/VisualForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CursorPagination from "@/components/admin/Pagination/CursorPagination";
import useCursorPaginate from "@/hooks/useCursorPaginate";
import { Box, Grid, GridItem, HStack, Skeleton } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

function visuals() {
  const {
    currentPageIndex,
    currentToken,
    setCurrentPageIndex,
    setPageTokens,
    pageTokens,
  } = useCursorPaginate();

  const { data, isLoading, error } = useSWR(["visuals", currentPageIndex], () =>
    getVisuals(currentToken)
  );

  const images = data?.data ?? [];

  return (
    <>
      <PageTitle pageTitle={"Gallery"} />
      <Box w="full" h="full" mt="20px">
        <HStack justify="flex-end" mb={6}>
          <Skeleton
            loading={isLoading}
            w={isLoading ? "130px" : "auto"}
            h={isLoading ? "40px" : "auto"}
          >
            <VisualForm />
          </Skeleton>
        </HStack>

        {isLoading ? (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap="20px"
            mb="100px"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <GridItem key={i}>
                <Skeleton h="200px" w="full" maxW="360px" loading={isLoading} />
              </GridItem>
            ))}
          </Grid>
        ) : error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error?.message}
          />
        ) : !images || images.length < 1 ? (
          <CustomAlert
            status="info"
            title={"No images"}
            message={"No Images available at the moment"}
          />
        ) : (
          <>
            <Grid
              gridTemplateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
              gap="20px"
              mb="100px"
              mt={4}
            >
              {images.map((el) => {
                return (
                  <GridItem key={el.id}>
                    <VisualCard moduleName="Visual" visual={el} />
                  </GridItem>
                );
              })}
            </Grid>
            <CursorPagination
              nextToken={data?.nextToken}
              currentPageIndex={currentPageIndex}
              pageTokens={pageTokens}
              setCurrentPageIndex={setCurrentPageIndex}
              setPageTokens={setPageTokens}
            />
          </>
        )}
      </Box>
    </>
  );
}

export default visuals;
