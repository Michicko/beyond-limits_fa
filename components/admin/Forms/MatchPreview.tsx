"use client";
import { Box, Field, SimpleGrid, Textarea } from "@chakra-ui/react";
import React from "react";
import TextEditor from "@/components/TextEditor/TextEditor";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import { JSONContent } from "@tiptap/react";
import { IMatch, IStackStyles, Nullable } from "@/lib/definitions";
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

function MatchPreview({
  matchForm,
  setMatchForm,
  stackStyles,
  handleOnChange,
  players,
}: {
  matchForm: IMatchI;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatchI>>;
  stackStyles: IStackStyles;
  players: IPlayer[];
  handleOnChange: (e: { target: { name: string; value: any } }) => void;
}) {
  const playerOptions = players.map((player) => {
    return {
      label: `${player.firstname} ${player.lastname}`,
      value: player.id,
    };
  });

  const handleReview = (json: JSONContent) => {
    setMatchForm({
      ...matchForm,
      review: json,
    });
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Preview</FormLabel>
      <Field.Root mb={"5"} w={"full"}>
        <FormLabel>Match Context</FormLabel>
        <TextEditor
          content={matchForm.review as string}
          handleOnUpdate={handleReview}
        />
      </Field.Root>
      <Field.Root mb={"5"}>
        <FormLabel>key player</FormLabel>
        <CustomSelect
          name="keyPlayerId"
          description="key player"
          options={playerOptions}
          selectedValue={matchForm.keyPlayerId || ""}
          handleOnChange={handleOnChange}
          fixedWidth={true}
        />
      </Field.Root>
      <Field.Root>
        <FormLabel>Note about key player</FormLabel>
        <Textarea
          name="aboutKeyPlayer"
          placeholder="About Key player"
          variant={"outline"}
          p={"10px"}
          color={"text_lg"}
          resize={"none"}
          value={matchForm.aboutKeyPlayer || ""}
          onChange={handleOnChange}
        />
      </Field.Root>
    </Box>
  );
}

export default MatchPreview;
