"use client";
import { HStack, Stack, Steps } from "@chakra-ui/react";
import React, { useRef, useTransition } from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";
import FormBtn from "../Forms/FormBtn";
import { createCup } from "@/app/_actions/cup-actions";
import useToast from "@/hooks/useToast";
import { getButtonStatus } from "@/lib/helpers";

function CupContent({
  competitionName,
  season,
  index,
  setCupId,
  goToNextStep,
}: {
  competitionName: string;
  season: string;
  index: number;
  setCupId: React.Dispatch<React.SetStateAction<string>>;
  goToNextStep: () => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { errorToast, mutationToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("competitionNameSeason", competitionName + " " + season);
    formData.append("status", "PENDING");

    startTransition(async () => {
      const res = await createCup(formData);

      if (res.status === "success" && res.data) {
        mutationToast("cup", res.data.competitionNameSeason, "create");
        formRef.current?.reset();
        setCupId(res.data.id);
        const time = setTimeout(() => {
          goToNextStep();
          return () => clearTimeout(time);
        }, 200);
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
  };

  return (
    <Steps.Content index={index}>
      <form onSubmit={handleSubmit}>
        <CompetitionSeasonCard title={`Create Cup`}>
          <Stack gap={2} mb={"5"}>
            <CompetitionSeasonInfo label={"Name"} value={competitionName} />
            <CompetitionSeasonInfo label={"Season"} value={season} />
          </Stack>
          <HStack justifyContent={"flex-end"}>
            <FormBtn type="submit" disabled={isPending}>
              {getButtonStatus(null, "Cup", isPending)}
            </FormBtn>
          </HStack>
        </CompetitionSeasonCard>
      </form>
    </Steps.Content>
  );
}

export default CupContent;
