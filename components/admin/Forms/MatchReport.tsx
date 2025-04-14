"use client";
import { Box, Field, HStack, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import TextEditor from "@/components/TextEditor/TextEditor";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import { JSONContent } from "@tiptap/react";
import { IMatch, IStackStyles, Nullable } from "@/lib/definitions";
import GoalScorers from "./GoalScorers";
import FormLabel from "./FormLabel";
import { Schema } from "@/amplify/data/resource";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
}

type IMatchI = Pick<
  Schema["Match"]["type"],
  | "id"
  | "aboutKeyPlayer"
  | "aboutMvp"
  | "awayTeam"
  | "homeTeam"
  | "coach"
  | "date"
  | "lineup"
  | "keyPlayerId"
  | "mvpId"
  | "report"
  | "review"
  | "venue"
  | "scorers"
  | "substitutes"
  | "time"
  | "status"
  | "competitionSeasonId"
>;

function MatchReport({
  matchForm,
  setMatchForm,
  stackStyles,
  handleOnChange,
  players,
}: {
  matchForm: IMatchI;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchI>>;
  stackStyles: IStackStyles;
  handleOnChange: (e: { target: { name: string; value: any } }) => void;
  players: IPlayer[];
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
      report: json,
    });
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Report</FormLabel>
      <GoalScorers matchForm={matchForm} setMatchForm={setMatchForm} />
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
