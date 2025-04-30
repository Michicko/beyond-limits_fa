import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function PlayersSkeleton({ isLoading }: { isLoading: boolean }) {
  return (
    <Box>
      <HStack mb={4} flexWrap={"wrap"}>
        <Skeleton h={"40px"} w={"150px"} loading={isLoading} />
        <Skeleton h={"40px"} w={"150px"} loading={isLoading} />
        <Skeleton h={"40px"} w={"150px"} loading={isLoading} />
      </HStack>
      <HStack mb={4} w={"full"}>
        <Skeleton h={"40px"} w={"50%"} loading={isLoading} />
        <Skeleton h={"40px"} w={"50%"} loading={isLoading} />
      </HStack>
      <Stack gap={4}>
        <Skeleton h={"300px"} w={"full"} maxW={"600px"} loading={isLoading} />
        <Skeleton h={"300px"} w={"full"} maxW={"600px"} loading={isLoading} />
        <Skeleton h={"300px"} w={"full"} maxW={"600px"} loading={isLoading} />
      </Stack>
    </Box>
  );
}

export default PlayersSkeleton;
