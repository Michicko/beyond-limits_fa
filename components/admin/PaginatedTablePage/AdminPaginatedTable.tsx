"use client";
import React, { useState } from "react";
import PaginatedTablePage from "./PaginatedTablePage";

interface AdminPaginatedTableProps<T> {
  resourceName: string;
  columns: string[];
  renderRow: (item: T) => React.ReactNode;
  pageSize?: number;
  createUrl?: string;
  topContent?: React.ReactNode;
  isLoading: boolean;
  error: any;
  list?: T[];
  nextToken?: string| null; 
  setPageTokens: React.Dispatch<React.SetStateAction<(string | null)[]>> 
  setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>> 
  pageTokens: (string | null)[] 
  currentPageIndex: number;
}

function AdminPaginatedTable<T>({
  resourceName,
  error,
  isLoading,
  list = [],
  columns,
  renderRow,
  createUrl,
  topContent,
  nextToken, 
  setPageTokens, 
  setCurrentPageIndex, 
  pageTokens, 
  currentPageIndex,
}: AdminPaginatedTableProps<T>) {

  return (
    <PaginatedTablePage
      error={error}
      isLoading={isLoading}
      pageTitle={resourceName}
      resource={resourceName}
      list={list}
      nextToken={nextToken} 
      currentPageIndex={currentPageIndex} 
      pageTokens={pageTokens} 
      setCurrentPageIndex={setCurrentPageIndex} 
      setPageTokens={setPageTokens} 
      headerCols={columns}
      createUrl={createUrl}
      topContent={topContent}
    >
      <>
        {list.map((item, index) => (
          <React.Fragment key={index}>{renderRow(item)}</React.Fragment>
        ))}
      </>
    </PaginatedTablePage>
  );
}

export default AdminPaginatedTable;
