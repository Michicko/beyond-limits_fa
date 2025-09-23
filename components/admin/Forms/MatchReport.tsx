"use client";
import { Box, Field, Textarea } from "@chakra-ui/react";
import React from "react";
import TextEditor from "@/components/TextEditor/TextEditor";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import { JSONContent } from "@tiptap/react";
import { IMatchFormData, IStackStyles, Nullable } from "@/lib/definitions";
import GoalScorers from "./GoalScorers";
import FormLabel from "./FormLabel";
import ResultSelector from "../ResultSelector/ResultSelector";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
  playerPosition: {
    shortName: string;
  };
}

function MatchReport({
  matchForm,
  setMatchForm,
  stackStyles,
  handleOnChange,
  players,
  result,
  setResult,
  statuses,
}: {
  matchForm: IMatchFormData;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchFormData>>;
  stackStyles: IStackStyles;
  handleOnChange: (e: { target: { name: string; value: any } }) => void;
  players: IPlayer[];
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  statuses: string[];
}) {
  const playerOptions = players
    .filter(
      (player) =>
        matchForm.lineup?.includes(player.id) ||
        matchForm.substitutes?.includes(player.id)
    )
    .map((player) => {
      return {
        label: `${player.firstname} ${player.lastname}`,
        value: player.id,
      };
    });

  const handleReportContext = (json: JSONContent) => {
    setMatchForm({
      ...matchForm,
      report: json,
    });
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <Field.Root mb={"5"} w={"full"}>
        <FormLabel>Status</FormLabel>
        <CustomSelect
          name="status"
          description="status"
          options={statuses.map((el) => {
            return {
              label: el,
              value: el,
            };
          })}
          selectedValue={matchForm.status || ""}
          handleOnChange={handleOnChange}
        />
      </Field.Root>

      <FormLabel as="Text">Result</FormLabel>
      <Field.Root mb={"5"} w={"full"}>
        <ResultSelector
          id={matchForm.id}
          value={result}
          setValue={setResult}
          disabled={
            matchForm.result && matchForm.status === "COMPLETED" ? true : false
          }
          fixedWidth={false}
        />
      </Field.Root>
      <GoalScorers
        matchForm={matchForm}
        setMatchForm={setMatchForm}
        players={players}
      />
      <Field.Root mb={"5"} w={"full"}>
        <FormLabel>Match Context</FormLabel>
        <TextEditor
          content={matchForm.report as string}
          handleOnUpdate={handleReportContext}
        />
      </Field.Root>
      <Field.Root mb={"5"}>
        <FormLabel>Mvp</FormLabel>
        <CustomSelect
          name="mvpId"
          description="man of the match"
          options={playerOptions}
          selectedValue={matchForm.mvpId || ""}
          handleOnChange={handleOnChange}
          fixedWidth={true}
        />
      </Field.Root>
      <Field.Root>
        <FormLabel>Note about mvp</FormLabel>
        <Textarea
          name="aboutMvp"
          placeholder="About mvp"
          variant={"outline"}
          p={"10px"}
          color={"text_lg"}
          resize={"none"}
          value={matchForm.aboutMvp || ""}
          onChange={handleOnChange}
        />
      </Field.Root>
    </Box>
  );
}

export default MatchReport;
