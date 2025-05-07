"use client";
import { getHighlights } from "@/app/_actions/highlight-actions";
import AdminPaginatedGrid from "@/components/admin/AdminPaginatedGrid/AdminPaginatedGrid";
import HighlightCard from "@/components/admin/Card/HighlightCard";
import React from "react";

function Highlight() {
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
    />
  );
}

export default Highlight;
