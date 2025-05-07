"use client";
import PageTitle from "@/components/admin/Layout/PageTitle";
import React from "react";
import { Box, Container, HStack, Skeleton } from "@chakra-ui/react";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import Pagination from "@/components/admin/Pagination/Pagination";
import Table from "@/components/admin/Table/Table";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import TableBody from "@/components/admin/Table/TableBody";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import CreateButton from "@/components/Buttons/CreateButton";
import TableSkeleton from "@/components/admin/Skeletons/TableSkeleton/TableSkeleton";

function PaginatedTablePage({
  children,
  list,
  isLoading,
  error,
  pageTitle,
  headerCols,
  resource,
  currentPage,
  setCurrentPage,
  pageSize,
  startIndex,
  endIndex,
  createUrl,
  topContent,
}: {
  children: React.ReactNode;
  list?: any[];
  isLoading: boolean;
  error: any;
  pageTitle: string;
  headerCols: string[];
  resource: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  startIndex: number;
  endIndex: number;
  createUrl?: string;
  topContent?: React.ReactNode;
}) {
  const currentPageListItems = list?.slice(startIndex, endIndex);
  const totalPages = list && Math.ceil(list.length / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PageTitle pageTitle={pageTitle} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={"20px"} gap="4" w={"full"}>
            <Skeleton
              loading={isLoading}
              h={isLoading ? "40px" : "auto"}
              w={isLoading ? "160px" : "auto"}
            >
              <CreateButton
                link={createUrl ?? `/cp/${resource.toLowerCase()}s/create`}
                text={`Create ${resource}`}
              />
            </Skeleton>
          </HStack>

          <HStack justify={"flex-start"} mb={"20px"} gap="4" w={"full"}>
            <Skeleton
              loading={isLoading}
              h={isLoading ? "40px" : "auto"}
              w={isLoading ? "160px" : "auto"}
            >
              {topContent}
            </Skeleton>
          </HStack>

          {error ? (
            <CustomAlert
              status="error"
              title="Something went wrong."
              message={error.message}
            />
          ) : isLoading ? (
            <TableSkeleton rows={5} cols={3} />
          ) : !list || list.length < 1 ? (
            <CustomAlert
              status="info"
              title={`No ${resource}s.`}
              message={`No ${resource} available, create some to get started.`}
            />
          ) : (
            <Table>
              <>
                <TableHeader>
                  <TableRows>
                    <>
                      {headerCols.map((head, i) => {
                        return (
                          <TableColumnHeader
                            key={head}
                            textAlign={"left"}
                            fontWeight={"700"}
                          >
                            {head}
                          </TableColumnHeader>
                        );
                      })}
                    </>
                  </TableRows>
                </TableHeader>
                <TableBody>
                  <>{children}</>
                </TableBody>
              </>
            </Table>
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
        </Container>
      </Box>
    </>
  );
}

export default PaginatedTablePage;
