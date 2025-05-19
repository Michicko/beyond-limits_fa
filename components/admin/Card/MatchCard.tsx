import { Card, HStack, Text } from "@chakra-ui/react";
import React from "react";
import MatchIcon from "./MatchIcon";
import MatchScores from "./MatchScores";
import MatchTeam from "./MatchTeam";
import MatchDetails from "./MatchDetails";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenu/CustomMenuItem";
import Link from "next/link";
import { Nullable } from "@/lib/definitions";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import { getFirstLetter } from "@/lib/helpers";
import moment from "moment";

interface ICompetitionSeason {
  id: string;
  logo: string;
  name: string;
}

interface IMatch {
  id?: string;
  competitionSeasonId?: Nullable<string>;
  competitionSeason?: ICompetitionSeason;
  date: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELED" | "ABANDONED" | null;
  result?: "WIN" | "DRAW" | "LOSE" | null;
  homeTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  awayTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  scorers: any;
}

function MatchCard({ match, showMenu }: { match: IMatch; showMenu?: boolean }) {
  return (
    <Card.Root border={"1px solid"} borderColor={"gray.200"} w={"full"}>
      <Card.Header
        w={"full"}
        h={"50px"}
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
      >
        <HStack
          justify={"space-between"}
          align={"center"}
          w={"full"}
          h={"full"}
          px={"10px"}
        >
          {match.competitionSeason && (
            <HStack align={"center"}>
              <MatchIcon
                size="xl"
                radius={true}
                src={match.competitionSeason.logo}
              />
              <Text
                color={"text_md"}
                fontWeight={"semibold"}
                fontSize={"sm"}
                ml={"sm"}
                textTransform={"uppercase"}
              >
                {getFirstLetter(match.competitionSeason.name)}
              </Text>
            </HStack>
          )}
          <HStack gap={"sm"}>
            <Text
              textTransform={"uppercase"}
              fontSize={"sm"}
              fontWeight={"semibold"}
              color={"text_md"}
              title={moment(match.date).format('LL')}
            >
              {moment(match.date).format('ll')}
            </Text>
            {showMenu && (
              <CustomMenu>
                <>
                  <CustomMenuItem label="Edit" showBorder={true}>
                    <Link href={`/cp/matches/${match.id}/edit`}>Edit</Link>
                  </CustomMenuItem>
                  {match.id && match.homeTeam && match.awayTeam && (
                    <DeleteBtn
                      id={match.id}
                      name={`${match.homeTeam.longName} vs ${match.awayTeam.longName}`}
                      module="Match"
                    />
                  )}
                </>
              </CustomMenu>
            )}
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body p={"11px 20px"} height={"98px"}>
        <Text
          textTransform={"uppercase"}
          fontSize={"xs"}
          fontWeight={"semibold"}
          color={"gray.400"}
          textAlign={"center"}
          mb={"5px"}
        >
          {match.status}
        </Text>
        <MatchDetails time={match.time} venue={match.venue} />
        {match.homeTeam && match.awayTeam && (
          <HStack
            justify={"space-between"}
            maxW={"230px"}
            m={"0 auto"}
            w={"full"}
          >
            <MatchTeam
              short_name={match.homeTeam.shortName}
              long_name={match.homeTeam.longName}
              team="home"
              team_icon={match.homeTeam.logo}
            />
            {match.homeTeam.goals && match.awayTeam.goals ? (
              <MatchScores
                scores={{
                  home: +match.homeTeam.goals,
                  away: +match.awayTeam.goals,
                }}
              />
            ) : (
              <Text fontSize={"xl"} fontWeight={"bold"} color={"error"}>
                VS
              </Text>
            )}
            <MatchTeam
              short_name={match.awayTeam.shortName}
              long_name={match.awayTeam.longName}
              team="away"
              team_icon={match.awayTeam.logo}
            />
          </HStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}

export default MatchCard;
