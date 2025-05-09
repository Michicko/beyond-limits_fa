import { HStack, Text } from "@chakra-ui/react";
import React from "react";

function MatchScores({ scores }: { scores: { home: number; away: number } }) {
  return (
    <HStack align={"center"} gap={"10px"}>
      <Text fontSize={"2xl"} fontWeight={"bold"} color={"primary"}>
        {scores.home}
      </Text>
      <Text fontSize={"xl"} fontWeight={"bold"} color={"text_lg"}>
        :
      </Text>
      <Text fontSize={"2xl"} fontWeight={"bold"} color={"primary"}>
        {scores.away}
      </Text>
    </HStack>
  );
}

export default MatchScores;
