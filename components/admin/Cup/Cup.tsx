import React from "react";
import PlayoffRound from "../PlayoffRound/PlayoffRound";
import { Nullable } from "@/lib/definitions";

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

interface IRound {
  id: string;
  homeForm: Nullable<string>;
  awayForm: Nullable<string>;
  round: string;
  result: "WIN" | "LOSE" | "DRAW" | null;
  status: "PENDING" | "COMPLETED" | null;
  matchId: Nullable<string>;
}

function Cup({
  rounds,
  matches,
  roundResults,
}: {
  rounds?: IRound[];
  matches?: IMatch[];
  roundResults: string[];
}) {
  const transformedRounds =
    rounds &&
    matches &&
    rounds
      .map((round) => {
        let match = matches.find((match) => match.id === round.matchId);
        if (!match) return;
        return {
          ...round,
          match,
        };
      })
      .filter((el) => el !== undefined);

  if (!transformedRounds) return null;

  return <PlayoffRound dbRounds={transformedRounds} matches={matches} />;
}

export default Cup;
