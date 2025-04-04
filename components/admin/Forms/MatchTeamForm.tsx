import { Field, Input } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";

function MatchTeamForm({
  value,
  team,
  handleOnChange,
}: {
  value: string;
  team: "home" | "away";
  handleOnChange: (
    e: { target: { name: string; value: any } },
    team: "home" | "away"
  ) => void;
}) {
  const pattern = /^(w{1,5}|l{1,5}|d{1,5})(,(w{1,5}|l{1,5}|d{1,5})){0,4}$/g;

  return (
    <Field.Root invalid={value ? !pattern.test(value) : false}>
      <FormLabel>{team} Forms</FormLabel>
      <Input
        name="form"
        p={"0 10px"}
        id={`${team}-form`}
        placeholder={`${team} Form`}
        type="text"
        variant={"outline"}
        color={"text_lg"}
        mb={"1"}
        pattern="^(w{1,5}|l{1,5}|d{1,5})(,(w{1,5}|l{1,5}|d{1,5})){0,4}$"
        value={value}
        onChange={(e) => handleOnChange(e, team)}
      />
      <Field.ErrorText fontSize={"smaller"}>Invalid format</Field.ErrorText>
      <Field.HelperText fontSize={"smaller"} color={"text_base"}>
        Enter form, not more than 5 matches e.g w,l,w,w,d
      </Field.HelperText>
    </Field.Root>
  );
}

export default MatchTeamForm;
