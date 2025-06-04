"use client";
import PageTitle from "@/components/admin/Layout/PageTitle";
import React from "react";
import { Box, Container, HStack, Skeleton } from "@chakra-ui/react";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import Table from "@/components/admin/Table/Table";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import TableBody from "@/components/admin/Table/TableBody";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import CreateButton from "@/components/Buttons/CreateButton";
import TableSkeleton from "@/components/admin/Skeletons/TableSkeleton/TableSkeleton";
import CursorPagination from "../Pagination/CursorPagination";

function PaginatedTablePage({
  children,
  list,
  isLoading,
  error,
  pageTitle,
  headerCols,
  resource,
  nextToken,
  setPageTokens,
  setCurrentPageIndex,
  pageTokens,
  currentPageIndex,
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
  nextToken?: string | null;
  setPageTokens: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageTokens: (string | null)[];
  currentPageIndex: number;
  createUrl?: string;
  topContent?: React.ReactNode;
}) {
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
                text={`Create ${resource.slice(0, resource.length - 1)}`}
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
          <CursorPagination
            nextToken={nextToken}
            currentPageIndex={currentPageIndex}
            pageTokens={pageTokens}
            setCurrentPageIndex={setCurrentPageIndex}
            setPageTokens={setPageTokens}
          />
        </Container>
      </Box>
    </>
  );
}

export default PaginatedTablePage;
