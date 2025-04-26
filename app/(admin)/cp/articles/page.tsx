import CustomAlert from "@/components/admin/Alert/CustomAlert";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import Table from "@/components/admin/Table/Table";
import TableBody from "@/components/admin/Table/TableBody";
import TableCell from "@/components/admin/Table/TableCell";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import CreateButton from "@/components/Buttons/CreateButton";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, Container, HStack, TableColumnHeader } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { formatDate } from "@/lib/helpers";
import { deleteArticle } from "@/app/_actions/article-actions";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";

async function Articles() {
  const { data: articles, errors } = await cookiesClient.models.Article.list({
    selectionSet: [
      "id",
      "title",
      "articleCategory.category",
      "status",
      "createdAt",
    ],
    authMode: "userPool",
  });

  return (
    <>
      <PageTitle pageTitle="Articles" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={4}>
            <CreateButton link="/cp/articles/create" text={"Create Article"} />
          </HStack>
          {errors ? (
            <CustomAlert
              status="error"
              title="Something went wrong."
              message={errors[0].message}
            />
          ) : articles.length < 1 ? (
            <CustomAlert
              status="info"
              title="No Articles."
              message={"No article available, create some to get started."}
            />
          ) : (
            <Table>
              <>
                <TableHeader>
                  <TableRows>
                    <>
                      {["Title", "Category", "Status", "Created At", ""]
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
                        <TableRows key={article.title}>
                          <>
                            <TableCell pl={"10px"}>{article.title}</TableCell>
                            <TableCell>
                              {article.articleCategory.category}
                            </TableCell>
                            <TableCell>{article.status}</TableCell>
                            <TableCell>
                              {formatDate(article.createdAt)}
                            </TableCell>
                            <TableCell>
                              <CustomMenu>
                                <>
                                  <CustomMenuItem
                                    label="Edit"
                                    showBorder={true}
                                  >
                                    <Link
                                      href={`/cp/articles/${article.id}/edit`}
                                    >
                                      Edit
                                    </Link>
                                  </CustomMenuItem>
                                  <DeleteBtn
                                    name={article.title}
                                    id={article.id}
                                    onDelete={deleteArticle}
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
          {articles && articles.length > 1 && (
            <HStack justify={"center"} w={"full"}>
              <Pagination />
            </HStack>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Articles;
