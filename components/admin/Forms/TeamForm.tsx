"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CheckBox from "@/components/CheckBox/CheckBox";
import FormBtn from "./FormBtn";
import MatchIcon from "../Card/MatchIcon";
import { ITeam } from "@/lib/definitions";

function TeamForm({ team }: { team?: ITeam }) {
  const [formData, setFormData] = useState({
    short_name: team?.short_name || "",
    long_name: team?.long_name || "",
    logo: team?.logo || "",
    isBeyondLimits: team?.isBeyondLimits || false,
    stadium: team?.stadium || "",
  });

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form>
      <Stack gap="4">
        {formData.logo ? (
          <MatchIcon size="xl" src={formData.logo} />
        ) : (
          <Field.Root required>
            <FormLabel>Team Logo</FormLabel>
            <CustomFileUpload description="team logo" />
          </Field.Root>
        )}
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
            Enter short name e.g BLFA
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
            Enter long name e.g Beyond Limits Fa
          </Field.HelperText>
        </Field.Root>
        <CheckBox
          checked={formData.isBeyondLimits}
          name="isBeyondLimits"
          size="xs"
          label="Is BeyonLimits Fa"
          onCheckedChange={(e) => {
            setFormData({
              ...formData,
              isBeyondLimits: e.checked,
            });
          }}
          showLabel={true}
        />
        <FormBtn>{team ? "Update" : "Save"}</FormBtn>
      </Stack>
    </form>
  );
}

export default TeamForm;
