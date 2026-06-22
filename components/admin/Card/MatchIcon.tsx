"use client";
import { image } from "@/components/imageHelper";
import { Box, Image, Icon } from "@chakra-ui/react";
import React from "react";

function MatchIcon({
  src,
  size,
  radius,
  order,
}: {
  src: string;
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  radius?: boolean;
  order?: number;
}) {
  return (
    <Icon
      size={size}
      borderRadius={radius ? "full" : "0"}
      bg={radius ? "fg.muted" : "transparent"}
      order={order}
    >
      <Image src={image(src)} width="250" height="250" alt="" />
    </Icon>
  );
}

export default MatchIcon;
