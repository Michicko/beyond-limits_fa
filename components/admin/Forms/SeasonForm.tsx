"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useTransition } from "react";
import FormLabel from "./FormLabel";
import FormBtn from "./FormBtn";
import useToast from "@/hooks/useToast";
import { createSeason, updateSeason } from "@/app/_actions/actions";
import { getButtonStatus } from "@/lib/helpers";
import { Schema } from "@/amplify/data/resource";

type ISeason = Pick<Schema["Season"]["type"], "id" | "season" | "createdAt">;

function SeasonForm({ season }: { season?: ISeason | null }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { errorToast, mutationToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (season) {
      // Start transition for updating season
      startTransition(async () => {
        const res = await updateSeason(season.id, formData, season.season);
        if (res.status === "success" && res.data) {
          mutationToast("season", res.data.season, "update");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      // Start transition for creating season
      startTransition(async () => {
        const res = await createSeason(formData);
        if (res.status === "success" && res.data) {
          mutationToast("season", res.data.season, "create");
          formRef.current?.reset();
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
            defaultValue={season?.season || ""}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter season e.g 2023/2024
          </Field.HelperText>
        </Field.Root>
        <FormBtn disabled={isPending}>
          {getButtonStatus(season, "Season", isPending)}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default SeasonForm;
