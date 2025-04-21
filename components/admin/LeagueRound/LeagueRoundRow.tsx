import { Button, Table } from "@chakra-ui/react";
import React, { useState, useTransition } from "react";
import ResultSelector from "../ResultSelector/ResultSelector";
import { Nullable } from "@/lib/definitions";
import { updateLeagueRound } from "@/app/_actions/actions";
import useToast from "@/hooks/useToast";
import { getButtonStatus } from "@/lib/helpers";

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

function LeagueRoundRow({
  round,
  competitionStatus,
}: {
  round: ILeagueRound;
  competitionStatus: "PENDING" | "COMPLETED" | null;
}) {
  const tC = {
    h: "50px",
    textAlign: "center",
    px: "5px",
  };

  const [result, setResult] = useState(round.result || "");

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const updateRound = async (id: string) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", "COMPLETED");
    formData.append("result", result);

    startTransition(async () => {
      const res = await updateLeagueRound(round.id, formData);
      if (res.status === "success" && res.data) {
        mutationToast("League Round", `${res.data.round}`, "update");
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
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
          fixedWidth={true}
        />
      </Table.Cell>
      <Table.Cell css={tC}>
        <Button
          variant={"solid"}
          colorPalette={"green"}
          px={"10px"}
          disabled={
            (round.result && round.status === "COMPLETED" && true) ||
            isPending ||
            competitionStatus === "COMPLETED"
          }
          onClick={async () => {
            await updateRound(round.id);
          }}
        >
          {getButtonStatus(round, "Round", isPending)}
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default LeagueRoundRow;
