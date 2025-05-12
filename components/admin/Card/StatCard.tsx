import React from "react";
import { HStack, Icon, Stat } from "@chakra-ui/react";
import { getIcon } from "@/lib/icons";

function StatCard({
  name,
  value,
  type,
}: {
  name: string;
  value: string;
  type?: "success" | "error" | "warning";
}) {
  return (
    <Stat.Root
      minW="180px"
      border="1px solid"
      borderColor={"gray.200"}
      p="4"
      rounded="md"
    >
      <HStack justify="space-between">
        <Stat.Label color={"text_mg"} fontSize={"sm"}>
          {name}
        </Stat.Label>
        <Icon color={(type && type) || "primary"} size={"lg"}>
          {name.toLowerCase() === "competitions"
            ? getIcon("competition")
            : name.toLowerCase() === "active"
            ? getIcon("compete")
            : getIcon("ball")}
        </Icon>
      </HStack>
      <Stat.ValueText color={"text_lg"} fontSize={"xl"} fontWeight={"bold"}>
        {value}
      </Stat.ValueText>
    </Stat.Root>
  );
}

export default StatCard;
