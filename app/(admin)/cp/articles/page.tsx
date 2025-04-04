"use client";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import Table from "@/components/Table/Table";
import TableBody from "@/components/Table/TableBody";
import TableCell from "@/components/Table/TableCell";
import TableHeader from "@/components/Table/TableHeader";
import TableRows from "@/components/Table/TableRows";
import { articles } from "@/lib/placeholder-data";
import {
  Box,
  Button,
  Container,
  HStack,
  TableColumnHeader,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";

function Articles() {
  const [selection, setSelection] = useState<string[]>([]);
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };
  return (
    <>
      <PageTitle pageTitle="Articles" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={4}>
            <Button
              colorPalette={"blue"}
              variant={"solid"}
              css={btnStyles}
              size={"md"}
              asChild
            >
              <Link href={"/cp/articles/create"}>Create Article</Link>
            </Button>
          </HStack>
          <Table>
            <>
              <TableHeader>
                <TableRows>
                  <>
                    {["Title", "Category", ""]
                      .filter((el) => el !== "id")
                      .map((head, i) => {
                        return (
                          <TableColumnHeader
                            key={head}
                            verticalAlign={"middle"}
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
                  {articles.map((article) => {
                    return (
                      <TableRows
                        key={article.title}
                        data-selected={
                          selection.includes(article.title) ? "" : undefined
                        }
                      >
                        <>
                          <TableCell pl={"10px"}>{article.title}</TableCell>
                          <TableCell>{article.category?.name}</TableCell>
                          <TableCell>
                            <CustomMenu>
                              <>
                                <CustomMenuItem label="Edit" showBorder={true}>
                                  <Link
                                    href={`/cp/articles/${article.id}/edit`}
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
          <HStack justify={"center"} w={"full"}>
            <Pagination />
          </HStack>
        </Container>
      </Box>
    </>
  );
}

export default Articles;
