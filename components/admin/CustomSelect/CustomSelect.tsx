import { NativeSelect } from "@chakra-ui/react";
import React from "react";

function CustomSelect({
  name,
  description,
  selectedValue,
  options,
  handleOnChange,
  fixedWidth,
  id,
  disabled,
}: {
  name: string;
  description: string;
  selectedValue: string;
  options: { label: string; value: string }[];
  handleOnChange?: (e: { target: { name: string; value: string } }) => void;
  fixedWidth?: boolean;
  id?: string;
  disabled?: boolean;
}) {
  return (
    <NativeSelect.Root
      size={"md"}
      variant={"outline"}
      colorPalette={"gray"}
      textTransform={"capitalize"}
      minW={fixedWidth ? "150px" : "2xs"}
      maxW={fixedWidth ? "2xs" : "full"}
      disabled={disabled}
    >
      <NativeSelect.Field
        placeholder={`Select ${description}`}
        color={"text_lg"}
        fontSize={"sm"}
        fontWeight={"medium"}
        pl={"10px"}
        lineHeight={1.5}
        name={name}
        flexShrink={0}
        value={selectedValue}
        onChange={handleOnChange}
        id={id}
      >
        {options.map((option, i) => {
          return (
            <option value={option.value} key={option.value + i}>
              {option.label}
            </option>
          );
        })}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}

export default CustomSelect;
