"use client";
import {
  deleteCompetition,
  getCompetitions,
} from "@/app/_actions/competition-actions";
import BackButton from "@/components/admin/BackButton";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

function Competitions() {
  const { data, error, isLoading } = useSWR("competitions", getCompetitions);

  const competitions = data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCompetitions = competitions?.slice(startIndex, endIndex);

  return (
    <>
      <HStack mb={6}>
        <BackButton />
      </HStack>
      <PaginatedTablePage
        error={error}
        headerCols={["competition", "competition type", ""]}
        isLoading={isLoading}
        pageTitle="Competitions"
        resource="Competition"
        list={competitions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        pageSize={pageSize}
      >
        <>
          {currentCompetitions &&
            currentCompetitions.map((competition) => {
              return (
                <TableRows key={competition.shortName}>
                  <>
                    <TableCell pl={"10px"}>
                      <HStack align={"center"}>
                        <MatchIcon
                          src={competition.logo}
                          size={"xl"}
                          radius={true}
                        />
                        {competition.longName}
                      </HStack>
                    </TableCell>
                    <TableCell>
                      {competition.competitionType &&
                        competition.competitionType.toLowerCase()}
                    </TableCell>
                    <TableCell>
                      <CustomMenu>
                        <>
                          <CustomMenuItem
                            label="Create season"
                            showBorder={true}
                          >
                            <Link
                              href={`/cp/competitions/${competition.id}/competition-seasons/create`}
                            >
                              Create Season
                            </Link>
                          </CustomMenuItem>
                          <CustomMenuItem
                            label="View seasons"
                            showBorder={true}
                          >
                            <Link
                              href={`/cp/competitions/${competition.id}/competition-seasons`}
                            >
                              View Seasons
                            </Link>
                          </CustomMenuItem>
                          <CustomMenuItem label="Edit" showBorder={true}>
                            <Link
                              href={`/cp/competitions/${competition.id}/edit`}
                            >
                              Edit
                            </Link>
                          </CustomMenuItem>
                          <DeleteBtn
                            name={competition.longName}
                            id={competition.id}
                            onDelete={deleteCompetition}
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
    </>
  );
}

export default Competitions;
