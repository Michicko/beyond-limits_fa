import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import MatchIcon from "./MatchIcon";

function MatchTeam({
  short_name,
  long_name,
  team,
  team_icon,
}: {
  short_name: string;
  long_name: string;
  team: "home" | "away";
  team_icon: string;
}) {
  return (
    <HStack align={"center"} gap={"10px"} title={long_name}>
      <Box order={team === "home" ? 1 : 2}>
        <Text
          textTransform={"uppercase"}
          fontSize={"sm"}
          fontWeight={"semibold"}
          color={"text_lg"}
        >
          {short_name}
        </Text>
      </Box>
      <MatchIcon
        size="2xl"
        src={team_icon}
        radius={false}
        order={team === "away" ? 1 : 2}
      />
    </HStack>
  );
}

export default MatchTeam;
