import { Field, Input } from "@chakra-ui/react";
import React from "react";
import FormLabel from "../Forms/FormLabel";

function FormInput({
  label,
  placeholder,
  name,
  value,
  onChange,
  description,
  id,
}: {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  description: string;
  id: string;
}) {
  return (
    <Field.Root required>
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={"text"}
        placeholder={placeholder}
        px={"2"}
        color={"text_lg"}
        fontSize={"sm"}
        fontWeight={"medium"}
        id={id}
        mb={"5px"}
        value={value}
        onChange={onChange}
      />
      <Field.HelperText fontSize={"sm"} fontWeight={"normal"} color={"text_md"}>
        {description}
      </Field.HelperText>
    </Field.Root>
  );
}

export default FormInput;
