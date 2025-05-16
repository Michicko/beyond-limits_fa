"use client";

import CustomAlert from "@/components/admin/Alert/CustomAlert";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import CreateButton from "@/components/Buttons/CreateButton";
import { Box, Grid, GridItem, HStack, Skeleton } from "@chakra-ui/react";
import useSWR from "swr";
import React, { useState } from "react";
import useSearchFilter from "@/hooks/useSearchFilter";
import AdminSearchInput from "../AdminSearch/AdminSearchInput";
import CursorPagination from "../Pagination/CursorPagination";
import useCursorPaginate from "@/hooks/useCursorPaginate";

type Props<T extends Record<string, any>> = {
  title: string;
  createButtonText: string;
  createButtonLink: string;
  fetcherKey: string;
  fetcherFunction: (nextToken: string | null) => Promise<{ data: T[], nextToken?: string | null}>;
  CardComponent: React.ComponentType<{ data: T }>;
  emptyTitle: string;
  emptyMessage: string;
  searchName?: string;
  searchItem?: string;
  showSearch?: boolean;
  sortFunction?: (a: T, b: T) => number;
};

function AdminPaginatedGrid<T extends Record<string, any>>({
  title,
  createButtonText,
  createButtonLink,
  fetcherKey,
  fetcherFunction,
  CardComponent,
  emptyTitle,
  emptyMessage,
  searchName,
  searchItem,
  showSearch,
  sortFunction
}: Props<T>) {
  const {currentPageIndex, currentToken, setCurrentPageIndex, setPageTokens, pageTokens} = useCursorPaginate();
  const { data, isLoading, error } = useSWR([fetcherKey, currentPageIndex], () => fetcherFunction(currentToken));

  const items = data?.data ?? [];

  const sortedItems = React.useMemo(() => {
    if (!sortFunction) return items;
    return [...items].sort(sortFunction);
  }, [items, sortFunction]);

  const { search, setSearch, filteredList } =
  showSearch && searchItem
    ? useSearchFilter(sortedItems, searchItem as keyof T)
    : { search: "", setSearch: () => {}, filteredList: sortedItems };

  return (
    <>
      <PageTitle pageTitle={title} />
      <Box w="full" h="full" mt="20px">
        <HStack justify="flex-end" mb={6}>
          <Skeleton
            loading={isLoading}
            w={isLoading ? "130px" : "auto"}
            h={isLoading ? "40px" : "auto"}
          >
            <CreateButton link={createButtonLink} text={createButtonText} />
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
            message={error.message}
          />
        ) : !items || items.length < 1 ? (
          <CustomAlert
            status="info"
            title={emptyTitle}
            message={emptyMessage}
          />
        ) : (
          <>
            {showSearch && searchName && (
              <AdminSearchInput
                search={search}
                setSearch={setSearch}
                name={searchName}
              />
            )}
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
              {(showSearch ? filteredList : items)?.map(
                (item: T, idx: number) => (
                  <GridItem key={idx}>
                    <CardComponent data={item} />
                  </GridItem>
                )
              )}
            </Grid>
          </>
        )}
        <CursorPagination
          nextToken={data?.nextToken} 
          currentPageIndex={currentPageIndex} 
          pageTokens={pageTokens} 
          setCurrentPageIndex={setCurrentPageIndex} 
          setPageTokens={setPageTokens} 
        />
      </Box>
    </>
  );
}

export default AdminPaginatedGrid;
