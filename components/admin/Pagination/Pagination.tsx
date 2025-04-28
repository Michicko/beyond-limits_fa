"use client";
import React from "react";
import { getIcon } from "@/lib/icons";
import {
  Pagination as ChakraPagination,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

interface PaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  type: "mobile" | "web";
}

function Pagination({
  page,
  pageCount,
  pageSize,
  onPageChange,
  type,
}: PaginationProps) {
  return (
    <ChakraPagination.Root
      count={pageCount}
      page={page}
      pageSize={pageSize}
      defaultPage={1}
      onPageChange={(details) => onPageChange(details.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>{getIcon("prev")}</IconButton>
        </ChakraPagination.PrevTrigger>

        {type === "mobile" ? (
          <ChakraPagination.PageText />
        ) : (
          <ChakraPagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />
        )}

        <ChakraPagination.NextTrigger asChild>
          <IconButton>{getIcon("next")}</IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}

export default Pagination;
