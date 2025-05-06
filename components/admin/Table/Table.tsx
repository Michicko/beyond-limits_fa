import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

function Table({ children }: { children: React.ReactElement }) {
  return (
    <>
      <ChakraTable.ScrollArea mb={"30px"}>
        <ChakraTable.Root
          minWidth={"860px"}
          size="lg"
          bg={"card_bg"}
          variant={"line"}
          mb={"10px"}
          userSelect={"none"}
          border={"1px solid"}
          borderColor={"gray.200"}
          borderCollapse={"collapse"}
        >
          {children}
        </ChakraTable.Root>
      </ChakraTable.ScrollArea>
    </>
  );
}

export default Table;
