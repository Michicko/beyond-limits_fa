import { HStack, Text, Box, Separator } from "@chakra-ui/react";
import React from "react";
import moment from "moment";

function MatchDetails({ time, venue }: { time: string; venue: string }) {
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
        display={'inline'}
      >
        {moment(`${time}`, "HH:mm").format("HH:mm a")}
      </Text>
      <Box as={"span"} h={"15px"} w={"1px"} bg={"gray.300"}></Box>
      <Text color={"primary"} fontSize={"xs"} fontWeight={'semibold'} textTransform={"capitalize"} width={{base: '90px', sm: 'auto'}} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'} display={'inline'} title={venue}>
        {venue}
      </Text>
    </HStack>
  );
}

export default MatchDetails;
