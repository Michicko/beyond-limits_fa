"use client";
import React from "react";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import Link from "next/link";
import { formatDate } from "@/lib/helpers";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import { fetchSeasons } from "@/app/_actions/season-actions";
import useSWR from "swr";
import useSearchFilter from "@/hooks/useSearchFilter";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";

function Seasons() {
  const { data, error, isLoading } = useSWR("seasons", fetchSeasons);
  const seasons = data?.data ?? [];
  const { search, setSearch, filteredList } = useSearchFilter(
    seasons,
    "season",
  );

  return (
    <AdminPaginatedTable
      resourceName="Seasons"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["season", "created", ""]}
      createUrl="/cp/seasons/create"
      topContent={
        <AdminSearchInput search={search} setSearch={setSearch} name="season" />
      }
      renderRow={(season) => (
        <TableRows key={season.season}>
          <>
            <TableCell pl={"10px"}>{season.season}</TableCell>
            <TableCell>{formatDate(season.createdAt)}</TableCell>
            <TableCell textAlign={"center"}>
              <CustomMenu>
                <>
                  <CustomMenuItem label="Edit" showBorder={true}>
                    <Link href={`/cp/seasons/${season.id}/edit`}>Edit</Link>
                  </CustomMenuItem>
                  <DeleteBtn
                    name={season.season}
                    id={season.id}
                    module="Season"
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

export default Seasons;
