import { HStack, Text } from "@chakra-ui/react";
import React from "react";

function MatchScores({
  scores,
  status,
}: {
  status: string;
  scores: { home: number; away: number };
}) {
  return status.toLowerCase() === "finished" ? (
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
  ) : (
    <Text fontSize={"xl"} fontWeight={"bold"} color={"error"}>
      VS
    </Text>
  );
}

export default MatchScores;
