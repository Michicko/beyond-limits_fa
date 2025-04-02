import { getIcon } from "@/lib/icons";
import { IconButton, Menu, Portal } from "@chakra-ui/react";
import React from "react";
import CustomMenuItem from "./CustomMenuItem";

function CustomMenu({
  children,
  position,
  icon,
}: {
  children: React.ReactElement;
  position?: "relative" | "absolute";
  icon?: React.ReactNode;
}) {
  return (
    <Menu.Root>
      <Menu.Trigger
        asChild
        position={position ? position : "relative"}
        top={position === "absolute" ? "2" : 0}
        right={position === "absolute" ? "1" : 0}
      >
        <IconButton
          variant="ghost"
          size="md"
          _hover={{ bg: "transparent", outline: "transparent" }}
          _focus={{ bg: "transparent", outline: "transparent" }}
          _enabled={{ bg: "transparent", outline: "transparent" }}
        >
          {icon ? icon : getIcon("dots")}
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content py={"5px"}>{children}</Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

export default CustomMenu;
