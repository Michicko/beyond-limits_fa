"use client";
import { getMatches } from "@/app/_actions/match-actions";
import AdminPaginatedGrid from "@/components/admin/AdminPaginatedGrid/page";
import MatchCard from "@/components/admin/Card/MatchCard";
import React from "react";

function Matches() {
  return (
    <AdminPaginatedGrid
      title="Matches"
      createButtonText="Create Match"
      createButtonLink="/cp/matches/create"
      fetcherKey="matches"
      fetcherFunction={getMatches}
      CardComponent={({ data }) => <MatchCard match={data} showMenu={true} />}
      emptyTitle="No matches"
      emptyMessage="No matches found. Create a match to get started."
    />
  );
}

export default Matches;
