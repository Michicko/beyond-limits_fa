import BackButton from "@/components/admin/BackButton";
import PlayOffForm from "@/components/admin/Forms/PlayOffForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cups, matches, playOffs } from "@/lib/placeholder-data";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";

function Playoffs({
  params,
}: {
  params: { competitionId: string; cupId: string };
}) {
  const cup = cups.find((el) => el.id === params.cupId);

  if (!cup) return <div>No cup</div>;

  let playoffs = playOffs.filter((el) => el.cup_id === cup.id);

  const transformed_playoffs = playoffs
    .map((el) => {
      const match = matches.find((match) => match.id === el.match_id);
      if (!match) return;
      return {
        ...el,
        match,
      };
    })
    .filter((el) => el !== undefined && el.match !== undefined);

  return (
    <>
      <PageTitle
        pageTitle={
          cup.competition ? cup.competition.long_name + " Knockout stage" : ""
        }
      />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        <Box mb={10}>
          <Heading
            as={"h3"}
            fontSize={"xl"}
            mb={"4"}
            fontWeight={"500"}
            color={"text_lg"}
          >
            Knockout rounds
          </Heading>
          <Flex wrap={"wrap"} gap={"4"}>
            {transformed_playoffs.map((playoff) => {
              const result = playoff?.match.result?.toLowerCase();
              return (
                <Card.Root bg={"card_bg"} p={"4"} minW={"200px"}>
                  <Card.Body>
                    <HStack justifyContent={"space-between"} mb={1.5}>
                      {playoff && (
                        <Text
                          textTransform={"capitalize"}
                          mb={"2"}
                          fontSize={"sm"}
                        >
                          {playoff.round}
                        </Text>
                      )}
                      <Badge
                        colorPalette={
                          result === "win"
                            ? "green"
                            : result === "draw"
                            ? "yellow"
                            : "red"
                        }
                        fontSize={"xs"}
                        textTransform={"capitalize"}
                        alignSelf={"flex-start"}
                        px={"2"}
                      >
                        qualified
                      </Badge>
                    </HStack>
                    <HStack justifyContent={"center"}>
                      <Text>{playoff?.match.home.goals}</Text>
                      <Text>-</Text>
                      <Text>{playoff?.match.away.goals}</Text>
                    </HStack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </Flex>
        </Box>
        <PlayOffForm cup={cup} />
      </Box>
    </>
  );
}

export default Playoffs;
