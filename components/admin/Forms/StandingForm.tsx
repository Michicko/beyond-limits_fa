"use client";
import { IStandingRow } from "@/lib/definitions";
import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import FormBtn from "./FormBtn";
import StandingFormInput from "./StandingFormInput";

function StandingForm({ standing }: { standing: IStandingRow }) {
  const [standingRowForm, setStandingRowForm] =
    useState<IStandingRow>(standing);

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const target = e.target;
    const { name, value } = target;
    setStandingRowForm({ ...standingRowForm, [name]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(standingRowForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex alignItems={"flex-end"} gap={3} wrap={"wrap"}>
        <StandingFormInput
          label={"position"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.position}
        />
        <StandingFormInput
          label={"played"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.p}
        />
        <StandingFormInput
          label={"win"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.w}
        />
        <StandingFormInput
          label={"draw"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.d}
        />
        <StandingFormInput
          label={"lose"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.l}
        />
        <StandingFormInput
          label={"goals"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.g}
        />
        <StandingFormInput
          label={"goal difference"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.gd}
        />
        <StandingFormInput
          label={"points"}
          onChange={handleOnChange}
          team_id={standing.team_id}
          value={standingRowForm.stats.pts}
        />
        <FormBtn>Update</FormBtn>
      </Flex>
    </form>
  );
}

export default StandingForm;
