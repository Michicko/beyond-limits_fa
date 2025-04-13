import React from "react";
import { Stack } from "@chakra-ui/react";
import LeagueStanding from "../LeagueStanding/LeagueStanding";
import { Nullable } from "@/lib/definitions";
import LeagueRound from "../LeagueRound/LeagueRound";

interface IStanding {
  position: number;
  p: number;
  w: number;
  d: number;
  l: number;
  g: string;
  gd: number;
  pts: number;
  teamId: Nullable<string>;
  id: string;
}

interface IMatch {
  id: string;
  homeTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
  } | null;
  awayTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
  } | null;
}

interface ILeagueRoundStanding {
  position: number;
  pts: number;
  p: number;
  w: number;
  d: number;
  l: number;
  g: string;
  gd: number;
}

interface ILeagueRound {
  leagueId: Nullable<string>;
  round: string;
  standing: ILeagueRoundStanding | null;
  matchId: Nullable<string>;
  homeForm: Nullable<string>;
  awayForm: Nullable<string>;
  result: "WIN" | "LOSE" | "DRAW" | null;
  status: "PENDING" | "COMPLETED" | null;
}

interface ITeam {
  logo: string;
  shortName: string;
  longName: string;
  isBeyondLimits: boolean;
  stadium: Nullable<string>;
  id: string;
}

async function League({
  teams,
  standing,
  leagueRounds,
  matches,
}: {
  teams: ITeam[];
  standing: IStanding[];
  leagueRounds: ILeagueRound[];
  matches: IMatch[];
}) {
  const transformedStanding = standing
    .map((row) => {
      const team = teams.find((team) => team.id === row.teamId);
      if (!team) return;
      return {
        ...row,
        team,
      };
    })
    .filter((el) => el !== undefined);

  return (
    <Stack gap={5}>
      <LeagueStanding serverStanding={transformedStanding} teams={teams} />
      <LeagueRound dbRounds={leagueRounds} matches={matches} />
    </Stack>
  );
}

export default League;
