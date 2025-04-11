"use client";
import {
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Separator,
  Table,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ResultSelector from "../ResultSelector/ResultSelector";
import PlayOffRoundForm from "../PlayoffRoundForm/PlayOffRoundForm";
import { IRound } from "@/lib/definitions";

function PlayoffRound({
  rounds,
  setRounds,
  play_offs,
}: {
  rounds: IRound[];
  setRounds: React.Dispatch<React.SetStateAction<IRound[]>>;
  play_offs: { label: string; value: string }[];
}) {
  const cH = {
    fontWeight: "700",
    h: "50px",
    textAlign: "center",
  };

  const tC = {
    h: "50px",
    textAlign: "center",
    px: "5px",
  };

  const getPlayOffRoundName = (value: string) => {
    const plf = play_offs.find((el) => el.value === value);
    return plf?.label;
  };

  const [openCupRoundForm, setOpenCupRoundForm] = useState(false);

  const match = {
    home: {
      id: 1,
      logo: "/images/blfc.png",
      shortName: "blfc",
      longName: "beyon limits fa",
      stadium: "Remo stars",
      isBeyondLimits: true,
    },
    away: {
      id: 3,
      logo: "/images/imfc.png",
      shortName: "imfc",
      longName: "imperial fc",
      stadium: "Imperial stadium",
      isBeyondLimits: false,
    },
  };

  const getRound = (round: IRound) => {
    return (
      <Table.Row key={round.round}>
        <Table.Cell textTransform={"capitalize"}>
          {getPlayOffRoundName(round.round)}
        </Table.Cell>
        <Table.Cell css={tC}>
          <HStack
            alignItems={"center"}
            gap={3}
            justifyContent={"center"}
            minW={"250px"}
          >
            <HStack alignItems={"center"} gap={"2"}>
              <Image
                src={match.home.logo}
                boxSize="30px"
                borderRadius="full"
                fit="cover"
                alt={match.home.longName}
                flexShrink={0}
              />
              <Text textTransform={"uppercase"}>{match.home.shortName}</Text>
            </HStack>
            <Text fontWeight={"700"}>VS</Text>
            <HStack alignItems={"center"} gap={"2"}>
              <Image
                src={match.away.logo}
                boxSize="30px"
                borderRadius="full"
                fit="cover"
                alt={match.away.longName}
                flexShrink={0}
              />
              <Text textTransform={"uppercase"}>{match.away.shortName}</Text>
            </HStack>
          </HStack>
        </Table.Cell>
        <Table.Cell css={tC}>{round.status}</Table.Cell>
        <Table.Cell css={tC} textAlign={"center"}>
          <ResultSelector
            id={round.round}
            round={round.round}
            rounds={rounds}
            setRounds={setRounds}
            result={round.result}
            status={round.status}
          />
        </Table.Cell>
        <Table.Cell css={tC}>
          <Button
            variant={"solid"}
            colorPalette={"green"}
            px={"10px"}
            disabled={
              round.result && round.status === "COMPLETED" ? true : false
            }
          >
            Update
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Card.Root size="md" p={"5"}>
      <Card.Body color="fg.muted">
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Heading mb="2">Rounds</Heading>
          <PlayOffRoundForm
            open={openCupRoundForm}
            setOpen={setOpenCupRoundForm}
            play_offs={play_offs}
          />
        </HStack>
        <Separator mb={"5"} mt={"2"} />
        <Table.ScrollArea maxW="5xl">
          <Table.Root showColumnBorder={false}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader css={cH} pr={"15px"} textAlign={"left"}>
                  Round
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  Match
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH}>Status</Table.ColumnHeader>
                <Table.ColumnHeader css={cH}>Result</Table.ColumnHeader>
                <Table.ColumnHeader css={cH}></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <>{rounds.map((round) => getRound(round))}</>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Card.Body>
    </Card.Root>
  );
}

export default PlayoffRound;
