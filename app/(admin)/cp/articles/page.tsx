"use client";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import Link from "next/link";
import React, { useState } from "react";
import { formatDate } from "@/lib/helpers";
import {
  deleteArticle,
  getLazyLoadedArticles,
} from "@/app/_actions/article-actions";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import useSWR from "swr";
import PaginatedTablePage from "@/components/admin/PaginatedTablePage.tsx/PaginatedTablePage";

function Articles() {
  const { data, error, isLoading } = useSWR("articles", getLazyLoadedArticles);
  const articles = data && data.data;

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = articles?.slice(startIndex, endIndex);

  return (
    <PaginatedTablePage
      error={error}
      headerCols={["Title", "Category", "Status", "Created At", ""]}
      isLoading={isLoading}
      pageTitle="Articles"
      resource="Article"
      list={articles}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      startIndex={startIndex}
      endIndex={endIndex}
      pageSize={pageSize}
    >
      <>
        {currentArticles &&
          currentArticles.map((article) => {
            return (
              <TableRows key={article.title}>
                <>
                  <TableCell pl={"10px"}>{article.title}</TableCell>
                  <TableCell>{article.articleCategory.category}</TableCell>
                  <TableCell>{article.status}</TableCell>
                  <TableCell>{formatDate(article.createdAt)}</TableCell>
                  <TableCell>
                    <CustomMenu>
                      <>
                        <CustomMenuItem label="Edit" showBorder={true}>
                          <Link href={`/cp/articles/${article.id}/edit`}>
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
    </PaginatedTablePage>
  );
}

export default Articles;
