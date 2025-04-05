"use client";
import { Box, Image, Icon } from "@chakra-ui/react";
import React from "react";
import { CldImage } from "next-cloudinary";

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
      <CldImage src={src} width="250" height="250" alt="" />
    </Icon>
  );
}

export default MatchIcon;
