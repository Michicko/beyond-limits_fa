import { deleteArticleCategory } from "@/app/_actions/actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
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

async function ArticleCategories() {
  const { data: categories, errors } =
    await cookiesClient.models.ArticleCategory.list({
      selectionSet: ["id", "category"],
      authMode: "userPool",
    });
  return (
    <>
      <PageTitle pageTitle="Article Categories" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={"20px"} gap="2">
            <CreateButton
              link="/cp/article-categories/create"
              text="Create Category"
            />
          </HStack>

          {errors ? (
            <CustomAlert
              status="error"
              title="Something went wrong."
              message={errors[0].message}
            />
          ) : categories.length < 1 ? (
            <CustomAlert
              status="info"
              title="No Article category."
              message={
                "No article category available, create some to get started."
              }
            />
          ) : (
            <Table>
              <>
                <TableHeader>
                  <TableRows>
                    <>
                      {["category", ""]
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
                    {categories.map((category) => {
                      return (
                        <TableRows key={category.id}>
                          <>
                            <TableCell pl={"10px"}>
                              {category.category}
                            </TableCell>
                            <TableCell>
                              <CustomMenu>
                                <>
                                  <CustomMenuItem
                                    label="Edit"
                                    showBorder={true}
                                  >
                                    <Link
                                      href={`/cp/article-categories/${category.id}/edit`}
                                    >
                                      Edit
                                    </Link>
                                  </CustomMenuItem>
                                  <DeleteBtn
                                    name={category.category}
                                    id={category.id}
                                    onDelete={deleteArticleCategory}
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
          {categories && categories.length > 0 && (
            <HStack justify={"center"} w={"full"}>
              <Pagination />
            </HStack>
          )}
        </Container>
      </Box>
    </>
  );
}

export default ArticleCategories;
