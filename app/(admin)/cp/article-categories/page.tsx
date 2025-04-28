"use client";
import {
  deleteArticleCategory,
  getArticleCategories,
} from "@/app/_actions/article-category-actions";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

function ArticleCategories() {
  const { data, error, isLoading } = useSWR(
    "article-categories",
    getArticleCategories
  );
  const categories = data && data.data;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCategories = categories?.slice(startIndex, endIndex);

  return (
    <PaginatedTablePage
      error={error}
      headerCols={["category", ""]}
      isLoading={isLoading}
      pageTitle="Article Categories"
      resource="article-categories"
      list={categories}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      startIndex={startIndex}
      endIndex={endIndex}
      pageSize={pageSize}
    >
      <>
        {currentCategories &&
          currentCategories.map((category) => {
            return (
              <TableRows key={category.id}>
                <>
                  <TableCell pl={"10px"}>{category.category}</TableCell>
                  <TableCell>
                    <CustomMenu>
                      <>
                        <CustomMenuItem label="Edit" showBorder={true}>
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
    </PaginatedTablePage>
  );
}

export default ArticleCategories;
