import { Field, Input, Stack } from "@chakra-ui/react";
import React from "react";
import FormLabel from "./FormLabel";
import FormBtn from "./FormBtn";
import { ISeason } from "@/lib/definitions";

function SeasonForm({ season }: { season?: ISeason }) {
  return (
    <form>
      <Stack gap="4">
        <Field.Root required>
          <FormLabel>Season</FormLabel>
          <Input
            name={"season"}
            type={"text"}
            placeholder="Enter Season"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter season e.g 2023/2024
          </Field.HelperText>
        </Field.Root>
        <FormBtn>{season ? "Update" : "Save"}</FormBtn>
      </Stack>
    </form>
  );
}

export default SeasonForm;
