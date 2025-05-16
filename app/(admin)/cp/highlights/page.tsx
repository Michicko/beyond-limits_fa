"use client";
import { getHighlights } from "@/app/_actions/highlight-actions";
import AdminPaginatedGrid from "@/components/admin/AdminPaginatedGrid/AdminPaginatedGrid";
import HighlightCard from "@/components/admin/Card/HighlightCard";
import { Nullable } from "@/lib/definitions";
import React from "react";

type IHighlight = {
  id: string;
  title: string;
  coverImage: string;
  tags: Nullable<string>[] | null;
  videoId: string;
  createdAt: string;
}

function Highlight() {
  const sortByCreatedAt = (a: IHighlight, b: IHighlight) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  return (
    <AdminPaginatedGrid
      title="Highlights"
      createButtonText="Create Highlight"
      createButtonLink="/cp/highlights/create"
      fetcherKey="highlights"
      fetcherFunction={getHighlights}
      CardComponent={({ data }) => <HighlightCard highlight={data} />}
      emptyTitle="No highlights"
      emptyMessage="No highlight available, create some to get started."
      showSearch={true}
      searchName={"highlight"}
      searchItem={"title"}
      sortFunction={sortByCreatedAt}
    />
  );
}

export default Highlight;
