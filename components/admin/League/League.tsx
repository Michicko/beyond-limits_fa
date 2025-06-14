import React from "react";
import { Stack } from "@chakra-ui/react";
import LeagueStanding from "../LeagueStanding/LeagueStanding";
import { IDBLeague, IDBStandings, IDTeam, Nullable } from "@/lib/definitions";
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
  date: string;
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
  id: string;
  leagueId: Nullable<string>;
  round: string;
  standing: ILeagueRoundStanding | null;
  matchId: Nullable<string>;
  homeForm: Nullable<string>;
  awayForm: Nullable<string>;
  result: "WIN" | "LOSE" | "DRAW" | null;
  status: "PENDING" | "COMPLETED" | null;
}

function League({
  teams,
  leagueRounds,
  matches,
  selectedTeams,
  leagueId,
  leagueStatus,
  standings,
  competitionStatus,
  type,
}: {
  teams: IDTeam[];
  leagueRounds: ILeagueRound[];
  matches: IMatch[];
  selectedTeams: Nullable<string>[];
  leagueId: string;
  standings: IDBStandings[];
  leagueStatus?: "PENDING" | "COMPLETED" | null;
  type: "MIXED" | "LEAGUE" | "CUP";
  competitionStatus: "PENDING" | "COMPLETED" | null;
}) {
  const transformedStanding = standings
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
        selectedTeams={selectedTeams}
        leagueId={leagueId}
        leagueStatus={leagueStatus}
        competitionStatus={competitionStatus}
        type={type}
      />
      <LeagueRound
        dbRounds={leagueRounds}
        matches={matches}
        leagueId={leagueId}
        competitionStatus={competitionStatus}
      />
    </Stack>
  );
}

export default League;
