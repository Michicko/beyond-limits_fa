"use client";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import CustomTabContent from "@/components/admin/Tabs/CustomTabContent";
import CustomTabList from "@/components/admin/Tabs/CustomTabList";
import CustomTabs from "@/components/admin/Tabs/CustomTabs";
import CustomTabTrigger from "@/components/admin/Tabs/CustomTabTrigger";
import {
  Box,
  Field,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import MatchPreview from "./MatchPreview";
import MatchReport from "./MatchReport";
import Lineup from "./Lineup";
import MatchStats from "./MatchStats";
import { Nullable } from "@/lib/definitions";
import FormBtn from "./FormBtn";
import FormLabel from "./FormLabel";
import {
  getButtonStatus,
  objectToFormData,
  updateFormDataWithJSON,
} from "@/lib/helpers";
import { JSONContent } from "@tiptap/react";
import { createMatch, updateMatch } from "@/app/_actions/match-actions";
import useToast from "@/hooks/useToast";
import { Schema } from "@/amplify/data/resource";
import MatchTeamForm from "./MatchTeamForm";
import FormContainer from "./FormContainer";

interface ICompetitionSeason {
  id: string;
  season: string;
  name: string;
  type: string;
  logo: string;
  competitionId: Nullable<string>;
  updatedAt: string;
  createdAt: string;
  cupId?: Nullable<string>;
  leagueId?: Nullable<string>;
  isWinner: Nullable<boolean>;
  status: string | null;
}

interface ICompetition {
  id: string;
  longName: string;
  competitionSeasons: ICompetitionSeason[];
}

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  homeKit: Nullable<string>;
  playerPosition: {
    shortName: string
  }
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
  | "result"
  | "venue"
  | "scorers"
  | "substitutes"
  | "time"
  | "status"
  | "competitionSeasonId"
  | "homeForm"
  | "awayForm"
>;

function MatchForm({
  match,
  competitions,
  teams,
  players,
  method,
  statuses,
}: {
  match?: IMatchI;
  competitions: ICompetition[];
  teams: { id: string; shortName: string; longName: string; logo: string }[];
  players: IPlayer[];
  method: "CREATE" | "UPDATE";
  statuses: string[];
}) {
  const stackStyles = {
    border: "1px solid gray",
    padding: "20px",
    borderRadius: "md",
  };

  const inputStyles = {
    "&::-webkit-inner-spin-button": {
      appearance: "none",
      margin: "0",
    },
    "&::-webkit-outer-spin-button": {
      appearance: "none",
      margin: "0",
    },
  };

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { errorToast, mutationToast } = useToast();
  const [editorKey, setEditorKey] = useState(230);

  const teamOptions = teams.map((team) => {
    return { label: team.longName, value: team.id };
  });

  const tabs = ["preview", "lineup", "report", "stats"];

  const resultTabs = ["report", "stats"];

  const getTeamStats = (team: "homeTeam" | "awayTeam") => {
    const teamData = match?.[team];
    return {
      id: teamData?.id || "",
      logo: teamData?.logo || "",
      shortName: teamData?.shortName || "",
      longName: teamData?.longName || "",
      goals: teamData?.goals || ("" as Nullable<string>),
      passes: teamData?.passes || ("" as Nullable<string>),
      offsides: teamData?.offsides || ("" as Nullable<string>),
      corners: teamData?.corners || ("" as Nullable<string>),
      shots: teamData?.shots || ("" as Nullable<string>),
      yellows: teamData?.yellows || ("" as Nullable<string>),
      reds: teamData?.reds || ("" as Nullable<string>),
    };
  };

  const [data, setData] = useState<IMatchI>({
    id: match?.id || "",
    competitionSeasonId: match?.competitionSeasonId || "",
    date: match?.date || "",
    time: match?.time || "",
    venue: match?.venue || "",
    status: match?.status || "UPCOMING",
    result: match?.result || null,
    keyPlayerId: match?.keyPlayerId || "",
    aboutKeyPlayer: match?.aboutKeyPlayer || "",
    mvpId: match?.mvpId || "",
    aboutMvp: match?.aboutMvp || "",
    review: match?.review
      ? JSON.parse(match.review as string)
      : ({} as JSONContent),
    report: match?.report
      ? JSON.parse(match.report as string)
      : ({} as JSONContent),
    lineup: match?.lineup || [],
    substitutes: match?.substitutes ?? [],
    coach: match?.coach
      ? {
          name: match?.coach?.name || "",
          role: match?.coach?.role || null,
        }
      : { name: "", role: null },
    homeTeam: getTeamStats("homeTeam"),
    awayTeam: getTeamStats("awayTeam"),
    scorers: match?.scorers ? JSON.parse(match.scorers as string) : [],
    homeForm: match?.homeForm || "",
    awayForm: match?.awayForm || "",
  });

  const resetForm = ()=> {
    setData({
      id: "",
      competitionSeasonId: "",
      date:"",
      time: "",
      venue: "",
      status:"UPCOMING",
      result:  null,
      keyPlayerId: "",
      aboutKeyPlayer:  "",
      mvpId: "",
      aboutMvp:  "",
      review: ({} as JSONContent),
      report:({} as JSONContent),
      lineup: [],
      substitutes: [],
      coach: { name: "", role: null },
      homeTeam: getTeamStats("homeTeam"),
      awayTeam: getTeamStats("awayTeam"),
      scorers: [],
      homeForm:  "",
      awayForm: "",
    })
    setEditorKey((prev) => prev + 4);
  }

  const selectedCompetition = match
    ? competitions.find((el) => {
        const competitionSeason = el.competitionSeasons.find(
          (comp) => comp.id === match.competitionSeasonId,
        );
        if (competitionSeason) return el;
      })
    : null;

  const [result, setResult] = useState((match && match.result) || "");

  const [competition, setCompetition] = useState<ICompetition | null>(
    selectedCompetition || null,
  );

  const competitionOptions = competitions.map((el) => {
    return {
      label: el.longName,
      value: el.id,
    };
  });

  const competitionSeasonOptions =
    competition &&
    competition.competitionSeasons.map((el) => {
      return {
        label: el.season,
        value: el.id,
      };
    });

  const handleTeam = (
    name: string,
    value: string,
    teamOption: "homeTeam" | "awayTeam",
  ) => {
    const currentTeamData = data[teamOption];

    // If both teams have been selected (i.e., they have IDs)
    if (data.homeTeam?.id && data.awayTeam?.id) {
      setData({
        ...data,
        [teamOption]: {
          ...currentTeamData,
          [name]: value,
        },
      });
      return;
    }

    // If the team is not yet fully set, fetch its full data from `teams`
    if (name === "homeTeam" || name === "awayTeam") {
      const team = teams.find((el) => el.id === value);
      if (!team) return;

      setData({
        ...data,
        [teamOption]: {
          id: team.id,
          logo: team.logo,
          shortName: team.shortName,
          longName: team.longName,
        },
      });
      return;
    }

    // Handle updating other properties if ID is not yet set
    setData({
      ...data,
      [teamOption]: {
        ...currentTeamData,
        [name]: value,
      },
    });
  };

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    if (name === "homeTeam" || name === "awayTeam") {
      handleTeam(name, value, name);
      return;
    }

    if (name === "coach" || name === "coachRole") {
      if (name === "coach") {
        setData({
          ...data,
          coach: {
            ...data.coach,
            name: value,
          },
        });
      } else if (name === "coachRole") {
        setData({
          ...data,
          coach: {
            name: data.coach?.name || "",
            role: value as "HEAD" | "ASSISTANT" | null | undefined,
          },
        });
      }
      return;
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = objectToFormData(data);
    updateFormDataWithJSON(formData, data);
    formData.delete("result");

    if (match && method === "UPDATE") {
      if (result) {
        formData.append("result", result);
      }
      startTransition(async () => {
        const res = await updateMatch(match.id, formData);
        if (res.status === "success" && res.data) {
          mutationToast(
            "Match",
            res.data.homeTeam?.longName + " vs " + res.data.awayTeam?.longName,
            "update",
          );
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      formData.delete("id");
      startTransition(async () => {
        const res = await createMatch(formData);

        if (res.status === "success" && res.data) {
          mutationToast(
            "Match",
            res.data.homeTeam?.longName + " vs " + res.data.awayTeam?.longName,
            "create",
          );
          formRef.current?.reset();
          resetForm();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
   <FormContainer>
     <form onSubmit={handleSubmit} ref={formRef}>
      <HStack justifyContent={"flex-end"} mb={4}>
        <FormBtn disabled={isPending}>
          {getButtonStatus(match, "Match", isPending)}
        </FormBtn>
      </HStack>
      <Stack
        flexDirection={{ base: "column" }}
        alignItems={"center"}
        css={stackStyles}
        mb={"5"}
        w={"full"}
      >
        {data.homeTeam && data.awayTeam && (
          <Field.Root>
            <FormLabel>Teams</FormLabel>
            <HStack w={"full"} flexDirection={{ base: "column", md: "row" }}>
              <CustomSelect
                name="homeTeam"
                description="Home Team"
                id="homeTeam"
                options={teamOptions}
                selectedValue={data.homeTeam.id}
                handleOnChange={handleOnChange}
              />
              <HStack align={"center"}>
                <Input
                  name="goals"
                  type="number"
                  css={inputStyles}
                  placeholder="-"
                  id="homeGoals"
                  variant="subtle"
                  maxW={"5"}
                  textAlign={"center"}
                  value={data.homeTeam.goals || ""}
                  onChange={(e) => {
                    handleTeam(e.target.name, e.target.value, "homeTeam");
                  }}
                />
                <Text color={"text_md"} textTransform={"uppercase"}>
                  VS
                </Text>
                <Input
                  name="goals"
                  type="number"
                  css={inputStyles}
                  placeholder="-"
                  id="awayGoals"
                  variant="subtle"
                  maxW={"5"}
                  textAlign={"center"}
                  value={data.awayTeam.goals || ""}
                  onChange={(e) => {
                    handleTeam(e.target.name, e.target.value, "awayTeam");
                  }}
                />
              </HStack>
              <CustomSelect
                name="awayTeam"
                description="Away Team"
                id="awayTeam"
                options={teamOptions}
                selectedValue={data.awayTeam.id}
                handleOnChange={handleOnChange}
              />
            </HStack>
          </Field.Root>
        )}
      </Stack>
      <Grid
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={"4"}
        css={stackStyles}
      >
        <GridItem>
          <Field.Root>
            <FormLabel>Match Day</FormLabel>
            <Input
              name="date"
              p={"0 10px"}
              placeholder="Select Date"
              type="date"
              variant={"outline"}
              color={"text_lg"}
              value={data.date}
              onChange={handleOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Match Time</FormLabel>
            <Input
              name="time"
              p={"0 10px"}
              placeholder="Select Time"
              type="time"
              variant={"outline"}
              color={"text_lg"}
              value={data.time}
              onChange={handleOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Venue</FormLabel>
            <Input
              name="venue"
              p={"0 10px"}
              placeholder="Enter venue"
              type="text"
              variant={"outline"}
              color={"text_lg"}
              value={data.venue}
              onChange={handleOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Competition</FormLabel>
            {competitions && (
              <CustomSelect
                name="competition"
                description="competition"
                options={competitionOptions}
                selectedValue={competition ? competition.id : ""}
                handleOnChange={(e: {
                  target: { name: string; value: string };
                }) => {
                  const { value } = e.target;
                  const competition = competitions.find(
                    (el) => el.id === value,
                  );
                  if (!competition) return;
                  setCompetition(competition);
                }}
              />
            )}
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Status</FormLabel>
            <CustomSelect
              name="status"
              description="status"
              options={statuses.map((el) => {
                return {
                  label: el,
                  value: el,
                };
              })}
              selectedValue={data.status || ""}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Competition Season</FormLabel>
            {competition && competitionSeasonOptions && (
              <CustomSelect
                name="competitionSeasonId"
                description="season"
                options={competitionSeasonOptions}
                selectedValue={data.competitionSeasonId as string}
                handleOnChange={handleOnChange}
              />
            )}
          </Field.Root>
        </GridItem>
        <GridItem>
          <MatchTeamForm
            value={data.homeForm ?? ""}
            team="home"
            handleOnChange={handleOnChange}
            name="homeForm"
          />
        </GridItem>
        <GridItem>
          <MatchTeamForm
            value={data.awayForm ?? ""}
            team="away"
            handleOnChange={handleOnChange}
            name="awayForm"
          />
        </GridItem>
      </Grid>
      <Box my={"5"}>
        <CustomTabs defaultValue={tabs[0]}>
          <>
            <CustomTabList>
              <>
                {tabs.map((el) => {
                  return (
                    <CustomTabTrigger
                      label={el}
                      value={el}
                      key={el}
                      disabled={resultTabs.includes(el) && method !== "UPDATE"}
                    />
                  );
                })}
              </>
            </CustomTabList>
            <CustomTabContent value={"preview"}>
              <MatchPreview
                matchForm={data}
                setMatchForm={setData}
                stackStyles={stackStyles}
                handleOnChange={handleOnChange}
                players={players}
              />
            </CustomTabContent>
            <CustomTabContent value={"report"}>
              <MatchReport
                matchForm={data}
                setMatchForm={setData}
                stackStyles={stackStyles}
                handleOnChange={handleOnChange}
                players={players}
                result={result}
                setResult={setResult}
              />
            </CustomTabContent>
            <CustomTabContent value={"lineup"}>
              <Lineup
                stackStyles={stackStyles}
                matchForm={data}
                setMatchForm={setData}
                handleOnChange={handleOnChange}
                players={players}
              />
            </CustomTabContent>
            <CustomTabContent value={"stats"}>
              <MatchStats
                stackStyles={stackStyles}
                matchForm={data}
                setMatchForm={setData}
              />
            </CustomTabContent>
          </>
        </CustomTabs>
      </Box>
    </form>
   </FormContainer>
  );
}

export default MatchForm;
