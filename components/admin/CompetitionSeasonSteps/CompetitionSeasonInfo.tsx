import { HStack, Text } from "@chakra-ui/react";
import React from "react";

function CompetitionSeasonInfo({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <HStack gap={"4"} w={"full"}>
      <Text
        fontWeight={{ base: "50%", sm: "20%" }}
        w={"50%"}
        textTransform={"capitalize"}
      >
        {label}:
      </Text>
      <Text w={{ base: "50%", sm: "80%" }} textTransform={"capitalize"}>
        {value &&
          value.substring(0, 1).toUpperCase() +
            value.substring(1, value.length).toLowerCase()}
      </Text>
    </HStack>
  );
}

export default CompetitionSeasonInfo;
