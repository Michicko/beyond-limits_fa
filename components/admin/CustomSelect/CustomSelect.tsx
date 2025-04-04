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
}: {
  name: string;
  description: string;
  selectedValue: string;
  options: { label: string; value: string }[];
  handleOnChange?: (e: { target: { name: string; value: string } }) => void;
  fixedWidth?: boolean;
  id?: string;
}) {
  return (
    <NativeSelect.Root
      size={"md"}
      variant={"outline"}
      colorPalette={"gray"}
      maxW={fixedWidth ? "2xs" : "full"}
    >
      <NativeSelect.Field
        placeholder={`Select ${description}`}
        color={"text_lg"}
        fontSize={"sm"}
        fontWeight={"medium"}
        pl={"10px"}
        name={name}
        value={selectedValue}
        onChange={handleOnChange}
        id={id}
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
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
