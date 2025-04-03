"use client";
import { Button } from "@chakra-ui/react";
import React from "react";

function FormBtn({
  children,
  type,
  disabled,
  loading,
  loadingText,
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <Button
      type={type || "submit"}
      size={"lg"}
      variant={"outline"}
      colorPalette={"transparent"}
      cursor={"pointer"}
      padding={"0 25px"}
      bg={"primary"}
      color={"white"}
      fontSize={"md"}
      fontWeight={"400"}
      disabled={disabled}
      _hover={{ bg: "primary_variant" }}
      loading={loading}
      loadingText={loadingText}
    >
      {children}
    </Button>
  );
}

export default FormBtn;
