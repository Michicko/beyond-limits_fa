import { Field, Input } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";

function StandingFormInput({
  label,
  team_id,
  value,
  onChange,
}: {
  label: string;
  team_id: string;
  value: string | number;
  onChange: (e: { target: { name: string; value: string } }) => void;
}) {
  return (
    <Field.Root maxW={"100px"}>
      <FormLabel>{label}</FormLabel>
      <Input
        name={label}
        id={team_id + label}
        p={"0 10px"}
        mt={1.5}
        placeholder={`Enter position`}
        type={typeof value === "string" ? "text" : "number"}
        variant={"subtle"}
        color={"text_lg"}
        value={value}
        onChange={onChange}
      />
    </Field.Root>
  );
}

export default StandingFormInput;
