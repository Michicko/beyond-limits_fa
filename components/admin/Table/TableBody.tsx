import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

function TableBody({ children }: { children: React.ReactElement }) {
  return <ChakraTable.Body>{children}</ChakraTable.Body>;
}

export default TableBody;
