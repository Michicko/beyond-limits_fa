"use client";
import { deleteTeam, getTeams } from "@/app/_actions/team-actions";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

function Teams() {
  const { data, error, isLoading } = useSWR("teams", getTeams);

  const teams = data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTeams = teams?.slice(startIndex, endIndex);

  return (
    <PaginatedTablePage
      error={error}
      headerCols={["team", "stadium", ""]}
      isLoading={isLoading}
      pageTitle="Teams"
      resource="Team"
      list={teams}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      startIndex={startIndex}
      endIndex={endIndex}
      pageSize={pageSize}
      showCreateButton={true}
    >
      <>
        {currentTeams &&
          currentTeams.map((team) => {
            return (
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
                  <TableCell>
                    <CustomMenu>
                      <>
                        <CustomMenuItem label="Edit" showBorder={true}>
                          <Link href={`/cp/teams/${team.id}/edit`}>Edit</Link>
                        </CustomMenuItem>
                        <DeleteBtn
                          name={team.longName}
                          id={team.id}
                          onDelete={deleteTeam}
                        />
                      </>
                    </CustomMenu>
                  </TableCell>
                </>
              </TableRows>
            );
          })}
      </>
    </PaginatedTablePage>
  );
}

export default Teams;
