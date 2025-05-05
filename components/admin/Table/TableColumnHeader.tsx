import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

function TableColumnHeader(
  props: React.JSX.IntrinsicAttributes &
    ChakraTable.ColumnHeaderProps &
    React.RefAttributes<HTMLTableCellElement>
) {
  return (
    <ChakraTable.ColumnHeader
      textTransform={"capitalize"}
      fontWeight={"medium"}
      color={"text_lg"}
      verticalAlign={"middle"}
      {...props}
      border={"1px solid"}
      borderColor={"gray.200"}
      pl={"5px"}
    >
      {props.children}
    </ChakraTable.ColumnHeader>
  );
}

export default TableColumnHeader;
