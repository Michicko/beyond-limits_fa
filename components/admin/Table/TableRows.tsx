import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

function TableRows(
  props: React.JSX.IntrinsicAttributes &
    ChakraTable.RowProps &
    React.RefAttributes<HTMLTableRowElement>
) {
  const tableRowStyles = {
    h: "40px !important",
    minH: "40px !important",
    borderBottom: "1px solid",
    borderColor: "neutral",
  };
  return (
    <ChakraTable.Row css={tableRowStyles} {...props}>
      {props.children}
    </ChakraTable.Row>
  );
}

export default TableRows;
