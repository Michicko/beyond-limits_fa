import { Button, Table } from "@chakra-ui/react";
import React, { useState } from "react";
import ResultSelector from "../ResultSelector/ResultSelector";
import { Nullable } from "@/lib/definitions";

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

function LeagueRoundRow({ round }: { round: ILeagueRound }) {
  const tC = {
    h: "50px",
    textAlign: "center",
    px: "5px",
  };

  const [result, setResult] = useState("");

  const updateRound = () => {
    const formData = new FormData();
  };

  if (!round.standing) return;

  return (
    <Table.Row key={round.round}>
      <Table.Cell>{round.round}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.position}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.pts}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.p}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.w}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.d}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.l}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.g}</Table.Cell>
      <Table.Cell css={tC}>{round.standing.gd}</Table.Cell>
      <Table.Cell css={tC} textAlign={"center"}>
        <ResultSelector
          id={round.round}
          value={result}
          setValue={setResult}
          disabled={round.result && round.status === "COMPLETED" ? true : false}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Button
          variant={"solid"}
          colorPalette={"green"}
          px={"10px"}
          disabled={round.result && round.status === "COMPLETED" ? true : false}
        >
          Update
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default LeagueRoundRow;
