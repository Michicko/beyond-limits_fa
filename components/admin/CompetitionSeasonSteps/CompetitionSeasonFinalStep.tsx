"use client";
import { HStack, Stack, Steps } from "@chakra-ui/react";
import React, { useRef, useTransition } from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";
import FormBtn from "../Forms/FormBtn";
import useToast from "@/hooks/useToast";
import { createCompetitionSeason } from "@/app/_actions/competition-season-actions";
import { updateLeague } from "@/app/_actions/league-actions";
import { updateCup } from "@/app/_actions/cup-actions";
import { getButtonStatus } from "@/lib/helpers";

function CompetitionSeasonFinalStep({
  competitionLogo,
  competitionType,
  season,
  competitionName,
  goToNextStep,
  competitionId,
  cupId,
  leagueId,
}: {
  competitionLogo: string;
  competitionType: string | null;
  season: string;
  competitionName: string;
  goToNextStep: () => void;
  competitionId: string;
  cupId?: string;
  leagueId?: string;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { errorToast, mutationToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("season", season);
    formData.append("competitionId", competitionId);
    formData.append("status", "PENDING");
    formData.append("winner", "");
    formData.append("name", competitionName);
    formData.append("logo", competitionLogo);

    if (competitionType) {
      formData.append("type", competitionType);
    }

    if (cupId) {
      formData.append("cupId", cupId);
    }

    if (leagueId) {
      formData.append("leagueId", leagueId);
    }

    try {
      formData.delete("winner");
      startTransition(async () => {
        const res = await createCompetitionSeason(formData);
        // update cup with competition season id
        if (res.status === "success" && res.data) {
          if (cupId) {
            const cupData = new FormData();
            cupData.append("id", cupId);
            cupData.append("competitionSeasonId", res.data.id);
            await updateCup(cupData);
          }

          // update league with competition season id
          if (leagueId) {
            const leagueData = new FormData();
            leagueData.append("id", leagueId);
            leagueData.append("competitionSeasonId", res.data.id);
            await updateLeague(leagueData);
          }

          mutationToast(
            "competition season",
            res.data.name + " " + res.data.season,
            "create",
          );
          formRef.current?.reset();
          const time = setTimeout(() => {
            goToNextStep();
            return () => clearTimeout(time);
          }, 200);
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message);
      }
    }
  };

  return (
    <Steps.Content index={competitionType === "MIXED" ? 3 : 2}>
      <form onSubmit={handleSubmit}>
        <CompetitionSeasonCard title="Create Competition Season">
          <Stack gap={2} mb={"5"}>
            <CompetitionSeasonInfo label={"Name"} value={competitionName} />
            <CompetitionSeasonInfo label={"Season"} value={season} />
            {competitionType === "MIXED" ? (
              <>
                <CompetitionSeasonInfo label={"Type"} value={competitionType} />
                <CompetitionSeasonInfo label={"Main"} value={"LEAGUE"} />
                <CompetitionSeasonInfo label={"Knockout"} value={"CUP"} />
              </>
            ) : (
              <CompetitionSeasonInfo label={"Type"} value={competitionType} />
            )}
          </Stack>
          <HStack justifyContent={"flex-end"}>
            <FormBtn type="submit" disabled={isPending}>
              {getButtonStatus(null, "Competition season", isPending)}
            </FormBtn>
          </HStack>
        </CompetitionSeasonCard>
      </form>
    </Steps.Content>
  );
}

export default CompetitionSeasonFinalStep;
