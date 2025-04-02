import { Card, HStack, Text } from "@chakra-ui/react";
import React from "react";
import MatchIcon from "./MatchIcon";
import MatchScores from "./MatchScores";
import MatchTeam from "./MatchTeam";
import MatchDetails from "./MatchDetails";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenu/CustomMenuItem";
import Link from "next/link";
import { IMatch } from "@/lib/definitions";

function MatchCard({ match, showMenu }: { match: IMatch; showMenu?: boolean }) {
  return (
    <Card.Root border={"1px solid"} borderColor={"neutral"} w={"full"}>
      <Card.Header
        w={"full"}
        h={"50px"}
        borderBottom={"1px solid"}
        borderColor={"neutral"}
      >
        <HStack
          justify={"space-between"}
          align={"center"}
          w={"full"}
          h={"full"}
          px={"10px"}
        >
          {match.competition && (
            <HStack align={"center"}>
              <MatchIcon size="md" radius={true} src={match.competition.logo} />
              <Text
                color={"text_md"}
                fontWeight={"medium"}
                fontSize={"sm"}
                ml={"sm"}
                textTransform={"uppercase"}
              >
                {match.competition.short_name}
              </Text>
            </HStack>
          )}
          <HStack gap={"sm"}>
            <Text color={"text_md"} fontSize={"sm"} textTransform={"uppercase"}>
              {match.date}
            </Text>
            {showMenu && (
              <CustomMenu>
                <>
                  <CustomMenuItem label="Edit" showBorder={true}>
                    <Link href={`/cp/matches/${match.id}/edit`}>Edit</Link>
                  </CustomMenuItem>
                  <CustomMenuItem label="Delete" showBorder={false} />
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
        <MatchDetails />
        {match.home.team && match.away.team && (
          <HStack justify={"space-between"}>
            <MatchTeam
              short_name={match.home.team?.shortName}
              long_name={match.home.team?.longName}
              team="home"
              team_icon={match.home.team.logo}
            />
            <MatchScores
              scores={{ home: match.home.goals, away: match.away.goals }}
              status={match.status}
            />
            <MatchTeam
              short_name={match.away.team?.shortName}
              long_name={match.away.team?.longName}
              team="away"
              team_icon={match.away.team.logo}
            />
          </HStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}

export default MatchCard;
