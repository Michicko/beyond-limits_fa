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
  onChange: (
    e: { target: { name: string; value: string | number } },
    team: "home" | "away"
  ) => void;
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
        onChange={(e) => onChange(e, team)}
      />
    </Field.Root>
  );
}

export default StatInput;
