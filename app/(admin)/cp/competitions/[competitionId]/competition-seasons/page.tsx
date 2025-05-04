"use client";
import { getCompetition } from "@/app/_actions/competition-actions";
import {
  deleteCompetitionSeason,
  getCompetitionSeasons,
} from "@/app/_actions/competition-season-actions";
import { getTeams } from "@/app/_actions/team-actions";
import BackButton from "@/components/admin/BackButton";
import CompetitionMenuItemLink from "@/components/admin/CompetitionMenuItemLink";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import EndSeason from "@/components/admin/EndEntityBtn/EndSeason";
import CompetitionSeasonFormDialog from "@/components/admin/Forms/CompetitionSeasonFormDialog";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import useToast from "@/hooks/useToast";
import { Nullable } from "@/lib/definitions";
import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

interface IFormat {
  groupStage: boolean;
  playOff: boolean;
}

interface ICompetitionSeason {
  id?: string;
  season: string;
  startingYear?: Nullable<number>;
  name: string;
  type: "LEAGUE" | "CUP" | "MIXED" | null;
  logo: string;
  competitionId: string;
  isWinner?: boolean | null;
  status?: "PENDING" | "COMPLETED" | null;
  teamIds?: Nullable<string>[] | null;
  standingIds?: Nullable<string>[] | null;
  format?: IFormat | null;
  groupStageEnded?: boolean | null;
}

function CompetitionSeasons({ params }: { params: { competitionId: string } }) {
  const {
    data: competitionSeasonsData,
    error,
    isLoading,
  } = useSWR(["competitionSeasons", params.competitionId], () =>
    getCompetitionSeasons(params.competitionId)
  );
  const { data: competition } = useSWR(
    ["competitions", params.competitionId],
    () => getCompetition(params.competitionId)
  );
  const { data: teamsData } = useSWR(["teams"], () => getTeams());

  const teams = teamsData && teamsData.data;
  const competitionSeasons =
    competitionSeasonsData && competitionSeasonsData.data;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCompetitionSeasons = competitionSeasons?.slice(
    startIndex,
    endIndex
  );

  const [openForm, setOpenForm] = useState(false);
  const [dbCompetitionSeason, setDbCompetitionSeason] =
    useState<ICompetitionSeason | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { promiseToast } = useToast();

  const onEdit = (id: string) => {
    const comp =
      competitionSeasons && competitionSeasons.find((el) => el.id === id);

    if (comp) {
      setDbCompetitionSeason({
        id: comp.id,
        season: comp.season,
        startingYear: comp.startingYear,
        name: comp.name,
        type: comp.type as "LEAGUE" | "CUP" | "MIXED" | null,
        logo: comp.logo,
        competitionId: comp.competitionId,
        isWinner: comp.isWinner,
        status: comp.status,
        teamIds: comp.teamIds,
        standingIds: comp.standingIds,
        format: {
          groupStage: comp.format?.groupStage ?? false,
          playOff: comp.format?.playOff ?? false,
        },
        groupStageEnded: comp.groupStageEnded,
      });
      setIsEditing(true);
      setOpenForm(true);
    }
  };

  return (
    <>
      <HStack mb={6}>
        <BackButton />
      </HStack>
      {competition && teams && (
        <CompetitionSeasonFormDialog
          competition={competition}
          openForm={openForm}
          setOpenForm={setOpenForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          teams={teams}
          dbCompetitionSeason={dbCompetitionSeason}
        />
      )}
      <PaginatedTablePage
        error={error}
        headerCols={["season", "status", "type", ""]}
        isLoading={isLoading}
        pageTitle="Seasons"
        resource="competition-season"
        list={competitionSeasons}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        pageSize={pageSize}
        createUrl={`/cp/competitions/${params.competitionId}/competition-seasons/create`}
        showCreateButton={false}
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
                    <TableCell>{season.type}</TableCell>
                    <TableCell>
                      <CustomMenu>
                        <>
                          <CustomMenuItem label="View" showBorder={true}>
                            <Link
                              href={`/cp/competitions/${params.competitionId}/competition-seasons/${season.id}`}
                            >
                              View
                            </Link>
                          </CustomMenuItem>
                          <CustomMenuItem label="Edit" showBorder={true}>
                            <Button
                              h="35px"
                              cursor="pointer"
                              position="relative"
                              px={"20px"}
                              color={"text_lg"}
                              variant={"outline"}
                              colorPalette={"gray"}
                              justifyContent={"flex-start"}
                              onClick={() => onEdit(season.id)}
                            >
                              Edit
                            </Button>
                          </CustomMenuItem>

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
