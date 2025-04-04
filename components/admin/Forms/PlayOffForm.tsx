"use client";
import { Field, HStack, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormBtn from "./FormBtn";
import FormLabel from "./FormLabel";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { matches } from "@/lib/placeholder-data";
import { ICup } from "@/lib/definitions";

const rounds = [
  "1/128-final",
  "1/64-final",
  "1/32-final",
  "1/16-final",
  "1/8-final",
  "quaterfinal",
  "semifinal",
  "thirdplace",
  "final",
];

function PlayOffForm({ cup }: { cup: ICup }) {
  const roundOptions = rounds.map((round) => {
    return {
      label: round,
      value: round,
    };
  });

  const matchOptions = matches
    .filter((el) => el.competition?.id === cup.competition_id)
    .map((match) => {
      return {
        label: match.home.team?.long_name + " vs " + match.away.team?.long_name,
        value: match.id,
      };
    });

  const [formData, setMatchForm] = useState({
    cup_id: cup.id,
    round: "",
    match_id: "",
  });

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setMatchForm({ ...formData, [name]: value });
  };

  return (
    <>
      <form>
        <Stack gap={4}>
          <HStack justifyContent={"flex-end"}>
            <FormBtn>Create PlayOff Round</FormBtn>
          </HStack>
          <Field.Root>
            <FormLabel>Rounds</FormLabel>
            <CustomSelect
              name="round"
              id="round"
              description="round"
              options={roundOptions}
              selectedValue={formData.round}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root>
            <FormLabel>Match</FormLabel>
            <CustomSelect
              name="match_id"
              id="match_id"
              description="match"
              options={matchOptions}
              selectedValue={formData.match_id}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
        </Stack>
      </form>
    </>
  );
}

export default PlayOffForm;
