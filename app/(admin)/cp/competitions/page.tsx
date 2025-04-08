import { deleteCompetition } from "@/app/_actions/actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Table from "@/components/admin/Table/Table";
import TableBody from "@/components/admin/Table/TableBody";
import TableCell from "@/components/admin/Table/TableCell";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import CreateButton from "@/components/Buttons/CreateButton";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, Container, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

async function Competitions() {
  const { data: competitions, errors } =
    await cookiesClient.models.Competition.list({
      selectionSet: ["id", "logo", "shortName", "longName", "competitionType"],
      authMode: "userPool",
    });

  return (
    <>
      <PageTitle pageTitle="Competitions" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <>
            <HStack justify={"flex-end"} mb={"20px"} gap="2">
              <CreateButton
                link="/cp/competitions/create"
                text="Create Competition"
              />
            </HStack>
            {errors ? (
              <CustomAlert
                status="error"
                title="Something went wrong."
                message={errors[0].message}
              />
            ) : competitions.length < 1 ? (
              <CustomAlert
                status="info"
                title="No Competition."
                message={
                  "No competition available, create some to get started."
                }
              />
            ) : (
              <Table>
                <>
                  <TableHeader>
                    <TableRows>
                      <>
                        {["competition", "competition type", ""]
                          .filter((el) => el !== "id")
                          .map((head, i) => {
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
                      {competitions.map((competition) => {
                        return (
                          <TableRows key={competition.shortName}>
                            <>
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
                                {competition.competitionType}
                              </TableCell>
                              <TableCell>
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
                                    <CustomMenuItem
                                      label="Edit"
                                      showBorder={true}
                                    >
                                      <Link
                                        href={`/cp/competitions/${competition.id}/edit`}
                                      >
                                        Edit
                                      </Link>
                                    </CustomMenuItem>
                                    <DeleteBtn
                                      name={competition.longName}
                                      id={competition.id}
                                      onDelete={deleteCompetition}
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
            )}
          </>
        </Container>
      </Box>
    </>
  );
}

export default Competitions;
