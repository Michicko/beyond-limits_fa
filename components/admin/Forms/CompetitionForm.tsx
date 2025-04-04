"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { ICompetition } from "@/lib/definitions";
import MatchIcon from "../Card/MatchIcon";

function CompetitionForm({ competition }: { competition?: ICompetition }) {
  const [formData, setFormData] = useState({
    logo: competition?.logo || "",
    short_name: competition?.short_name || "",
    long_name: competition?.long_name || "",
    competition_type: competition?.competition_type || "",
  });

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form>
      <Stack gap="4">
        {competition && formData.logo ? (
          <MatchIcon size="xl" src={formData.logo} />
        ) : (
          <Field.Root required>
            <FormLabel>Competition Logo</FormLabel>
            <CustomFileUpload description="competition logo" />
          </Field.Root>
        )}
        <Field.Root required>
          <FormLabel>Competition Type</FormLabel>
          <CustomSelect
            options={["league", "cup", "mixed"].map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
            name="competition_type"
            description="competition type"
            selectedValue={formData.competition_type}
            handleOnChange={handleOnChange}
            fixedWidth={true}
          />
        </Field.Root>
        <Field.Root required>
          <FormLabel>short name</FormLabel>
          <Input
            name={"short_name"}
            type={"text"}
            placeholder="Enter Short name"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            value={formData.short_name}
            onChange={handleOnChange}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter short e.g nnl
          </Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <FormLabel>long name</FormLabel>
          <Input
            name={"long_name"}
            type={"text"}
            placeholder="Enter long name"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            value={formData.long_name}
            onChange={handleOnChange}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter long e.g nigerian national league
          </Field.HelperText>
        </Field.Root>
        <FormBtn>{competition ? "Update" : "Save"}</FormBtn>
      </Stack>
    </form>
  );
}

export default CompetitionForm;
