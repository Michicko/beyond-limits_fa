"use client";
import PageTitle from "@/components/admin/Layout/PageTitle";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Field,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableCell from "@/components/admin/Table/TableCell";
import Pagination from "@/components/admin/Pagination/Pagination";
// import FormDialog from "@/components/FormDialog/FormDialog";
import Table from "@/components/admin/Table/Table";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import TableBody from "@/components/admin/Table/TableBody";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import Link from "next/link";

const seasons = [
  {
    id: "2380576c-20d9-4d05-9a96-0735514f13fc",
    season: "2022/2023",
    competitions: 5,
    matches: 54,
    createdAt: "2022-05-19",
  },
  {
    id: "2380576c-20d9-4d05-9a96-1735514f03fc",
    season: "2023/2024",
    competitions: 4,
    matches: 54,
    createdAt: "2023-05-19",
  },
  {
    id: "2380576c-20d9-4d05-9a96-0735514f03fc",
    season: "2024/2025",
    competitions: 4,
    matches: 54,
    createdAt: "2024-05-19",
  },
];

function Seasons() {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

  const [selection, setSelection] = useState<string[]>([]);
  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < seasons.length;

  return (
    <>
      <PageTitle pageTitle="Seasons" />
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
              <Link href={"/cp/seasons/create"}>Create Season</Link>
            </Button>
          </HStack>
          <Table>
            <>
              <TableHeader>
                <TableRows>
                  <>
                    {[
                      ...Object.keys(seasons[0]).filter((el) => el !== "id"),
                      "",
                    ].map((head, i) => {
                      return (
                        <TableColumnHeader
                          key={head}
                          textAlign={i === 1 || i === 2 ? "center" : "left"}
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
                  {seasons.map((season) => {
                    return (
                      <TableRows
                        key={season.season}
                        data-selected={
                          selection.includes(season.season) ? "" : undefined
                        }
                      >
                        <>
                          <TableCell pl={"10px"}>{season.season}</TableCell>
                          <TableCell textAlign={"center"}>
                            {season.competitions}
                          </TableCell>
                          <TableCell textAlign={"center"}>
                            {season.matches}
                          </TableCell>
                          <TableCell>{season.createdAt}</TableCell>
                          <TableCell>
                            <CustomMenu>
                              <>
                                <CustomMenuItem label="Edit" showBorder={true}>
                                  <Link href={`/cp/seasons/${season.id}/edit`}>
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

export default Seasons;
