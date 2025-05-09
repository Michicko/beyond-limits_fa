import React from "react";
import { Table as ChakraTable } from "@chakra-ui/react";
function TableCell(
  props: React.JSX.IntrinsicAttributes &
    ChakraTable.CellProps &
    React.RefAttributes<HTMLTableCellElement>
) {
  return (
    <ChakraTable.Cell
      textTransform={"capitalize"}
      fontWeight={"medium"}
      color={"text_md"}
      {...props}
      verticalAlign={"middle"}
      border={"1px solid"}
      borderColor={"gray.200"}
      pl={"5px"}
    >
      {props.children}
    </ChakraTable.Cell>
  );
}

export default TableCell;
