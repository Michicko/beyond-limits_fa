"use client";
import MatchIcon from "@/components/admin/Card/MatchIcon";
import CustomFileUpload from "@/components/admin/CustomFileUpload/CustomFileUpload";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import FormDialog from "@/components/admin/FormDialog/FormDialog";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Table/Table";
import TableBody from "@/components/Table/TableBody";
import TableCell from "@/components/Table/TableCell";
import TableColumnHeader from "@/components/Table/TableColumnHeader";
import TableHeader from "@/components/Table/TableHeader";
import TableRows from "@/components/Table/TableRows";
import { competitions, leagues, mixed_cups } from "@/lib/placeholder-data";
import {
  Box,
  Button,
  Container,
  Field,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

function Competitions() {
  const [selection, setSelection] = useState<string[]>([]);
  const hasSelection = selection.length > 0;

  const [season, setSeason] = useState<string>("");
  const [competitionType, setCompetitionType] = useState("");

  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

  const handleCompetitionTypeChange = (e: {
    target: { name: string; value: any };
  }) => {
    const { value } = e.target;
    setCompetitionType(value);
  };

  return (
    <>
      <PageTitle pageTitle="Competitions" />
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
              <Link href={"/cp/competitions/create"}>Create Competition</Link>
            </Button>
          </HStack>
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
                      <TableRows
                        key={competition.short_name}
                        data-selected={
                          selection.includes(competition.short_name)
                            ? ""
                            : undefined
                        }
                      >
                        <>
                          <TableCell pl={"10px"}>
                            <HStack align={"center"}>
                              <MatchIcon
                                src={competition.logo}
                                size={"xl"}
                                radius={true}
                              />
                              {competition.long_name}
                            </HStack>
                          </TableCell>
                          <TableCell>{competition.competition_type}</TableCell>
                          <TableCell>
                            <CustomMenu>
                              <>
                                {(competition.competition_type === "LEAGUE" ||
                                  competition.competition_type ===
                                    "MIXEDCUP") && (
                                  <>
                                    <CustomMenuItem
                                      label="Create League"
                                      showBorder={true}
                                    >
                                      <Link
                                        href={`/cp/competitions/${competition.id}/leagues/create`}
                                      >
                                        Create League
                                      </Link>
                                    </CustomMenuItem>
                                    <CustomMenuItem
                                      label="View Leagues"
                                      showBorder={true}
                                    >
                                      <Link
                                        href={`/cp/competitions/${competition.id}/leagues`}
                                      >
                                        View Leagues
                                      </Link>
                                    </CustomMenuItem>
                                  </>
                                )}

                                {competition.competition_type ===
                                  "MIXEDCUP" && (
                                  <>
                                    <CustomMenuItem
                                      label="Create cup"
                                      showBorder={true}
                                    >
                                      <Link
                                        href={`/cp/competitions/${competition.id}/cups/create`}
                                      >
                                        Create cup
                                      </Link>
                                    </CustomMenuItem>
                                    <CustomMenuItem
                                      label="View cups"
                                      showBorder={true}
                                    >
                                      <Link
                                        href={`/cp/competitions/${competition.id}/cups`}
                                      >
                                        View cups
                                      </Link>
                                    </CustomMenuItem>
                                  </>
                                )}
                                <CustomMenuItem label="Edit" showBorder={true}>
                                  <Link
                                    href={`/cp/competitions/${competition.id}/edit`}
                                  >
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
        </Container>
      </Box>
    </>
  );
}

export default Competitions;
