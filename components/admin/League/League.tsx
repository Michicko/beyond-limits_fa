import React from "react";
import { Stack } from "@chakra-ui/react";
import LeagueStanding from "../LeagueStanding/LeagueStanding";
import { IDBLeague, IDTeam, Nullable } from "@/lib/definitions";
import LeagueRound from "../LeagueRound/LeagueRound";

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

async function League({
  teams,
  leagueRounds,
  matches,
  league,
}: {
  teams: IDTeam[];
  leagueRounds: ILeagueRound[];
  matches: IMatch[];
  league: IDBLeague;
}) {
  const transformedStanding = league.standings
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
      <LeagueStanding
        serverStanding={transformedStanding}
        teams={teams}
        league={league}
      />
      <LeagueRound dbRounds={leagueRounds} matches={matches} />
    </Stack>
  );
}

export default League;
