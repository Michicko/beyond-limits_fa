"use client";
import { getArticleCategories } from "@/app/_actions/article-category-actions";
import AdminSearchInput from "@/components/admin/AdminSearch/AdminSearchInput";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import AdminPaginatedTable from "@/components/admin/PaginatedTablePage/AdminPaginatedTable";
import TableCell from "@/components/admin/Table/TableCell";
import TableRows from "@/components/admin/Table/TableRows";
import useSearchFilter from "@/hooks/useSearchFilter";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

function ArticleCategories() {
  const { data, error, isLoading } = useSWR(
    "article-categories",
    getArticleCategories,
  );
  const categories = data?.data ?? [];
  const { search, setSearch, filteredList } = useSearchFilter(
    categories,
    "category",
  );

  return (
    <AdminPaginatedTable
      resourceName="Category"
      list={filteredList}
      isLoading={isLoading}
      error={error}
      columns={["category", "articles", ""]}
      createUrl="/cp/article-categories/create"
      topContent={
        <AdminSearchInput
          search={search}
          setSearch={setSearch}
          name="category"
        />
      }
      renderRow={(category) => (
        <TableRows key={category.id}>
          <>
            <TableCell>{category.category}</TableCell>
            <TableCell>{category.articles.length}</TableCell>
            <TableCell textAlign={"center"}>
              <CustomMenu>
                <>
                  <CustomMenuItem label="Edit" showBorder={true}>
                    <Link href={`/cp/article-categories/${category.id}/edit`}>
                      Edit
                    </Link>
                  </CustomMenuItem>
                  <DeleteBtn
                    name={category.category}
                    id={category.id}
                    module="ArticleCategory"
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

export default ArticleCategories;
