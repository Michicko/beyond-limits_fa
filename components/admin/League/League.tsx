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
  competitionSeasonId: Nullable<string>;
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
  competitionStatus,
  competitionSeasonId,
  standings,
  selectedTeams,
}: {
  teams: IDTeam[];
  selectedTeams: Nullable<string>[];
  leagueRounds: ILeagueRound[];
  matches: IMatch[];
  competitionStatus: "PENDING" | "COMPLETED" | null;
  competitionSeasonId: string;
  standings: IDBStandings[];
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
        competitionStatus={competitionStatus}
        competitionSeasonId={competitionSeasonId}
      />
      <LeagueRound
        dbRounds={leagueRounds}
        matches={matches}
        competitionSeasonId={competitionSeasonId}
        competitionStatus={competitionStatus}
      />
    </Stack>
  );
}

export default League;
