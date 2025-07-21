import { getButtonStatus, getPlayOffRoundName } from "@/lib/helpers";
import { Button, HStack, Image, Table, Text } from "@chakra-ui/react";
import React, { useState, useTransition } from "react";
import ResultSelector from "../ResultSelector/ResultSelector";
import { Nullable } from "@/lib/definitions";
import useToast from "@/hooks/useToast";
import { updatePlayOff } from "@/app/_actions/actions";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

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
  match: IMatch;
}

function PlayOffRoundRow({
  round,
  competitionStatus,
}: {
  round: IRound;
  competitionStatus: "PENDING" | "COMPLETED" | null;
}) {
  const tC = {
    h: "50px",
    textAlign: "center",
    px: "5px",
    verticalAlign: "middle",
  };

  const [result, setResult] = useState(round.result || "");
  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const updateRound = () => {
    const formData = new FormData();
    formData.append("id", round.id);
    formData.append("status", "COMPLETED");
    formData.append("result", result);

    startTransition(async () => {
      const res = await updatePlayOff(round.id, formData);
      if (res.status === "success" && res.data) {
        mutationToast("PlayOff", `${res.data.round}`, "update");
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
  };

  return (
    <Table.Row key={round.round}>
      <Table.Cell textTransform={"capitalize"} verticalAlign={"middle"}>
        {getPlayOffRoundName(round.round)}
      </Table.Cell>
      <Table.Cell css={tC}>
        <HStack
          alignItems={"center"}
          gap={3}
          justifyContent={"center"}
          minW={"250px"}
        >
          {round.match && round.match.homeTeam && round.match.awayTeam && (
            <>
              <HStack alignItems={"center"} gap={"2"}>
                <Image
                  src={round.match.homeTeam.logo}
                  boxSize="30px"
                  borderRadius="full"
                  fit="cover"
                  alt={round.match.homeTeam.longName}
                  flexShrink={0}
                />
                <Text textTransform={"uppercase"}>
                  {round.match.homeTeam.shortName}
                </Text>
              </HStack>
              <Text fontWeight={"700"}>VS</Text>
              <HStack alignItems={"center"} gap={"2"}>
                <Image
                  src={round.match.awayTeam.logo}
                  boxSize="30px"
                  borderRadius="full"
                  fit="cover"
                  alt={round.match.awayTeam.longName}
                  flexShrink={0}
                />
                <Text textTransform={"uppercase"}>
                  {round.match.awayTeam.shortName}
                </Text>
              </HStack>
            </>
          )}
        </HStack>
      </Table.Cell>
      <Table.Cell css={tC}>{round.status}</Table.Cell>
      <Table.Cell css={tC} textAlign={"center"}>
        <ResultSelector
          id={round.round}
          value={result}
          setValue={setResult}
          disabled={
            (round.result && round.status === "COMPLETED" && true) ||
            isPending ||
            competitionStatus === "COMPLETED"
          }
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
          onClick={updateRound}
        >
          {getButtonStatus(round, "Round", isPending)}
        </Button>
      </Table.Cell>
      <Table.Cell css={tC} position={"relative"} minW={"45px"}>
        <DeleteBtn
          id={round.id}
          type="iconBtn"
          module="PlayOff"
          name={`Round ${round.round}`}
          position={"relative"}
        />
      </Table.Cell>
    </Table.Row>
  );
}

export default PlayOffRoundRow;
