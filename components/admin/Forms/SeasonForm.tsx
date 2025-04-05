"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useTransition } from "react";
import FormLabel from "./FormLabel";
import FormBtn from "./FormBtn";
import { ISeason } from "@/lib/definitions";
import useToast from "@/hooks/useToast";
import { createSeason, updateSeason } from "@/app/_actions/actions";
import { getButtonStatus } from "@/lib/helpers";

function SeasonForm({ season }: { season?: ISeason | null }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { errorToast, mutationToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (season) {
      startTransition(() => {
        updateSeason(season.id, formData)
          .then((data: any) => {
            mutationToast("season", data.season, "update");
          })
          .catch((err) => {
            errorToast(err);
          });
      });
    } else {
      startTransition(() => {
        createSeason(formData)
          .then((data: any) => {
            mutationToast("season", data.season, "create");
            formRef.current?.reset();
          })
          .catch((err) => {
            console.log(err);
            errorToast(err);
          });
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
