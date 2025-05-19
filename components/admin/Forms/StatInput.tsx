import { Field, Input } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";

function StatInput({
  value,
  onChange,
  team,
  name,
}: {
  value: string | number;
  onChange: (e: { target: { name: string; value: any } }) => void;
  team: "home" | "away";
  name: string;
}) {
  const inputStyles = {
    "&::-webkit-inner-spin-button": {
      appearance: "none",
      margin: "0",
    },
    "&::-webkit-outer-spin-button": {
      appearance: "none",
      margin: "0",
    },
  };

  return (
    <Field.Root>
      <FormLabel>{name}</FormLabel>
      <Input
        name={name}
        id={team + "-" + name}
        css={inputStyles}
        p={"0 10px"}
        placeholder={`Enter ${name}`}
        type="number"
        variant={"subtle"}
        color={"text_lg"}
        value={value || ""}
        min={0}
        onKeyDown={(e) => {
          if (e.key === '-' || e.key === 'e') {
            e.preventDefault();
          }
        }}
        onChange={onChange}
      />
    </Field.Root>
  );
}

export default StatInput;
