import { Tabs } from "@chakra-ui/react";
import React from "react";

function CustomTabContent({
  children,
  value,
}: {
  children: React.ReactElement;
  value: string;
}) {
  return (
    <Tabs.Content value={value} outline={"transparent"}>
      {children}
    </Tabs.Content>
  );
}

export default CustomTabContent;
