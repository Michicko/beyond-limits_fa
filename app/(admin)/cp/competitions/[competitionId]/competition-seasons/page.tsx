import { deleteCompetitionSeason } from "@/app/_actions/competition-season-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CompetitionMenuItemLink from "@/components/admin/CompetitionMenuItemLink";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import EndSeason from "@/components/admin/EndEntityBtn/EndSeason";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import Table from "@/components/admin/Table/Table";
import TableBody from "@/components/admin/Table/TableBody";
import TableCell from "@/components/admin/Table/TableCell";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import CreateButton from "@/components/Buttons/CreateButton";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack, Button } from "@chakra-ui/react";
import React from "react";

async function CompetitionSeasons({
  params,
}: {
  params: { competitionId: string };
}) {
  const { data: competitionSeasons, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        competitionId: {
          eq: params.competitionId,
        },
      },
      selectionSet: ["id", "status", "name", "season", "cupId", "leagueId"],
    });

  return (
    <>
      <PageTitle pageTitle={"seasons"} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <CreateButton
            link={`/cp/competitions/${params.competitionId}/competition-seasons/create`}
            text="Create Season"
          />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : competitionSeasons.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Competition season."
            message={"No season available, create some to get started."}
          />
        ) : (
          <>
            <Table>
              <>
                <TableHeader>
                  <TableRows>
                    <>
                      {["season", "status", ""].map((head, i) => {
                        return (
                          <TableColumnHeader
                            key={head}
                            pl={i === 0 ? "10px" : "0"}
                          >
                            {head}
                          </TableColumnHeader>
                        );
                      })}
                    </>
                  </TableRows>
                </TableHeader>
                <TableBody>
                  <>
                    {competitionSeasons.map(async (season) => {
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
                </TableBody>
              </>
            </Table>
            <HStack justify={"center"} w={"full"}>
              <Pagination />
            </HStack>
          </>
        )}
      </Box>
    </>
  );
}

export default CompetitionSeasons;
