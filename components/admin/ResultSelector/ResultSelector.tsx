import React from "react";
import CustomSelect from "../CustomSelect";

interface IRound {
  leagueId?: number;
  cupId?: number;
  standing?: {
    position: number;
    pts: number;
    p: number;
    w: number;
    d: number;
    l: number;
    g: string;
    gd: number;
  };
  round: string;
  matchId: number;
  result: string;
  status: "PENDING" | "COMPLETED";
}

function ResultSelector({
  id,
  round,
  result,
  rounds,
  setRounds,
  status,
}: {
  id: string;
  round: string;
  result?: string;
  rounds: IRound[];
  setRounds: React.Dispatch<React.SetStateAction<IRound[]>>;
  status: "PENDING" | "COMPLETED";
}) {
  const handleSelect = (value: string) => {
    let tempRounds = [...rounds];
    const curr = tempRounds.find((round) => round.round === id);
    console.log(curr);
    if (!curr) return;
    tempRounds = tempRounds.filter((el) => el.round !== curr.round);
    curr.result = value;
    tempRounds = [...tempRounds, curr].sort((a, b) =>
      a.round < b.round ? -1 : b.round > a.round ? 1 : 0
    );
    setRounds(tempRounds);
  };

  return (
    <CustomSelect
      id={round}
      defaultValue={result || ""}
      options={[
        { label: "win", value: "win" },
        { label: "draw", value: "draw" },
        { label: "lose", value: "lose" },
      ]}
      disabled={result && status === "COMPLETED" ? true : false}
      handleOnChange={handleSelect}
    />
  );
}

export default ResultSelector;
