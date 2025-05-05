"use client";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import Link from "next/link";
import React, { useState } from "react";
import { formatDate } from "@/lib/helpers";
import { getLazyLoadedArticles } from "@/app/_actions/article-actions";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import useSWR from "swr";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";
import useSearchFilter from "@/hooks/useSearchFilter";

function Articles() {
  const { data, error, isLoading } = useSWR("articles", getLazyLoadedArticles);
  const articles = data?.data || [];
  const { search, setSearch, filteredList } = useSearchFilter(
    articles,
    "title"
  );

  return (
    <AdminPaginatedTable
      resourceName="Article"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["Title", "Category", "Status", "Created At", ""]}
      topContent={
        <AdminSearchInput
          search={search}
          setSearch={setSearch}
          name="article"
        />
      }
      renderRow={(article) => (
        <TableRows key={article.id}>
          <>
            <TableCell>{article.title}</TableCell>
            <TableCell>{article.articleCategory?.category}</TableCell>
            <TableCell>{article.status}</TableCell>
            <TableCell>{formatDate(article.createdAt)}</TableCell>
            <TableCell textAlign={"center"}>
              <CustomMenu>
                <>
                  <CustomMenuItem label="Edit" showBorder>
                    <Link href={`/cp/articles/${article.id}/edit`}>Edit</Link>
                  </CustomMenuItem>
                  <DeleteBtn
                    name={article.title}
                    id={article.id}
                    module="Article"
                    images={[article.coverImage]}
                  />
                </>
              </CustomMenu>
            </TableCell>
          </>
        </TableRows>
      )}
    />
  );
}

export default Articles;
