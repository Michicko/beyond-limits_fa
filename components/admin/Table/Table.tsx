import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

function Table({ children }: { children: React.ReactElement }) {
  return (
    <>
      <ChakraTable.ScrollArea mb={"30px"}>
        <ChakraTable.Root
          minWidth={"768px"}
          size="sm"
          bg={"card_bg"}
          variant={"line"}
          mb={"10px"}
          userSelect={"none"}
        >
          {children}
        </ChakraTable.Root>
      </ChakraTable.ScrollArea>
    </>
  );
}

export default Table;
