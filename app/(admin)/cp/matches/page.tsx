"use client";
import { getMatches } from "@/app/_actions/match-actions";
import AdminPaginatedGrid from "@/components/admin/AdminPaginatedGrid/AdminPaginatedGrid";
import MatchCard from "@/components/admin/Card/MatchCard";
import { IMatch } from "@/lib/definitions";
import React from "react";

function Matches() {
  const sortByMatchDate = (a: IMatch, b:IMatch) =>
    new Date(b.date).getTime() - new Date(a.date).getTime();

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
      sortFunction={sortByMatchDate}
    />
  );
}

export default Matches;
