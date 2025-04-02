import calcWidth from "@/lib/calcWidth";
import { Card, Box, HStack, Flex, Text } from "@chakra-ui/react";
import React from "react";

function MatchStats() {
  const lineStyles = {
    h: "6px",
    w: "full",
    m: "0",
    p: "0",
    boxSizing: "border-box",
    position: "relative",

    "&:before": {
      pos: "absolute",
      h: "full",
      bg: "red",
      content: "''",
      display: "block",
    },
  };

  const statTitle = {
    fontSize: "xs",
    color: "text_base",
    fontWeight: "medium",
    textTransform: "uppercase",
    mb: "8px",
    textAlign: "center",
  };

  const statInfo = {
    fontSize: "md",
    color: "text_md",
    fontWeight: "semibold",
    textTransform: "uppercase",
    textAlign: "center",
  };

  const indicator = {
    h: "8px",
    w: "8px",
  };

  return (
    <Card.Root
      border={"1px solid"}
      borderColor={"neutral"}
      w={"full"}
      p={"20px"}
    >
      <Card.Body>
        <Flex
          gap={0}
          w={"full"}
          bg={"neutral"}
          borderRadius={"xs"}
          overflow={"hidden"}
          mb={"20px"}
        >
          <Box
            css={lineStyles}
            _before={{ w: `${calcWidth(6, 4)}%`, bg: "green.400" }}
          ></Box>
          <Box
            css={lineStyles}
            _before={{ w: `${calcWidth(6, 1)}%`, bg: "yellow.400" }}
          ></Box>
          <Box
            css={lineStyles}
            _before={{ w: `${calcWidth(6, 1)}%`, bg: "red.400" }}
          ></Box>
        </Flex>
        <HStack gap={"20px"} w={"full"} mb={"29px"}>
          <Flex align={"center"} direction={"column"}>
            <Text css={statTitle}>Played</Text>
            <Text css={statInfo}>6</Text>
          </Flex>
          <Box as={"span"} h={"40px"} w={"1px"} bg={"gray.300"}></Box>
          <HStack w={"full"} justify={"space-between"}>
            <Flex align={"center"} direction={"column"}>
              <Text css={statTitle}>Win</Text>
              <Text css={statInfo}>4</Text>
            </Flex>
            <Flex align={"center"} direction={"column"}>
              <Text css={statTitle}>Draw</Text>
              <Text css={statInfo}>1</Text>
            </Flex>
            <Flex align={"center"} direction={"column"}>
              <Text css={statTitle}>Lose</Text>
              <Text css={statInfo}>1</Text>
            </Flex>
          </HStack>
        </HStack>
        <Flex w={"full"} gap={"20px"} justify={"flex-start"}>
          <Flex align={"center"} gap={"10px"}>
            <Box css={indicator} bg={"green.400"}></Box>
            <Text css={statTitle} mb={0}>
              Win
            </Text>
          </Flex>
          <Flex align={"center"} gap={"10px"}>
            <Box css={indicator} bg={"yellow.400"}></Box>
            <Text css={statTitle} mb={0}>
              Draw
            </Text>
          </Flex>
          <Flex align={"center"} gap={"10px"}>
            <Box css={indicator} bg={"red.400"}></Box>
            <Text css={statTitle} mb={0}>
              Lose
            </Text>
          </Flex>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default MatchStats;
