"use client";
import {
  deleteCompetition,
  getCompetitions,
} from "@/app/_actions/competition-actions";
import BackButton from "@/components/admin/BackButton";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import CompetitionFormDialog from "@/components/admin/Forms/CompetitionFormDialog";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import useToast from "@/hooks/useToast";
import { Nullable } from "@/lib/definitions";
import { getCloudinaryPublicId } from "@/lib/helpers";
import { Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

interface ICompetition {
  id?: string;
  logo: string;
  shortName: string;
  longName: string;
  type?: "LEAGUE" | "CUP" | "MIXED" | null | undefined;
  competitionSeasonIds?: Nullable<string>[] | null;
  trophyImage?: Nullable<string>;
  trophyArticleId?: Nullable<string>;
}

function Competitions() {
  const { data, error, isLoading } = useSWR("competitions", getCompetitions);
  const competitions = data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCompetitions = competitions?.slice(startIndex, endIndex);
  const [openForm, setOpenForm] = useState(false);
  const [dbCompetition, setDbCompetition] = useState<ICompetition | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { promiseToast } = useToast();

  const onEdit = (id: string) => {
    const comp = competitions && competitions.find((el) => el.id === id);
    if (comp) {
      console.log("clicked");
      setDbCompetition({
        id: comp.id,
        logo: comp.logo,
        shortName: comp.shortName,
        longName: comp.longName,
        type: comp.type,
        competitionSeasonIds: comp.competitionSeasonIds,
        trophyImage: comp.trophyImage,
        trophyArticleId: comp.trophyArticleId,
      });
      setIsEditing(true);
      setOpenForm(true);
    }
  };

  const handleDelete = async (competition: ICompetition) => {
    if (confirm("Are you sure?") && competition.id) {
      const images: string[] = [];

      if (competition.trophyImage && competition.logo) {
        let troph =
          competition.trophyImage &&
          getCloudinaryPublicId(competition.trophyImage);
        let logg = competition.logo && getCloudinaryPublicId(competition.logo);
        if (troph && logg) {
          images.push(troph, logg);
        }
      }

      const promise = deleteCompetition(competition.id, images);
      promiseToast(promise, competition.longName);
      promise.then(() => {
        setIsPending(false);
      });
    }
  };

  return (
    <>
      <HStack mb={6}>
        <BackButton />
      </HStack>
      <CompetitionFormDialog
        openForm={openForm}
        setOpenForm={setOpenForm}
        dbCompetition={dbCompetition}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <PaginatedTablePage
        error={error}
        headerCols={["s/n", "competition", "type", ""]}
        isLoading={isLoading}
        pageTitle="Competitions"
        resource="Competition"
        list={competitions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        pageSize={pageSize}
        showCreateButton={false}
      >
        <>
          {currentCompetitions &&
            currentCompetitions.map((competition, i) => {
              return (
                <TableRows key={competition.shortName}>
                  <>
                    <TableCell>{i + 1}</TableCell>
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
                      {competition.type && competition.type.toLowerCase()}
                    </TableCell>
                    <TableCell textAlign={"center"}>
                      <CustomMenu>
                        <>
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
                            <Button
                              h="40px"
                              cursor="pointer"
                              position="relative"
                              px={"20px"}
                              color={"text_lg"}
                              variant={"outline"}
                              colorPalette={"gray"}
                              justifyContent={"flex-start"}
                              onClick={() => onEdit(competition.id)}
                            >
                              Edit
                            </Button>
                          </CustomMenuItem>
                          <Button
                            h="40px"
                            cursor="pointer"
                            position="relative"
                            px={"10px"}
                            w={"full"}
                            color={"fg.error"}
                            variant={"outline"}
                            colorPalette={"red"}
                            justifyContent={"flex-start"}
                            border={0}
                            onClick={async () =>
                              await handleDelete(competition)
                            }
                            disabled={isPending}
                          >
                            Delete
                          </Button>
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
