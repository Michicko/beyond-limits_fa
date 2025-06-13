"use client";
import { Card, Heading, HStack, Table, Text } from "@chakra-ui/react";
import React from "react";
import LeagueRoundForm from "../LeagueRoundForm/LeagueRoundForm";
import { Nullable } from "@/lib/definitions";
import LeagueRoundRow from "./LeagueRoundRow";
import CustomSeparator from "../CustomSeparator";

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

function LeagueRound({
  dbRounds,
  matches,
  leagueId,
  competitionStatus,
}: {
  dbRounds: ILeagueRound[];
  matches: IMatch[];
  leagueId: string;
  competitionStatus: "PENDING" | "COMPLETED" | null;
}) {
  const cH = {
    fontWeight: "700",
    h: "50px",
    textAlign: "center",
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
              {!matches ||
                (matches.length < 1 &&
                  "No matches available, please add a match to create round")}
              {competitionStatus === "COMPLETED" && "Competition Ended!"}
            </Text>
          ) : (
            <LeagueRoundForm
              dbRounds={dbRounds}
              matches={matches}
              leagueId={leagueId}
            />
          )}
        </HStack>
        <CustomSeparator />
        <Table.ScrollArea maxW="5xl">
          <Table.Root showColumnBorder={false}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader css={cH} pr={"15px"}>
                  Round
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  Position
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  Pts
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  P
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  W
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  D
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  L
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  G
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH} px={"15px"}>
                  GD
                </Table.ColumnHeader>
                <Table.ColumnHeader css={cH}>Result</Table.ColumnHeader>
                <Table.ColumnHeader css={cH}></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <>
                {dbRounds
                  .sort((a, b) => +b.round - +a.round)
                  .map((round) => {
                    return (
                      <LeagueRoundRow
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

export default LeagueRound;
