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

type Props<T> = {
  title: string;
  createButtonText: string;
  createButtonLink: string;
  fetcherKey: string;
  fetcherFunction: () => Promise<{ data: T[] }>;
  CardComponent: React.ComponentType<{ data: T }>;
  emptyTitle: string;
  emptyMessage: string;
  searchName?: string;
  searchItem?: string;
  showSearch?: boolean;
};

function AdminPaginatedGrid<T>({
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
}: Props<T>) {
  const { data, isLoading, error } = useSWR(fetcherKey, fetcherFunction);

  const items = data?.data ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = items?.slice(startIndex, endIndex);
  const totalPages = items && Math.ceil(items.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { search, setSearch, filteredList } = useSearchFilter(
    currentItems,
    searchItem,
  );

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
            >
              {currentItems?.map((item: T, idx: number) => (
                <GridItem key={idx}>
                  <CardComponent data={item} />
                </GridItem>
              ))}
            </Grid>
          </>
        )}

        {totalPages && totalPages > 1 && (
          <HStack justifyContent="center">
            <HStack
              display={{ base: "flex", sm: "none" }}
              justifyContent="center"
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
              justifyContent="center"
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
        )}
      </Box>
    </>
  );
}

export default AdminPaginatedGrid;
