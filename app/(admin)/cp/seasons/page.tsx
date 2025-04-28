"use client";
import React, { useState } from "react";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import { deleteSeason, fetchSeasons } from "@/app/_actions/season-actions";
import useSWR from "swr";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";

function Seasons() {
  const { data, error, isLoading } = useSWR("seasons", fetchSeasons);

  const seasons = data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentSeasons = seasons?.slice(startIndex, endIndex);

  return (
    <PaginatedTablePage
      error={error}
      headerCols={["season", "created", ""]}
      isLoading={isLoading}
      pageTitle="Seasons"
      resource="Season"
      list={seasons}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      startIndex={startIndex}
      endIndex={endIndex}
      pageSize={pageSize}
    >
      <>
        {currentSeasons &&
          currentSeasons.map((season) => {
            return (
              <TableRows key={season.season}>
                <>
                  <TableCell pl={"10px"}>{season.season}</TableCell>
                  <TableCell>{formatDate(season.createdAt)}</TableCell>
                  <TableCell>
                    <CustomMenu>
                      <>
                        <CustomMenuItem label="Edit" showBorder={true}>
                          <Link href={`/cp/seasons/${season.id}/edit`}>
                            Edit
                          </Link>
                        </CustomMenuItem>
                        <DeleteBtn
                          name={season.season}
                          id={season.id}
                          onDelete={deleteSeason}
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

export default Seasons;
