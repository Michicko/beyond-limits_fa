import { IMatch } from "@/lib/definitions";
import { Field, Input } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";

function MatchRound({
  matchForm,
  handleMatchFormOnChange,
}: {
  matchForm: IMatch;
  handleMatchFormOnChange: (e: {
    target: { name: string; value: any };
  }) => void;
}) {
  return (
    <Field.Root>
      <FormLabel>Round</FormLabel>
      <Input
        name="round"
        p={"0 10px"}
        placeholder="Enter round"
        type="text"
        variant={"outline"}
        color={"text_lg"}
        value={matchForm.round}
        onChange={handleMatchFormOnChange}
      />
      <Field.HelperText>Enter Round e.g 2</Field.HelperText>
    </Field.Root>
  );
}

export default MatchRound;
