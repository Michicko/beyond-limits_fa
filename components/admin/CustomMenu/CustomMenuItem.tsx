"use client";
import { Menu } from "@chakra-ui/react";
import React from "react";

function CustomMenuItem({
  label,
  showBorder,
  disabled,
  children,
}: {
  label: string;
  showBorder: boolean;
  disabled?: boolean;
  children?: React.ReactElement;
}) {
  const otherStyles = {
    w: "full",
    h: "full",
    p: "0 10px",
    outline: "transparent",
    textDecoration: "none",
    border: "none",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const menuItemStyles = {
    p: "0 10px",
    h: "40px",
    cursor: "pointer",
    position: "relative",
    "& a": otherStyles,
    "& button": otherStyles,
  };

  return (
    <Menu.Item
      value={label}
      css={menuItemStyles}
      color={label.toLowerCase() === "delete" ? "fg.error" : "text_lg"}
      borderBottom={"1px solid"}
      borderColor={showBorder ? "neutral" : "transparent"}
      disabled={disabled}
    >
      {children || label}
    </Menu.Item>
  );
}

export default CustomMenuItem;
