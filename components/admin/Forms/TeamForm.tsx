"use client";
import { Field, HStack, IconButton, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CheckBox from "@/components/admin/CheckBox/CheckBox";
import FormBtn from "./FormBtn";
import { Schema } from "@/amplify/data/resource";
import slugify from "slugify";
import { getButtonStatus } from "@/lib/helpers";
import useToast from "@/hooks/useToast";
import { createTeam, updateTeam } from "@/app/_actions/actions";
import { CldImage } from "next-cloudinary";
import { getIcon } from "@/lib/icons";

type ITeam = Pick<
  Schema["Team"]["type"],
  "id" | "logo" | "shortName" | "longName" | "stadium" | "isBeyondLimits"
>;

function TeamForm({ team }: { team?: ITeam | null }) {
  const [isBeyondLimits, setIsBeyondLimits] = useState<boolean>(
    team?.isBeyondLimits || false
  );
  const [shortName, setShortName] = useState(team?.shortName || "");
  const [logo, setLogo] = useState(team?.logo || "");

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("logo", logo);
    formData.append("isBeyondLimits", String(isBeyondLimits));

    if (team) {
      startTransition(() => {
        updateTeam(team.id, formData, team.longName)
          .then((data: ITeam | null) => {
            if (data) {
              mutationToast("team", data.longName, "update");
            }
          })
          .catch((err) => {
            errorToast(err);
          });
      });
    } else {
      startTransition(() => {
        createTeam(formData)
          .then((data: ITeam | null) => {
            if (data) {
              mutationToast("team", data.longName, "create");
              formRef.current?.reset();
              setLogo("");
              setShortName("");
              setIsBeyondLimits(false);
            }
          })
          .catch((err) => {
            errorToast(err);
          });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap="4">
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
            defaultValue={shortName}
            onChange={(e) => setShortName(e.target.value)}
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
            name={"longName"}
            type={"text"}
            placeholder="Enter long name"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            defaultValue={team?.longName || ""}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter long name e.g Beyond Limits Fa
          </Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <FormLabel>stadium</FormLabel>
          <Input
            name={"stadium"}
            type={"text"}
            placeholder="Enter stadium"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            defaultValue={team?.stadium || ""}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter stadium e.g Remo stars stadium
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
              description="team logo"
              onUploaded={(path: string) => {
                setLogo(path);
              }}
              id="team-logo"
              filename={slugify(shortName, { lower: true })}
            />
          )}
        </Field.Root>
        <CheckBox
          checked={isBeyondLimits}
          name="isBeyondLimits"
          size="xs"
          label="Is BeyonLimits Fa"
          onCheckedChange={(e) => {
            setIsBeyondLimits(e.checked);
          }}
          showLabel={true}
        />
        <FormBtn disabled={isPending}>
          {getButtonStatus(team, "Team", isPending)}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default TeamForm;
