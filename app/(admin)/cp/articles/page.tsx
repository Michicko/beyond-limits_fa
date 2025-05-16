"use client";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import Link from "next/link";
import React from "react";
import { formatDate, sortByCreatedAt } from "@/lib/helpers";
import { getLazyLoadedArticles } from "@/app/_actions/article-actions";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import useSWR from "swr";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";
import useSearchFilter from "@/hooks/useSearchFilter";
import useCursorPaginate from "@/hooks/useCursorPaginate";

function Articles() {
  const {currentPageIndex, currentToken, setCurrentPageIndex, setPageTokens, pageTokens} = useCursorPaginate();
  const { data, error, isLoading } = useSWR(["articles", currentPageIndex], () => getLazyLoadedArticles(currentToken), {
    keepPreviousData: true
  });

  const articles = data?.data || [];
  
  const sortedArticles = sortByCreatedAt([...articles]);

  const { search, setSearch, filteredList } = useSearchFilter(
    sortedArticles,
    "title"
  );

  return (
    <AdminPaginatedTable
      resourceName="Articles"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["Title", "Category", "Status", "Created At", ""]}
      createUrl="/cp/articles/create"
      nextToken={data?.nextToken} 
      currentPageIndex={currentPageIndex} 
      pageTokens={pageTokens} 
      setCurrentPageIndex={setCurrentPageIndex} 
      setPageTokens={setPageTokens} 
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
            <TableCell>{article.category}</TableCell>
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
