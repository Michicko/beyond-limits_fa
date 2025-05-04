"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import FormDialog from "../FormDialog/FormDialog";
import { Box, Field, HStack, Stack } from "@chakra-ui/react";
import CustomSelect from "../CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { getButtonStatus, objectToFormData } from "@/lib/helpers";
import useToast from "@/hooks/useToast";
import FormInput from "../FormInput/FormInput";
import CreateButton from "@/components/Buttons/CreateButton";
import { Nullable } from "@/lib/definitions";
import {
  createCompetitionSeason,
  updateCompetitionSeason,
} from "@/app/_actions/competition-season-actions";
import TeamSelector from "../TeamSelector/TeamSelector";
import CheckBox from "../CheckBox/CheckBox";

interface ICompetition {
  id: string;
  longName: string;
  type: "LEAGUE" | "CUP" | "MIXED" | null;
  logo: string;
}

interface ITeam {
  id: string;
  logo: string;
  longName: string;
}

interface IFormat {
  groupStage: boolean;
  playOff: boolean;
}

interface ICompetitionSeason {
  id?: string;
  season: string;
  startingYear?: Nullable<number>;
  name: string;
  type: "LEAGUE" | "CUP" | "MIXED" | null;
  logo: string;
  competitionId: string;
  isWinner?: boolean | null;
  status?: "PENDING" | "COMPLETED" | null;
  teamIds?: Nullable<string>[] | null;
  format?: IFormat | null;
  groupStageEnded?: boolean | null;
}

function CompetitionSeasonFormDialog({
  dbCompetitionSeason,
  teams,
  competition,
  openForm,
  setOpenForm,
  isEditing,
  setIsEditing,
}: {
  competition: ICompetition;
  teams: ITeam[];
  dbCompetitionSeason?: ICompetitionSeason | null;
  openForm?: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [competitionSeason, setCompetitionSeason] = useState({
    id: "",
    season: "",
    startingYear: NaN,
    name: competition.longName,
    type: competition.type,
    logo: competition.logo,
    competitionId: competition.id,
    isWinner: false,
    status: dbCompetitionSeason?.status || "",
    teamIds: [],
    format: {
      groupStage: false,
      playOff: false,
    },
    groupStageEnded: false,
  });

  const resetOpenForm = () => {
    setIsEditing(false);
    setCompetitionSeason({
      id: "",
      season: "",
      startingYear: NaN,
      name: competition.longName,
      type: competition.type,
      logo: competition.logo,
      competitionId: competition.id,
      isWinner: false,
      status: "",
      teamIds: [],
      format: {
        groupStage: false,
        playOff: false,
      },
      groupStageEnded: false,
    });
    setSelectedTeams([]);
    if (!openForm) {
      setOpenForm(true);
    }
  };

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();
  const onChange = (e: { target: { name: string; value: string } }) => {
    let { name, value } = e.target;
    if (name === "startingYear") {
      setCompetitionSeason({
        ...competitionSeason,
        startingYear: value === "" ? NaN : Number(value),
      });
      return;
    }
    setCompetitionSeason({ ...competitionSeason, [name]: value.toLowerCase() });
  };

  const [selectedTeams, setSelectedTeams] = useState<string[] | []>(
    competitionSeason.teamIds || []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = objectToFormData(competitionSeason);
    formData.append("format", JSON.stringify(competitionSeason.format));
    formData.append("teamIds", JSON.stringify(selectedTeams));

    if (isEditing) {
      const data = Array.from(formData.entries(), ([k, v]) => [k, v]);
      console.log(data);
      startTransition(async () => {
        const res = await updateCompetitionSeason(
          competitionSeason.id,
          formData,
          competitionSeason.season
        );
        if (res.status === "success" && res.data) {
          mutationToast("competition season", res.data.name, "update");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      formData.delete("id");
      const data = Array.from(formData.entries(), ([k, v]) => [k, v]);
      console.log(data);
      startTransition(async () => {
        const res = await createCompetitionSeason(formData);
        if (res.status === "success" && res.data) {
          mutationToast("competition season", res.data.name, "create");
          resetOpenForm();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  useEffect(() => {
    if (dbCompetitionSeason) {
      console.log(dbCompetitionSeason);
      setCompetitionSeason({
        id: dbCompetitionSeason.id || "",
        season: dbCompetitionSeason.season,
        startingYear: dbCompetitionSeason.startingYear || NaN,
        name: dbCompetitionSeason.name || "",
        type: dbCompetitionSeason.type,
        logo: dbCompetitionSeason.logo || "",
        competitionId: dbCompetitionSeason.competitionId || "",
        isWinner: dbCompetitionSeason.isWinner || false,
        status: dbCompetitionSeason.status || "",
        teamIds: (dbCompetitionSeason.teamIds as []) || [],
        format: {
          groupStage: dbCompetitionSeason.format?.groupStage || false,
          playOff: dbCompetitionSeason.format?.playOff || false,
        },
        groupStageEnded: dbCompetitionSeason.groupStageEnded || false,
      });
      setSelectedTeams(
        (dbCompetitionSeason.teamIds ?? []).filter((id): id is string =>
          Boolean(id)
        )
      );
    }
  }, [dbCompetitionSeason]);

  return (
    <HStack justify={"flex-end"} mb={"20px"} gap="2">
      <FormDialog
        btn={
          <CreateButton
            text="Create Competition"
            onClick={resetOpenForm}
            type="btn"
          />
        }
        scrollable={true}
        name="Competition Season"
        openForm={openForm}
        setOpenForm={setOpenForm}
      >
        <form ref={formRef} onSubmit={handleSubmit}>
          <Stack gap="2">
            <FormInput
              label={"season"}
              placeholder={"Enter season"}
              name={"season"}
              value={competitionSeason.season}
              id={"season"}
              onChange={onChange}
              description={"Enter short name e.g 2024/2025"}
            />
            <FormInput
              label={"startingYear"}
              placeholder={"Enter starting year"}
              name={"startingYear"}
              value={
                Number.isFinite(competitionSeason.startingYear)
                  ? String(competitionSeason.startingYear)
                  : ""
              }
              id={"startingYear"}
              onChange={onChange}
              description={"Enter starting year e.g 2024"}
            />
            <Field.Root>
              <Field.Label color={"text_lg"}>Status</Field.Label>
              <CustomSelect
                options={["PENDING", "COMPLETED"].map((el) => {
                  return {
                    label: el,
                    value: el,
                  };
                })}
                name="status"
                description="status"
                selectedValue={competitionSeason.status}
                handleOnChange={(e) =>
                  setCompetitionSeason({
                    ...competitionSeason,
                    status: e.target.value,
                  })
                }
              />
            </Field.Root>
            {(competitionSeason.type === "LEAGUE" ||
              competitionSeason.type === "MIXED") && (
              <TeamSelector
                teams={teams}
                selectedTeams={selectedTeams}
                setSelectedTeams={setSelectedTeams}
              />
            )}
            <Box>
              <CheckBox
                name={"groupStage"}
                checked={competitionSeason.format.groupStage}
                size="xs"
                label={"GroupStage"}
                onCheckedChange={(e) =>
                  setCompetitionSeason({
                    ...competitionSeason,
                    format: {
                      ...competitionSeason.format,
                      groupStage: e.checked,
                    },
                  })
                }
                showLabel={true}
              />
              <CheckBox
                name={"playOff"}
                checked={competitionSeason.format.playOff}
                size="xs"
                label={"playOff"}
                onCheckedChange={(e) =>
                  setCompetitionSeason({
                    ...competitionSeason,
                    format: { ...competitionSeason.format, playOff: e.checked },
                  })
                }
                showLabel={true}
              />
              <CheckBox
                name={"groupStageEnded"}
                checked={competitionSeason.groupStageEnded}
                size="xs"
                label={"Groupstage completed"}
                onCheckedChange={(e) =>
                  setCompetitionSeason({
                    ...competitionSeason,
                    groupStageEnded: e.checked,
                  })
                }
                showLabel={true}
              />
              <CheckBox
                name={"isWinner"}
                checked={competitionSeason.isWinner}
                size="xs"
                label={"Winner (Beyond Limits)"}
                onCheckedChange={(e) =>
                  setCompetitionSeason({
                    ...competitionSeason,
                    isWinner: e.checked,
                  })
                }
                showLabel={true}
              />
            </Box>
            <FormBtn disabled={isPending}>
              {getButtonStatus(isEditing, "Season", isPending)}
            </FormBtn>
          </Stack>
        </form>
      </FormDialog>
    </HStack>
  );
}

export default CompetitionSeasonFormDialog;
