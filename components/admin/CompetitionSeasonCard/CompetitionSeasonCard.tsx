"use client";
import {
  Button,
  Card,
  Field,
  HStack,
  RadioGroup,
  RadioGroupValueChangeDetails,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Info from "@/components/admin/Info/Info";
import useToast from "@/hooks/useToast";
import { updateCompetitionSeason } from "@/app/_actions/competition-season-actions";
import FormLabel from "../Forms/FormLabel";

function CompetitionSeasonCard({
  competitionSeasonId,
  competitionName,
  competitionType,
  season,
  status,
  isWinner,
}: {
  competitionSeasonId: string;
  competitionName: string;
  competitionType?: string | null;
  season: string;
  status: string | null;
  isWinner: boolean | null;
}) {
  const [winnerOpt, setWinnerOpt] = useState(isWinner || false);
  const [radioVal, setRadioVal] = useState<string | null>(status === "COMPLETED" && isWinner
    ? "isBeyondLimits"
    : status === "COMPLETED" && !isWinner ? "notBeyondLimits" : null);

  const handleOnChange = (e: RadioGroupValueChangeDetails) => {
    setRadioVal(e.value);
    if (e.value === "isBeyondLimits") {
      setWinnerOpt(true);
    } else {
      setWinnerOpt(false);
    }
  };
  const { mutationPromiseToast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSetWinner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = {
      title: "Season winner updated",
      desc: `Season winner updated successfully!`,
    };
    const err = {
      title: "Error updating season winner",
      desc: `Failed to update season winner`,
    };
    const loading = {
      title: "updating season winner",
      desc: `updating season winner, please wait...`,
    };

    const formData = new FormData();
    formData.append("isWinner", JSON.stringify(winnerOpt));

    const promise = updateCompetitionSeason(
      competitionSeasonId,
      formData,
      competitionName
    );

    mutationPromiseToast(promise, success, err, loading, setIsUpdating);
  };

  return (
    <Card.Root size="md" p={"5"} border={"1px solid"} borderColor={"gray.200"}>
      <Card.Body color="fg.muted">
        <Stack
          w={"full"}
          justifyContent={"space-between"}
          flexWrap={{ base: "wrap", lg: "unset" }}
          gap={4}
        >
          <Stack borderBottom={'1px solid'} borderColor={'gray.200'} pb={'3'}>
            <Info name="Competition" value={competitionName} />
            {competitionType && (
              <Info
                name="Competition Type"
                value={competitionType.toLowerCase()}
              />
            )}
            <Info name="Season" value={season} />
            {status && <Info name="Status" value={status.toLowerCase()} />}
          </Stack>
          <Stack alignSelf={"flex-start"}>
            <form onSubmit={handleSetWinner}>
              <Stack flexWrap={{ base: "wrap", md: "unset" }} gap={2}>
                <Field.Root>
                  <FormLabel as="Text">Competition Winner</FormLabel>
                  <RadioGroup.Root
                    value={radioVal}
                    defaultValue={
                      status === "COMPLETED" && isWinner
                        ? "isBeyondLimits"
                        : "notBeyondLimits"
                    }
                    onValueChange={handleOnChange}
                  >
                    <Stack gap="2" flexWrap={{ base: "wrap", sm: "unset" }}>
                      <RadioGroup.Item
                        key={"isBeyondLimits"}
                        value={"isBeyondLimits"}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator
                          border={"1px solid"}
                          borderColor={"gray.200"}
                        />
                        <RadioGroup.ItemText>
                          {"BeyondLimits"}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                      <RadioGroup.Item
                        key={"notBeyondLimits"}
                        value={"notBeyondLimits"}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator
                          border={"1px solid"}
                          borderColor={"gray.200"}
                        />
                        <RadioGroup.ItemText>
                          {"Not BeyondLimits"}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    </Stack>
                  </RadioGroup.Root>
                </Field.Root>
                <Button
                  size={"sm"}
                  variant={"solid"}
                  colorPalette={"cyan"}
                  type="submit"
                  px={"15px"}
                  disabled={status === "PENDING" || isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}

export default CompetitionSeasonCard;
