"use client";
import { Card, Heading, HStack, Table, Text } from "@chakra-ui/react";
import React from "react";
import PlayOffRoundForm from "../PlayoffRoundForm/PlayOffRoundForm";
import { playOffsLabels } from "@/lib/helpers";
import { Nullable } from "@/lib/definitions";
import CustomSeparator from "../CustomSeparator";
import PlayOffRoundRow from "./PlayOffRoundRow";

// const matches = [
//   {
//     id: "d55ae10f-1c1f-46b4-abe6-7fba3891fc45",
//     competitionSeasonid: "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45",
//     home: "f7dccbf7-d187-465d-918f-7760444e839c",
//     away: "07b1ea51-73a7-41eb-aae1-9dff2500d50a",
//     date: "2025-4-15",
//     time: "10:00 am",
//     venue: "remo stars stadium",
//     status: "UPCOMING",
//     lineup: [
//       {
//         id: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
//         positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
//         squadNo: 9,
//         firstname: "Aiyenugba",
//         lastname: "Daniel",
//         dob: "2011-5-2",
//         height: 170,
//         weight: 82,
//         dominantFoot: "RIGHT",
//         isTwoFooted: true,
//         homeKit: "/images/player-1.png",
//         awayKit: "/images/player-2.png",
//         ageGroup: "UNDER_19",
//         status: "ACTIVE",
//       },
//       {
//         id: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
//         firstname: "Shina",
//         lastname: "Ayodele",
//         positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
//         squadNo: 8,
//         dob: "2006-06-22",
//         height: 175,
//         weight: 75,
//         dominantFoot: "RIGHT",
//         isTwoFooted: false,
//         homeKit: "/images/player-1.png",
//         awayKit: "/images/player-2.png",
//         ageGroup: "UNDER_19",
//         status: "ACTIVE",
//       },
//     ],
//     substitutes: [
//       {
//         id: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
//         firstname: "Shina",
//         lastname: "Ayodele",
//         positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
//         squadNo: 8,
//         dob: "2006-06-22",
//         height: 175,
//         weight: 75,
//         dominantFoot: "RIGHT",
//         isTwoFooted: false,
//         homeKit: "/images/player-1.png",
//         awayKit: "/images/player-2.png",
//         ageGroup: "UNDER_19",
//         status: "ACTIVE",
//       },
//     ],
//     coach: {},
//     preview:
//       "Match between beyon limits fa and imperifal fc is going to be tough",
//     keyPlayer: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
//     aboutKeyPlayer: "He is a cool boy",
//     report: "",
//     mvp: "",
//     aboutMvp: "",
//     scorers: [],
//     homeTeamStats: {
//       goals: "",
//       passes: "",
//       offsides: "",
//       corners: "",
//       shots: "",
//       yellows: "",
//       reds: "",
//     },
//     awayTeamStats: {
//       goals: "",
//       passes: "",
//       offsides: "",
//       corners: "",
//       shots: "",
//       yellows: "",
//       reds: "",
//     },
//   },
//   {
//     id: "c42ae10f-1c1f-46b4-abe6-4bba3891fc43",
//     competitionSeasonid: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
//     home: "4cd32940-d9a7-43c4-4ac9-7313a7d8b9b2",
//     homeTeamStats: {
//       passes: 200,
//       corners: 6,
//       offsides: 5,
//       yellows: 5,
//       reds: 0,
//       shots: 13,
//     },
//     away: "f7dccbf7-d187-465d-918f-7760444e839c",
//     awayTeamStats: {
//       passes: 243,
//       offsides: 5,
//       corners: 12,
//       yellows: 2,
//       reds: 0,
//       shots: 18,
//     },
//     date: "2024-02-12",
//     time: "3:00 pm",
//     venue: "Italy stadium",
//     status: "FINISHED",
//     result: "WIN",
//     lineup: [
//       {
//         id: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
//         positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
//         squadNo: 9,
//         firstname: "Aiyenugba",
//         lastname: "Daniel",
//         dob: "2011-5-2",
//         height: 170,
//         weight: 82,
//         dominantFoot: "RIGHT",
//         isTwoFooted: true,
//         homeKit: "/images/player-1.png",
//         awayKit: "/images/player-2.png",
//         ageGroup: "UNDER_19",
//         status: "ACTIVE",
//       },
//       {
//         id: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
//         firstname: "Shina",
//         lastname: "Ayodele",
//         positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
//         squadNo: 8,
//         dob: "2006-06-22",
//         height: 175,
//         weight: 75,
//         dominantFoot: "RIGHT",
//         isTwoFooted: false,
//         homeKit: "/images/player-1.png",
//         awayKit: "/images/player-2.png",
//         ageGroup: "UNDER_19",
//         status: "ACTIVE",
//       },
//     ],
//     substitutes: [
//       {
//         id: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
//         firstname: "Shina",
//         lastname: "Ayodele",
//         positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
//         squadNo: 8,
//         dob: "2006-06-22",
//         height: 175,
//         weight: 75,
//         dominantFoot: "RIGHT",
//         isTwoFooted: false,
//         homeKit: "/images/player-1.png",
//         awayKit: "/images/player-2.png",
//         ageGroup: "UNDER_19",
//         status: "ACTIVE",
//       },
//     ],
//     coach: {
//       name: "Ogundeye godwin",
//       role: "coach",
//       image: "/images/coach.png",
//     },
//     preview:
//       "Match between beyon limits fa and gbagada fc is going to be tough",
//     keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
//     aboutKeyPlayer:
//       "He is a joy to watch, i expect him to get some goals today",
//     report: "It was a beautiful match which beautiful memories",
//     mvp: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
//     aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball,
//         not only that he also left with the people's heart.`,
//     scorers: [
//       {
//         time: "1st",
//         isOpponent: false,
//         id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
//         goalType: "normal goal",
//         name: "Kparobo Ariehri",
//         assist: "",
//       },
//       {
//         time: "6th",
//         isOpponent: false,
//         id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
//         goalType: "normal goal",
//         name: "Olamilekan Adegoyega",
//         assist: "",
//       },
//       {
//         time: "13th",
//         isOpponent: false,
//         id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
//         goalType: "normal goal",
//         name: "Kparobo Ariehri",
//         assist: "",
//       },
//       {
//         time: "37th",
//         isOpponent: false,
//         id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
//         goalType: "normal goal",
//         name: "Kparobo Ariehri",
//         assist: "",
//       },
//     ],
//   },
// ];

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

function PlayoffRound({
  dbRounds,
  matches,
}: {
  dbRounds: IRound[];
  matches: IMatch[];
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
          {!matches ? (
            <Text>
              No matches available, please add a match to create round
            </Text>
          ) : (
            <PlayOffRoundForm
              playOffsLabels={playOffsLabels}
              matches={matches}
            />
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
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <>
                {dbRounds.map((round) => {
                  return <PlayOffRoundRow round={round} key={round.id} />;
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
