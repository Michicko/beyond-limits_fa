"use client";
import CheckBox from "@/components/CheckBox/CheckBox";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import MatchScoreTime from "@/components/main/MatchCard/MatchScoreTime";
import { IMatch, IMatchScorer } from "@/lib/definitions";
import { getIcon } from "@/lib/icons";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FormLabel from "./FormLabel";

function GoalScorers({
  matchForm,
  setMatchForm,
}: {
  matchForm: IMatch;
  setMatchForm: any;
}) {
  const [scorer, setScorer] = useState<IMatchScorer>({
    id: "",
    name: "",
    time: "",
    goalType: "",
    isOpponent: false,
  });

  const clearScorer = () => {
    setScorer({
      id: "",
      name: "",
      time: "",
      goalType: "",
      isOpponent: false,
    });
  };

  const handleScorerOnChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setScorer({ ...scorer, [name]: value });
  };

  const addScorer = () => {
    const newScorer = { ...scorer, id: uuidv4() };
    const tempScorers = [...matchForm.scorers, newScorer];
    setMatchForm({ ...matchForm, scorers: tempScorers });
    clearScorer();
  };

  const removeScorer = (id: string) => {
    const tempScorers = matchForm.scorers.filter((scorer) => scorer.id !== id);
    setMatchForm({ ...matchForm, scorers: tempScorers });
  };

  return (
    <Box mb={"5"} w={"full"}>
      <FormLabel as="Text">Goal Scorers</FormLabel>
      <Grid
        gap={"4"}
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        mb={6}
      >
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field.Root mb={"1"}>
            <FormLabel>Scorer name</FormLabel>
            <Input
              name="name"
              p={"0 10px"}
              placeholder="Goal scorer"
              type="text"
              variant={"outline"}
              color={"text_lg"}
              mb={"1"}
              value={scorer.name}
              onChange={handleScorerOnChange}
            />
            <Field.HelperText fontSize={"smaller"} color={"text_base"}>
              Enter scorer name e.g John doe
            </Field.HelperText>
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root mb={"1"}>
            <FormLabel>Time</FormLabel>
            <Input
              name="time"
              p={"0 10px"}
              placeholder="Time"
              type="text"
              variant={"outline"}
              color={"text_lg"}
              mb={"1"}
              value={scorer.time}
              onChange={handleScorerOnChange}
            />
            <Field.HelperText fontSize={"smaller"} color={"text_base"}>
              Enter time e.g 5th
            </Field.HelperText>
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root mb={"1"}>
            <FormLabel>Goal Type</FormLabel>
            <CustomSelect
              name="goalType"
              description="goal type"
              options={["normal", "owngoal", "penalty"].map((el) => {
                return {
                  label: el,
                  value: el,
                };
              })}
              selectedValue={scorer.goalType}
              handleOnChange={handleScorerOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field.Root>
            <CheckBox
              name={"isOpponent"}
              checked={scorer.isOpponent}
              size="xs"
              label="Is Opponent"
              onCheckedChange={(e) => {
                setScorer({ ...scorer, isOpponent: e.checked });
              }}
              showLabel={true}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Button
            type="button"
            variant={"outline"}
            px={"4"}
            onClick={addScorer}
          >
            Add Scorer
          </Button>
        </GridItem>
      </Grid>
      <HStack mt={"12"} flexWrap={"wrap"} columnGap={"6"} rowGap={"8"}>
        {matchForm.scorers.map((scorer) => {
          return (
            <Flex
              flexDirection={"column"}
              key={scorer.name}
              shadow={"sm"}
              p={"2"}
              borderRadius={"sm"}
              position={"relative"}
            >
              <IconButton
                bg={"error"}
                color={"white"}
                size={"2xs"}
                alignSelf={"flex-end"}
                position={"absolute"}
                right={"-15px"}
                top={"-18px"}
                cursor={"pointer"}
                onClick={() => removeScorer(scorer.id)}
              >
                {getIcon("close")}
              </IconButton>
              <HStack alignItems={"center"} gap={3} mb={"1"}>
                <Text fontSize={"sm"} fontWeight={"500"}>
                  {scorer.name}
                </Text>
                <MatchScoreTime time={scorer.time} theme="dark" />
              </HStack>
              <HStack gap={"2"}>
                <Text fontSize={"12px"} color={"primary"}>
                  {scorer.goalType}
                </Text>
                {scorer.isOpponent && (
                  <Text fontSize={"12px"} color={"secondary"}>
                    (opponent)
                  </Text>
                )}
              </HStack>
            </Flex>
          );
        })}
      </HStack>
      <Separator
        my={"5"}
        height={"1px"}
        variant={"solid"}
        colorPalette={"gray"}
        bg={"gray"}
      />
    </Box>
  );
}

export default GoalScorers;
