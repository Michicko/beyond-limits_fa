import { HStack, Text, Box, Separator } from "@chakra-ui/react";
import React from "react";

function MatchDetails() {
  return (
    <HStack
      justify={"center"}
      w={"full"}
      align={"center"}
      mb={"10px"}
      gap={"2"}
    >
      <Text
        textTransform={"uppercase"}
        fontSize={"xs"}
        fontWeight={"semibold"}
        color={"primary"}
      >
        9:00am
      </Text>
      <Box as={"span"} h={"15px"} w={"1px"} bg={"gray.300"}></Box>
      <Text
        textTransform={"uppercase"}
        fontSize={"xs"}
        fontWeight={"semibold"}
        color={"primary"}
      >
        Remo stars stadium
      </Text>
    </HStack>
  );
}

export default MatchDetails;
