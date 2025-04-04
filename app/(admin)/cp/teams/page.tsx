"use client";
import MatchIcon from "@/components/admin/Card/MatchIcon";
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
import { teams } from "@/lib/placeholder-data";
import { Box, Button, Container, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

function Teams() {
  const [selection, setSelection] = useState<string[]>([]);

  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };
  return (
    <>
      <PageTitle pageTitle="Teams" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={"20px"} gap="4">
            <Button
              colorPalette={"blue"}
              variant={"solid"}
              css={btnStyles}
              size={"md"}
              asChild
            >
              <Link href={"/cp/teams/create"}>Create Team</Link>
            </Button>
          </HStack>
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
                      <TableRows
                        key={team.shortName}
                        data-selected={
                          selection.includes(team.shortName) ? "" : undefined
                        }
                      >
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
                                <CustomMenuItem label="Edit" showBorder={true}>
                                  <Link href={`/cp/teams/${team.id}/edit`}>
                                    Edit
                                  </Link>
                                </CustomMenuItem>
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
        </Container>
      </Box>
    </>
  );
}

export default Teams;
