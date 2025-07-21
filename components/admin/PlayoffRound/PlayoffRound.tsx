"use client";
import { Card, Heading, HStack, Table, Text } from "@chakra-ui/react";
import React from "react";
import PlayOffRoundForm from "../PlayoffRoundForm/PlayOffRoundForm";
import { playOffsLabels } from "@/lib/helpers";
import { Nullable } from "@/lib/definitions";
import CustomSeparator from "../CustomSeparator";
import PlayOffRoundRow from "./PlayOffRoundRow";

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

interface IRound {
  id: string;
  homeForm: Nullable<string>;
  awayForm: Nullable<string>;
  round: string;
  result: "WIN" | "LOSE" | "DRAW" | null;
  status: "PENDING" | "COMPLETED" | null;
  match: IMatch;
}

function PlayoffRound({
  dbRounds,
  matches,
  cupId,
  competitionStatus,
}: {
  dbRounds: IRound[];
  matches: IMatch[];
  cupId: Nullable<string>;
  competitionStatus: "PENDING" | "COMPLETED" | null;
}) {
  const cH = {
    fontWeight: "700",
    h: "50px",
    textAlign: "center",
    verticalAlign: "middle",
  };

  return (
    <Card.Root size="md" p={"5"} border={"1px solid"} borderColor={"gray.200"}>
      <Card.Body color="fg.muted">
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Heading fontWeight={"700"}>Rounds</Heading>
          {!matches ||
          matches.length < 1 ||
          competitionStatus === "COMPLETED" ? (
            <Text>
              No matches available, please add a match to create round
            </Text>
          ) : (
            cupId && (
              <PlayOffRoundForm
                playOffsLabels={playOffsLabels}
                matches={matches}
                cupId={cupId}
                competitionStatus={competitionStatus}
              />
            )
          )}
        </HStack>
        <CustomSeparator />

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
                <Table.ColumnHeader css={cH}></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <>
                {dbRounds.map((round) => {
                  return (
                    <PlayOffRoundRow
                      round={round}
                      key={round.id}
                      competitionStatus={competitionStatus}
                    />
                  );
                })}
              </>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Card.Body>
    </Card.Root>
  );
}

export default PlayoffRound;
