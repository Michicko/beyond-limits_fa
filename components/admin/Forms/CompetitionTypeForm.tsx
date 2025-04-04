"use client";
import { Field, HStack, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormBtn from "./FormBtn";
import FormLabel from "./FormLabel";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { competitions, seasons } from "@/lib/placeholder-data";

function CompetitionTypeForm({
  competition_id,
  type,
}: {
  competition_id: string;
  type: "Cup" | "League";
}) {
  const seasonOptions = seasons.map((season) => {
    return {
      label: season.season,
      value: season.season,
    };
  });

  const [formData, setFormData] = useState({
    competition_id,
    season_id: "",
    status: "pending",
  });

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const competition = competitions.find((el) => el.id === competition_id);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <HStack justifyContent={"flex-end"} mb={"4"}>
        <FormBtn>Create {type}</FormBtn>
      </HStack>
      <Stack gap={"4"}>
        {competition && (
          <Field.Root>
            <FormLabel>Competition</FormLabel>
            <Input
              disabled
              value={competition.long_name}
              p={"0 10px"}
              variant={"outline"}
              color={"text_lg"}
              textTransform={"capitalize"}
            />
          </Field.Root>
        )}
        <Field.Root>
          <FormLabel>Season</FormLabel>
          <CustomSelect
            name="season_id"
            id="season_id"
            description="season"
            options={seasonOptions}
            selectedValue={formData.season_id}
            handleOnChange={handleOnChange}
          />
        </Field.Root>
      </Stack>
    </form>
  );
}

export default CompetitionTypeForm;
