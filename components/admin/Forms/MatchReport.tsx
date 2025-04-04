"use client";
import { Box, Field, HStack, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import TextEditor from "../TextEditor/TextEditor";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { players } from "@/lib/placeholder-data";
import { JSONContent } from "@tiptap/react";
import { IMatch, IStackStyles } from "@/lib/definitions";
import GoalScorers from "./GoalScorers";
import FormLabel from "./FormLabel";

function MatchReport({
  matchForm,
  setMatchForm,
  stackStyles,
  handleOnChange,
}: {
  matchForm: IMatch;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatch>>;
  stackStyles: IStackStyles;
  handleOnChange: (e: {
    target: { name: string; value: string | number };
  }) => void;
}) {
  const playerOptions = players.map((player) => {
    return {
      label: `${player.firstname} ${player.lastname}`,
      value: player.id,
    };
  });

  const handleReportContext = (json: JSONContent) => {
    setMatchForm({
      ...matchForm,
      report: { ...matchForm.report, context: json },
    });
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Report</FormLabel>
      <GoalScorers matchForm={matchForm} setMatchForm={setMatchForm} />
      <Field.Root mb={"5"} w={"full"}>
        <FormLabel>Match Context</FormLabel>
        <TextEditor
          content={matchForm.report.context}
          handleOnUpdate={handleReportContext}
        />
      </Field.Root>
      <Field.Root mb={"5"}>
        <FormLabel>Mvp</FormLabel>
        <CustomSelect
          name="mvp"
          description="man of the match"
          options={playerOptions}
          selectedValue={matchForm.report.mvp || ""}
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
          value={matchForm.report.aboutMvp}
          onChange={handleOnChange}
        />
      </Field.Root>
    </Box>
  );
}

export default MatchReport;
