import { Tabs } from "@chakra-ui/react";
import React, { ReactElement } from "react";

function CustomTabList({ children }: { children: ReactElement }) {
  return (
    <Tabs.List
      gap={"2"}
      display={{ base: "grid", md: "flex" }}
      gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "unset" }}
    >
      {children}
    </Tabs.List>
  );
}

export default CustomTabList;
