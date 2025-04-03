"use client";
import { getIcon } from "@/lib/icons";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import React from "react";

function BackButton() {
  const router = useRouter();
  return (
    <Button
      variant={"subtle"}
      borderRadius={"2xl"}
      size={"sm"}
      padding={"4px 20px"}
      onClick={() => router.back()}
    >
      {getIcon("back")}
      Back
    </Button>
  );
}

export default BackButton;
