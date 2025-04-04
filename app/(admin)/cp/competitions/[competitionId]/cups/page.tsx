import BackButton from "@/components/admin/BackButton";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Table from "@/components/admin/Table/Table";
import TableBody from "@/components/admin/Table/TableBody";
import TableCell from "@/components/admin/Table/TableCell";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import { competitions, cups, matches, playOffs } from "@/lib/placeholder-data";
import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function page({ params }: { params: { competitionId: string } }) {
  const competition = competitions.find((el) => el.id === params.competitionId);

  if (!competition) return <div>No competition</div>;

  const competition_cups = cups.filter(
    (el) => el.competition_id === params.competitionId
  );

  return (
    <>
      <PageTitle pageTitle={`${competition.long_name} Knockout stage`} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {competition_cups.length < 1 ? (
          <Text>No Cups available</Text>
        ) : (
          <>
            <Table>
              <>
                <TableHeader>
                  <TableRows>
                    <>
                      {["season", "status", "round", ""].map((head, i) => {
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
                    {competition_cups.map((cup) => {
                      const playoffs = playOffs.filter(
                        (playOff) => playOff.cup_id === cup.id
                      );

                      return (
                        <TableRows key={cup.id}>
                          <>
                            <TableCell pl={"10px"}>
                              {cup.season?.season}
                            </TableCell>
                            <TableCell>{cup.status}</TableCell>
                            <TableCell>
                              {playoffs[playoffs.length - 1].round}
                            </TableCell>
                            <TableCell>
                              <CustomMenu>
                                <>
                                  <CustomMenuItem
                                    label="Start next round"
                                    showBorder={true}
                                    disabled={cup.status === "completed"}
                                  >
                                    <Link
                                      href={
                                        cup.status === "completed"
                                          ? "#"
                                          : `/cp/competitions/${competition.id}/cups/${cup.id}/playoffs`
                                      }
                                    >
                                      Start next round
                                    </Link>
                                  </CustomMenuItem>
                                  <CustomMenuItem
                                    disabled={cup.status === "completed"}
                                    label="End cup"
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
          </>
        )}
      </Box>
    </>
  );
}

export default page;
