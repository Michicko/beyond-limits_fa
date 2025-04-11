import { NativeSelect } from "@chakra-ui/react";
import React from "react";

function CustomSelect({
  id,
  defaultValue,
  options,
  handleOnChange,
  disabled,
}: {
  id: string;
  defaultValue: string;
  options: { label: string; value: string }[];
  handleOnChange: (value: string, id: string) => void;
  disabled: boolean;
}) {
  const getColor = (option: string) => {
    return option === "win"
      ? "green"
      : option === "draw"
      ? "yellow"
      : option === "lose"
      ? "red"
      : "text_lg";
  };

  return (
    <NativeSelect.Root
      size="md"
      w={"125px"}
      margin={"0 auto"}
      id={id}
      disabled={disabled}
    >
      <NativeSelect.Field
        placeholder="Select result"
        pl={"10px"}
        lineHeight={1.5}
        defaultValue={defaultValue}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target;
          handleOnChange(value, id);
        }}
        textTransform={"capitalize"}
      >
        {options.map((el) => {
          return (
            <option
              value={el.value}
              style={{ color: getColor(el.label), textTransform: "capitalize" }}
            >
              {el.label}
            </option>
          );
        })}
      </NativeSelect.Field>
      <NativeSelect.Indicator />
    </NativeSelect.Root>
  );
}

export default CustomSelect;
