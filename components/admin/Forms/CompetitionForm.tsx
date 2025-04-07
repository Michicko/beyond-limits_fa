"use client";
import { Field, HStack, IconButton, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "@/components/admin/CustomFileUpload/CustomFileUpload";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { Schema } from "@/amplify/data/resource";
import slugify from "slugify";
import useToast from "@/hooks/useToast";
import { createCompetition, updateCompetition } from "@/app/_actions/actions";
import { getButtonStatus } from "@/lib/helpers";
import { getIcon } from "@/lib/icons";
import { CldImage } from "next-cloudinary";

type ICompetition = Pick<
  Schema["Competition"]["type"],
  "id" | "logo" | "shortName" | "longName" | "competitionType"
>;

function CompetitionForm({
  competition,
  competitionTypes,
}: {
  competition?: ICompetition | null;
  competitionTypes: string[];
}) {
  const [logo, setLogo] = useState(competition?.logo || "");
  const [competitionType, setCompetitionType] = useState(
    competition?.competitionType || ""
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const [shortName, setShortName] = useState(competition?.shortName || "");
  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("logo", logo);

    if (competition) {
      startTransition(async () => {
        const res = await updateCompetition(
          competition.id,
          formData,
          competition.longName
        );
        if (res.status === "success" && res.data) {
          mutationToast("competition", res.data.longName, "update");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      startTransition(async () => {
        const res = await createCompetition(formData);
        if (res.status === "success" && res.data) {
          mutationToast("competition", res.data.longName, "create");
          formRef.current?.reset();
          setLogo("");
          setShortName("");
          setCompetitionType("");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap="4">
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
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
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
            defaultValue={competition?.longName || ""}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter long e.g nigerian national league
          </Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <FormLabel>Competition Logo</FormLabel>
          {logo && (
            <HStack gap={4}>
              <CldImage src={logo} width="75" height="75" alt={shortName} />
              <IconButton
                size={"2xs"}
                title="delete"
                colorPalette={"red"}
                onClick={() => setLogo("")}
              >
                {getIcon("close")}
              </IconButton>
            </HStack>
          )}
          {!logo && shortName && (
            <CustomFileUpload
              description="competition logo"
              onUploaded={(path: string) => {
                setLogo(path);
              }}
              id="competition-logo"
              filename={slugify(shortName, { lower: true })}
            />
          )}
        </Field.Root>
        <FormBtn disabled={isPending}>
          {getButtonStatus(competition, "Competition", isPending)}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default CompetitionForm;
