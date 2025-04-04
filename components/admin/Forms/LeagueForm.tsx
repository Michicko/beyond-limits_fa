"use client";
import React, { useState } from "react";
import LeagueStandingForm from "./LeagueStandingForm";
import { ILeague } from "@/lib/definitions";
import CompetitionTypeForm from "./CompetitionTypeForm";

function LeagueForm({ competition: competition_id }: { competition: string }) {
  const [league, setLeague] = useState<ILeague | null>(null);

  return (
    <>
      <CompetitionTypeForm competition_id={competition_id} type="League" />
      {league && <LeagueStandingForm league_id={league.id} />}
    </>
  );
}

export default LeagueForm;
