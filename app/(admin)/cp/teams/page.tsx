"use client";
import { getTeams } from "@/app/_actions/team-actions";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import useCursorPaginate from "@/hooks/useCursorPaginate";
import useSearchFilter from "@/hooks/useSearchFilter";
import { sortByCreatedAt } from "@/lib/helpers";
import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

function Teams() {
  const {currentPageIndex, currentToken, setCurrentPageIndex, setPageTokens, pageTokens} = useCursorPaginate();
  const { data, error, isLoading } = useSWR(["teams", currentPageIndex], () => getTeams(currentToken));
  const teams = data?.data ?? [];

  const sortedTeams = sortByCreatedAt([...teams]);
  const { search, setSearch, filteredList } = useSearchFilter(
    sortedTeams,
    "longName"
  );

  return (
    <AdminPaginatedTable
      resourceName="Team"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["team", "stadium", ""]}
      nextToken={data?.nextToken} 
      currentPageIndex={currentPageIndex} 
      pageTokens={pageTokens} 
      setCurrentPageIndex={setCurrentPageIndex} 
      setPageTokens={setPageTokens} 
      topContent={
        <AdminSearchInput search={search} setSearch={setSearch} name="teams" />
      }
      renderRow={(team) => (
        <TableRows key={team.shortName}>
          <>
            <TableCell pl={"10px"}>
              <HStack align={"center"}>
                <Box
                  as={"span"}
                  height={"8px"}
                  w={"8px"}
                  flexShrink={0}
                  borderRadius={"50%"}
                  bg={team.isBeyondLimits ? "green.500" : "transparent"}
                ></Box>
                <MatchIcon src={team.logo} size={"xl"} radius={false} />
                {team.longName}
              </HStack>
            </TableCell>
            <TableCell>{team.stadium}</TableCell>
            <TableCell textAlign={"center"}>
              <CustomMenu>
                <>
                  <CustomMenuItem label="Edit" showBorder={true}>
                    <Link href={`/cp/teams/${team.id}/edit`}>Edit</Link>
                  </CustomMenuItem>
                  <DeleteBtn
                    name={team.longName}
                    id={team.id}
                    module="Team"
                    images={[team.logo]}
                  />
                </>
              </CustomMenu>
            </TableCell>
          </>
        </TableRows>
      )}
    />
  );
}

export default Teams;
