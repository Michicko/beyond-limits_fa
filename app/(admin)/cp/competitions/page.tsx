"use client";
import { getCompetitions } from "@/app/_actions/competition-actions";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import useSearchFilter from "@/hooks/useSearchFilter";
import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

function Competitions() {
  const { data, error, isLoading } = useSWR("competitions", getCompetitions);
  const competitions = data?.data ?? [];
  const { search, setSearch, filteredList } = useSearchFilter(
    competitions,
    "longName"
  );

  return (
    <AdminPaginatedTable
      resourceName="Competition"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["competition", "competition type", "seasons", ""]}
      topContent={
        <AdminSearchInput
          search={search}
          setSearch={setSearch}
          name="competition"
        />
      }
      renderRow={(competition) => (
        <TableRows key={competition.shortName}>
          <>
            <TableCell pl={"10px"}>
              <HStack align={"center"}>
                <MatchIcon src={competition.logo} size={"xl"} radius={true} />
                {competition.longName}
              </HStack>
            </TableCell>
            <TableCell>
              {competition.competitionType &&
                competition.competitionType.toLowerCase()}
            </TableCell>
            <TableCell>{competition.competitionSeasons.length}</TableCell>
            <TableCell textAlign={"center"}>
              <CustomMenu>
                <>
                  <CustomMenuItem label="Create season" showBorder={true}>
                    <Link
                      href={`/cp/competitions/${competition.id}/competition-seasons/create`}
                    >
                      Create Season
                    </Link>
                  </CustomMenuItem>
                  <CustomMenuItem label="View seasons" showBorder={true}>
                    <Link
                      href={`/cp/competitions/${competition.id}/competition-seasons`}
                    >
                      View Seasons
                    </Link>
                  </CustomMenuItem>
                  <CustomMenuItem label="Edit" showBorder={true}>
                    <Link href={`/cp/competitions/${competition.id}/edit`}>
                      Edit
                    </Link>
                  </CustomMenuItem>
                  <DeleteBtn
                    name={competition.longName}
                    id={competition.id}
                    module="Competition"
                    images={[competition.logo]}
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

export default Competitions;
