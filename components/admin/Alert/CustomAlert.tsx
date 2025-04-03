import { Alert, Stack } from "@chakra-ui/react";
import React from "react";

function CustomAlert({
  title,
  status,
  message,
}: {
  title: string;
  status: "info" | "warning" | "success" | "error" | "neutral";
  message?: string;
}) {
  return (
    <Alert.Root status={status} title={title} p={5}>
      <Alert.Indicator />
      <Stack gap={"1"}>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{message}</Alert.Description>
      </Stack>
    </Alert.Root>
  );
}

export default CustomAlert;
