"use client";
import {
  deleteCompetitionSeason,
  getCompetitionSeasons,
} from "@/app/_actions/competition-season-actions";
import BackButton from "@/components/admin/BackButton";
import CompetitionMenuItemLink from "@/components/admin/CompetitionMenuItemLink";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import EndSeason from "@/components/admin/EndEntityBtn/EndSeason";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";

function CompetitionSeasons({ params }: { params: { competitionId: string } }) {
  const { data, error, isLoading } = useSWR(
    ["competitionSeasons", params.competitionId],
    () => getCompetitionSeasons(params.competitionId)
  );

  const competitionSeasons = data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCompetitionSeasons = competitionSeasons?.slice(
    startIndex,
    endIndex
  );

  return (
    <>
      <HStack mb={6}>
        <BackButton />
      </HStack>
      <PaginatedTablePage
        error={error}
        headerCols={["season", "status", ""]}
        isLoading={isLoading}
        pageTitle="Seasons"
        resource="competition-season"
        list={competitionSeasons}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        pageSize={pageSize}
      >
        <>
          {currentCompetitionSeasons &&
            currentCompetitionSeasons.map((season) => {
              return (
                <TableRows key={season.id}>
                  <>
                    <TableCell pl={"10px"}>
                      {season.name} [{season.season}]
                    </TableCell>
                    <TableCell>{season.status}</TableCell>
                    <TableCell>
                      <CustomMenu>
                        <>
                          <CompetitionMenuItemLink
                            disabled={false}
                            label="View season"
                            link={`/cp/competitions/${params.competitionId}/competition-seasons/${season.id}`}
                          />
                          <EndSeason
                            id={season.id}
                            cupId={season.cupId}
                            leagueId={season.leagueId}
                            season={season.season}
                            disabled={season.status === "COMPLETED"}
                          />
                          <DeleteBtn
                            id={season.id}
                            name="competition season"
                            onDelete={deleteCompetitionSeason}
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

export default CompetitionSeasons;
