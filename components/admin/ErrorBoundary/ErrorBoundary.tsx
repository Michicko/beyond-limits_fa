"use client";
import React, { useEffect } from "react";
import { Stack, Heading, Text, Button } from "@chakra-ui/react";

function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error from component:", error);
  }, [error]);

  return (
    <Stack
      minH={"100vh"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading
        as={"h1"}
        fontSize={"6xl"}
        fontWeight={"bolder"}
        color={"secondary_variant"}
      >
        {error.name}!
      </Heading>
      <Heading as={"h2"} color={"text_lg"}>
        Something went wrong!
      </Heading>
      <Text color={"text_md"} textAlign={"center"}>
        {error.message}
      </Text>
      <Button
        onClick={() => reset()}
        p={"5px 20px"}
        variant={"solid"}
        colorPalette={"blue"}
      >
        Please try again
      </Button>
    </Stack>
  );
}

export default ErrorBoundary;
