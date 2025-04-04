import { Tabs } from "@chakra-ui/react";
import React from "react";

function CustomTabs({
  children,
  defaultValue,
}: {
  children: React.ReactElement;
  defaultValue: string;
}) {
  return (
    <Tabs.Root variant="plain" fitted defaultValue={defaultValue}>
      {children}
    </Tabs.Root>
  );
}

export default CustomTabs;
