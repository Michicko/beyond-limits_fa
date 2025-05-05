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
}

function AdminPaginatedTable<T>({
  resourceName,
  error,
  isLoading,
  list = [],
  columns,
  renderRow,
  pageSize = 25,
  createUrl,
  topContent,
}: AdminPaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = list.slice(startIndex, endIndex);

  return (
    <PaginatedTablePage
      error={error}
      isLoading={isLoading}
      pageTitle={resourceName}
      resource={resourceName}
      list={list}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      startIndex={startIndex}
      endIndex={endIndex}
      pageSize={pageSize}
      headerCols={columns}
      createUrl={createUrl}
      topContent={topContent}
    >
      <>
        {currentItems.map((item, index) => (
          <React.Fragment key={index}>{renderRow(item)}</React.Fragment>
        ))}
      </>
    </PaginatedTablePage>
  );
}

export default AdminPaginatedTable;
