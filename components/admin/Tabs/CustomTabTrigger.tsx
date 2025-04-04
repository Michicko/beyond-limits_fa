import { Tabs } from "@chakra-ui/react";
import React from "react";

function CustomTabTrigger({ label, value }: { label: string; value: string }) {
  return (
    <Tabs.Trigger
      value={value}
      textTransform={"uppercase"}
      bg={"neutral"}
      color={"gray"}
      border={"1px solid transparent"}
      _selected={{ bg: "primary_variant", color: "gray.200" }}
      fontWeight={"medium"}
    >
      {label}
    </Tabs.Trigger>
  );
}

export default CustomTabTrigger;
