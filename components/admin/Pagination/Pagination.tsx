"use client";
import React, { useState } from "react";

import { getIcon } from "@/lib/icons";
import {
  Pagination as ChakraPagination,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

function Pagination() {
  return (
    <ChakraPagination.Root count={10} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="ghost" size="sm">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>{getIcon("prev")}</IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton>{getIcon("next")}</IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}

export default Pagination;
