"use client";
import { getCompetitionSeasonsForCompetition } from "@/app/_actions/competition-season-actions";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";
import CompetitionMenuItemLink from "@/components/admin/CompetitionMenuItemLink";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import EndSeason from "@/components/admin/EndEntityBtn/EndSeason";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import useSearchFilter from "@/hooks/useSearchFilter";
import useSWR from "swr";

function CompetitionSeasons({ params }: { params: { competitionId: string } }) {
  const { data, error, isLoading } = useSWR(
    ["competitionSeasons", params.competitionId],
    () => getCompetitionSeasonsForCompetition(params.competitionId),
  );
  const seasons = data?.data ?? [];
  const { search, setSearch, filteredList } = useSearchFilter(seasons, "name");

  return (
    <AdminPaginatedTable
      resourceName="season"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["season", "status", "matches", ""]}
      createUrl={`/cp/competitions/${params.competitionId}/competition-seasons/create`}
      topContent={
        <AdminSearchInput search={search} setSearch={setSearch} name="season" />
      }
      renderRow={(season) => (
        <TableRows key={season.id}>
          <>
            <TableCell pl={"10px"}>
              {season.name} [{season.season}]
            </TableCell>
            <TableCell>{season.status}</TableCell>
            <TableCell>{season.matches.length}</TableCell>
            <TableCell textAlign={"center"}>
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
                    name={season.name}
                    id={season.id}
                    module="CompetitionSeason"
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

export default CompetitionSeasons;
