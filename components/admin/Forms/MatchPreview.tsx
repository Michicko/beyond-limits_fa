"use client";
import { Box, Field, SimpleGrid, Textarea } from "@chakra-ui/react";
import React from "react";
import TextEditor from "../TextEditor/TextEditor";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { players } from "@/lib/placeholder-data";
import { JSONContent } from "@tiptap/react";
import { IMatch, IStackStyles } from "@/lib/definitions";
import MatchTeamForm from "./MatchTeamForm";
import FormLabel from "./FormLabel";

function MatchPreview({
  matchForm,
  setMatchForm,
  stackStyles,
  handleOnChange,
  handleMatchTeamChange,
}: {
  matchForm: IMatch;
  setMatchForm: React.Dispatch<React.SetStateAction<IMatch>>;
  stackStyles: IStackStyles;
  handleOnChange: (e: { target: { name: string; value: any } }) => void;
  handleMatchTeamChange: (
    e: { target: { name: string; value: any } },
    team: "home" | "away"
  ) => void;
}) {
  const playerOptions = players.map((player) => {
    return {
      label: `${player.firstname} ${player.lastname}`,
      value: player.id,
    };
  });

  const handlePreviewContext = (json: JSONContent) => {
    setMatchForm({
      ...matchForm,
      preview: { ...matchForm.preview, context: json },
    });
  };

  return (
    <Box css={stackStyles} my={"5"}>
      <FormLabel as="Text">Preview</FormLabel>
      <SimpleGrid gap={4} mb={5} columns={{ base: 1, md: 2 }}>
        <MatchTeamForm
          team={"home"}
          value={matchForm.home.form}
          handleOnChange={handleMatchTeamChange}
        />
        <MatchTeamForm
          team={"away"}
          value={matchForm.away.form}
          handleOnChange={handleMatchTeamChange}
        />
      </SimpleGrid>
      <Field.Root mb={"5"} w={"full"}>
        <FormLabel>Match Context</FormLabel>
        <TextEditor
          content={matchForm.preview.context}
          handleOnUpdate={handlePreviewContext}
        />
      </Field.Root>
      <Field.Root mb={"5"}>
        <FormLabel>key player</FormLabel>
        <CustomSelect
          name="keyPlayer"
          description="key player"
          options={playerOptions}
          selectedValue={matchForm.preview.keyPlayer || ""}
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
          onChange={handleOnChange}
        />
      </Field.Root>
    </Box>
  );
}

export default MatchPreview;
