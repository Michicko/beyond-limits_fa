import React from "react";
import ResultSelector from "./ResultSelector";
import { Nullable } from "@/lib/definitions";
import { cookiesClient } from "@/utils/amplify-utils";

interface IRound {
  id: string;
  homeForm: Nullable<string>;
  awayForm: Nullable<string>;
  round: string;
  result: "WIN" | "LOSE" | "DRAW" | null;
  status: "PENDING" | "COMPLETED" | null;
  match: {
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
  };
}

async function ResultSelectorWrapper({
  id,
  round,
  result,
  rounds,
  setRounds,
  status,
}: {
  id: string;
  round: string;
  result: "WIN" | "LOSE" | "DRAW" | null;
  rounds: IRound[];
  setRounds: React.Dispatch<React.SetStateAction<IRound[]>>;
  status: "PENDING" | "COMPLETED" | null;
}) {
  const roundResults = cookiesClient.enums.RoundResult.values();
  return (
    <ResultSelector
      id={id}
      round={round}
      rounds={rounds}
      setRounds={setRounds}
      result={result}
      status={status}
      roundResults={roundResults}
    />
  );
}

export default ResultSelectorWrapper;
