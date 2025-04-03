import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

function TableHeader({ children }: { children: React.ReactElement }) {
  const tableRowStyles = {
    h: "45px !important",
    minH: "45px !important",
  };
  return (
    <ChakraTable.Header css={tableRowStyles}>{children}</ChakraTable.Header>
  );
}

export default TableHeader;
