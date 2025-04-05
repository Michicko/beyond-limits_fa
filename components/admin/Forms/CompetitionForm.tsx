"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "@/components/admin/CustomFileUpload/CustomFileUpload";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";

import MatchIcon from "../Card/MatchIcon";
import { cookiesClient } from "@/utils/amplify-utils";
import { Schema } from "@/amplify/data/resource";

type ICompetition = Pick<
  Schema["Competition"]["type"],
  "id" | "logo" | "shortName" | "longName" | "competitionType"
>;

function CompetitionForm({ competition }: { competition: ICompetition }) {
  const competitionTypes = cookiesClient.enums.CompetitionType.values();
  const [logo, setLogo] = useState(competition?.logo || "");
  const [competitionType, setCompetitionType] = useState(
    competition?.competitionType || ""
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const arr = Array.from(formData.entries(), ([key, value]) => [
      key,
      value.toString(),
    ]);
    console.log(arr);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="4">
        {competition && logo ? (
          <MatchIcon size="xl" src={logo} />
        ) : (
          <Field.Root required>
            <FormLabel>Competition Logo</FormLabel>
            <CustomFileUpload
              description="competition logo"
              onUploaded={(path: string) => {
                setLogo(path);
              }}
              id="competition-logo"
              filename={"competition logo"}
            />
          </Field.Root>
        )}
        <Field.Root required>
          <FormLabel>Competition Type</FormLabel>
          <CustomSelect
            options={competitionTypes.map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
            name="competitionType"
            description="competition Type"
            selectedValue={competitionType}
            handleOnChange={(e: { target: { value: string } }) => {
              const { value } = e.target;
              setCompetitionType(value);
            }}
            fixedWidth={true}
          />
        </Field.Root>
        <Field.Root required>
          <FormLabel>short name</FormLabel>
          <Input
            name={"shortName"}
            type={"text"}
            placeholder="Enter Short name"
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
            Enter short e.g nnl
          </Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <FormLabel>long name</FormLabel>
          <Input
            name={"longName"}
            type={"text"}
            placeholder="Enter long name"
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
            Enter long e.g nigerian national league
          </Field.HelperText>
        </Field.Root>
        <FormBtn>{competition ? "Update" : "Save"}</FormBtn>
      </Stack>
    </form>
  );
}

export default CompetitionForm;
