import { HStack, Text } from "@chakra-ui/react";
import React from "react";

function Info({ name, value }: { name: string; value: string }) {
  return (
    <HStack flexWrap={{ base: "wrap", sm: "nowrap" }}>
      <Text textTransform={"capitalize"} fontWeight={"600"}>
        {name}:{" "}
      </Text>
      <Text textTransform={"capitalize"}>{value}</Text>
    </HStack>
  );
}

export default Info;
