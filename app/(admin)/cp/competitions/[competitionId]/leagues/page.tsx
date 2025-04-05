import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import Table from "@/components/admin/Table/Table";
import TableBody from "@/components/admin/Table/TableBody";
import TableCell from "@/components/admin/Table/TableCell";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import { competitions, leagues } from "@/lib/placeholder-data";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

async function Leagues({ params }: { params: { competitionId: string } }) {
  return (
    <>
      <PageTitle
        pageTitle={`${competition.long_name} ${
          competition.competition_type === "MIXEDCUP" ? "Main" : ""
        }`}
      />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {competition_leagues.length < 1 ? (
          <CustomAlert title="No leagues available" status="error" />
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
                    {competition_leagues.map((league) => {
                      return (
                        <TableRows key={league.id}>
                          <>
                            <TableCell pl={"10px"}>
                              {league.season?.season}
                            </TableCell>
                            <TableCell>{league.status}</TableCell>
                            <TableCell>
                              <CustomMenu>
                                <>
                                  <CustomMenuItem
                                    label="Update standing"
                                    showBorder={true}
                                    disabled={league.status === "completed"}
                                  >
                                    <Link
                                      href={
                                        league.status === "completed"
                                          ? "#"
                                          : `/cp/competitions/${competition.id}/leagues/${league.id}/standing`
                                      }
                                    >
                                      Update standing
                                    </Link>
                                  </CustomMenuItem>
                                  <CustomMenuItem
                                    disabled={league.status === "completed"}
                                    label="End League"
                                    showBorder={true}
                                  />
                                  <CustomMenuItem
                                    label="Delete"
                                    showBorder={false}
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

export default Leagues;
