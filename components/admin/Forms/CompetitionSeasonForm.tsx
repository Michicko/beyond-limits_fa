"use client";
import { Schema } from "@/amplify/data/resource";
import {
  createCompetitionSeason,
  updateCompetitionSeason,
} from "@/app/_actions/competition-season-actions";
import useToast from "@/hooks/useToast";
import { Field, Stack } from "@chakra-ui/react";
import { useRef, useState, useTransition } from "react";
import FormLabel from "./FormLabel";
import CustomSelect from "../CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { getButtonStatus } from "@/lib/helpers";

type ICompetitionSeason = Pick<
  Schema["CompetitionSeason"]["type"],
  "id" | "season" | "status" | "winner" | "competitionId"
>;
type ITeam = Pick<Schema["Team"]["type"], "id" | "logo" | "longName">;
type ISeason = Pick<Schema["Season"]["type"], "id" | "season">;

function CompetitionSeasonForm({
  competitionId,
  competitionSeason,
  teams,
  seasons,
  statuses,
}: {
  competitionId: string;
  competitionSeason?: ICompetitionSeason | null;
  teams: ITeam[];
  seasons: ISeason[];
  statuses: string[];
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const [tempData, setTempData] = useState({
    season: competitionSeason?.season || "",
    competitionId,
    status: competitionSeason?.status || "PENDING",
    winner: competitionSeason?.winner || "",
  });

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("winner");
    formData.append("competitionId", tempData.competitionId);

    if (competitionSeason) {
      startTransition(async () => {
        const res = await updateCompetitionSeason(
          competitionSeason.id,
          formData,
          competitionSeason.season
        );
        if (res.status === "success" && res.data) {
          mutationToast("season", res.data.season, "update");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      startTransition(async () => {
        const res = await createCompetitionSeason(formData);
        if (res.status === "success" && res.data) {
          mutationToast("season", res.data.season, "create");
          formRef.current?.reset();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap="4">
        <Field.Root required>
          <FormLabel>Competition Season</FormLabel>
          <CustomSelect
            options={seasons.map((el) => {
              return {
                label: el.season,
                value: el.season,
              };
            })}
            name="season"
            description="season"
            selectedValue={tempData.season}
            handleOnChange={handleOnChange}
          />
        </Field.Root>
        <Field.Root required>
          <FormLabel>Season Status</FormLabel>
          <CustomSelect
            options={statuses.map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
            name="status"
            description="status"
            selectedValue={tempData.status}
            handleOnChange={handleOnChange}
          />
        </Field.Root>
        <FormBtn disabled={isPending}>
          {getButtonStatus(competitionSeason, "Competition season", isPending)}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default CompetitionSeasonForm;
