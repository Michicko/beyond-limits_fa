import { Heading, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";

function NotFound() {
  return (
    <Stack>
      <Heading
        as={"h1"}
        fontSize={"xl"}
        fontWeight={"700"}
        color={"text_lg"}
        mb={"2"}
      >
        Page not found!
      </Heading>
      <Text color={"text_mg"}>This page does not exist or has been moved.</Text>
      <Link
        href="/cp/dashboard"
        color={"primary"}
        textDecoration={"underline"}
        display={"inline"}
      >
        Go back to Dashboard
      </Link>
    </Stack>
  );
}

export default NotFound;
