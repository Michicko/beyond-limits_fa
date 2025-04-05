import { deleteTeam } from "@/app/_actions/actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
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
import { Box, Container, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

async function Teams() {
  const { data: teams, errors } = await cookiesClient.models.Team.list({
    selectionSet: [
      "id",
      "logo",
      "longName",
      "shortName",
      "isBeyondLimits",
      "stadium",
    ],
    authMode: "userPool",
  });

  return (
    <>
      <PageTitle pageTitle="Teams" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={"20px"} gap="2">
            <CreateButton link="/cp/teams/create" text="Create Team" />
          </HStack>

          {errors ? (
            <CustomAlert
              status="error"
              title="Something went wrong."
              message={errors[0].message}
            />
          ) : teams.length < 1 ? (
            <CustomAlert
              status="info"
              title="No Teams."
              message={"No team available, create some to get started."}
            />
          ) : (
            <Table>
              <>
                <TableHeader>
                  <TableRows>
                    <>
                      {["team", "stadium", ""]
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
                    {teams.map((team) => {
                      return (
                        <TableRows key={team.shortName}>
                          <>
                            <TableCell pl={"10px"}>
                              <HStack align={"center"}>
                                <MatchIcon
                                  src={team.logo}
                                  size={"xl"}
                                  radius={false}
                                />
                                {team.longName}
                              </HStack>
                            </TableCell>
                            <TableCell>{team.stadium}</TableCell>
                            <TableCell>
                              <CustomMenu>
                                <>
                                  <CustomMenuItem
                                    label="Edit"
                                    showBorder={true}
                                  >
                                    <Link href={`/cp/teams/${team.id}/edit`}>
                                      Edit
                                    </Link>
                                  </CustomMenuItem>
                                  <DeleteBtn
                                    name={team.longName}
                                    id={team.id}
                                    onDelete={deleteTeam}
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
          {teams && teams.length > 0 && (
            <HStack justify={"center"} w={"full"}>
              <Pagination />
            </HStack>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Teams;
