"use client";
import { usePageContext } from "@/contexts/pageContext";
import { Box } from "@chakra-ui/react";
import React from "react";

function CurrentlySignedInUser({ userId }: { userId: string }) {
  const { authenticatedUserId } = usePageContext();
  return (
    <Box
      as={"span"}
      h={"6px"}
      w={"6px"}
      borderRadius={"50%"}
      bg={authenticatedUserId === userId ? "green.500" : "red.500"}
      flexShrink={0}
      mx={"1"}
    ></Box>
  );
}

export default CurrentlySignedInUser;
