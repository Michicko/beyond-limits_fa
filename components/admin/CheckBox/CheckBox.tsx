import React from "react";
import { Checkbox as ChakraCheckBox, HStack, Text } from "@chakra-ui/react";

function CheckBox({
  checked,
  onCheckedChange,
  label,
  showLabel,
  size,
  name,
  disabled
}: {
  checked: boolean | "indeterminate";
  onCheckedChange: (changes: any) => void;
  label: string;
  showLabel?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  name?: string;
  disabled?: boolean
}) {
  return (
    <HStack alignItems={"center"}>
      <ChakraCheckBox.Root
        size={size || "xs"}
        top="0.5"
        aria-label={label}
        variant={"outline"}
        border={"1px solid gray"}
        colorPalette={"gray"}
        disabled={disabled}
        cursor={"pointer"}
        checked={checked}
        name={name}
        onCheckedChange={onCheckedChange}
      >
        <ChakraCheckBox.HiddenInput />
        <ChakraCheckBox.Control />
      </ChakraCheckBox.Root>
      {showLabel && (
        <Text color={"text_md"} fontSize={"sm"} mt={"7px"}>
          {label}
        </Text>
      )}
    </HStack>
  );
}

export default CheckBox;
