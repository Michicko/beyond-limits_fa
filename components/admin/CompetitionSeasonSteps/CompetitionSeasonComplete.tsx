import { getIcon } from "@/lib/icons";
import {
  Button,
  Flex,
  Heading,
  Icon,
  Steps,
  Text,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function CompetitionSeasonComplete({
  competitionId,
}: {
  competitionId: string;
}) {
  return (
    <Steps.CompletedContent>
      <Flex
        w={"full"}
        h={"full"}
        // bg={"card_bg"}
        flexDirection={"column"}
        alignItems={"center"}
        p={"60px 0"}
      >
        <Flex
          h={"65px"}
          w={"65px"}
          borderRadius={"50%"}
          border={"1px solid"}
          borderColor={"green.500"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={"3"}
        >
          <Icon size="2xl" color="green.500">
            {getIcon("checkmark")}
          </Icon>
        </Flex>
        <Heading as={"h3"} fontWeight={"500"} fontSize={"2xl"} my={"2"}>
          Successfully created Season
        </Heading>
        <HStack gap={"4"}>
          <Text color="blue" textDecoration={"underline"} fontSize={"sm"}>
            <Link href={`/cp/competitions`}>Go to Cup</Link>
          </Text>
          <Text color="blue" textDecoration={"underline"} fontSize={"sm"}>
            <Link href={`/cp/competitions`}>Go to League</Link>
          </Text>
        </HStack>
        <Button colorPalette={"white"} variant={"outline"} px={"30px"} my={"5"}>
          <Link href={`/cp/competitions/${competitionId}/competition-seasons`}>
            Done
          </Link>
        </Button>
      </Flex>
    </Steps.CompletedContent>
  );
}

export default CompetitionSeasonComplete;
