import { Separator } from "@chakra-ui/react";
import React from "react";

function CustomSeparator() {
  return (
    <Separator
      my={"5"}
      height={"1px"}
      variant={"solid"}
      colorPalette={"gray"}
      bg={"gray"}
    />
  );
}

export default CustomSeparator;
