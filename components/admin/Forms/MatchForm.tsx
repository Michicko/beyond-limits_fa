"use client";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import CustomTabContent from "@/components/admin/Tabs/CustomTabContent";
import CustomTabList from "@/components/admin/Tabs/CustomTabList";
import CustomTabs from "@/components/admin/Tabs/CustomTabs";
import CustomTabTrigger from "@/components/admin/Tabs/CustomTabTrigger";
import {
  competitions,
  leagues,
  mixed_cups,
  teams,
} from "@/lib/placeholder-data";
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
import React, { useState } from "react";
import MatchPreview from "./MatchPreview";
import MatchReport from "./MatchReport";
import MatchRound from "./MatchRound";
import Lineup from "./Lineup";
import MatchStats from "./MatchStats";
import { IMatch, MatchResult, MatchStatus } from "@/lib/definitions";
import FormBtn from "./FormBtn";
import FormLabel from "./FormLabel";

function MatchForm({ match }: { match?: IMatch }) {
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

  const teamOptions = teams.map((team) => {
    return { label: team.longName, value: team.id };
  });

  const tabs = ["preview", "lineup", "report", "stats"];

  const [matchForm, setMatchForm] = useState<IMatch>({
    round: match?.round || "",
    competition_id: "",
    home: {
      team_id: "",
      goals: NaN,
      stats: {
        passes: NaN,
        offsides: NaN,
        corners: NaN,
        shots: NaN,
        yellows: NaN,
        reds: NaN,
      },
      penalties: NaN,
      form: "",
    },
    away: {
      team_id: "",
      goals: NaN,
      stats: {
        passes: NaN,
        offsides: NaN,
        corners: NaN,
        shots: NaN,
        yellows: NaN,
        reds: NaN,
      },
      penalties: NaN,
      form: "",
    },
    date: "",
    time: "",
    venue: "",
    status: "" as MatchStatus,
    result: "" as MatchResult,
    lineup: [] as string[],
    substitutes: [] as string[],
    coach: {
      name: "",
      role: "",
    },
    preview: {
      context: {},
      keyPlayer: "",
      aboutKeyPlayer: "",
    },
    report: {
      context: {},
      mvp: "",
      aboutMvp: "",
    },
    scorers: [
      {
        id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: "John Doe",
        time: "23",
        goalType: "normal",
        isOpponent: false,
      },
      {
        id: "2b1deb2d-3b7d-4bad-9bdd-2b0d7b3dcb6c",
        name: "Jane Doe",
        time: "43",
        goalType: "normal",
        isOpponent: true,
      },
    ],
  });

  const competitionOptions = competitions.map((el) => {
    return {
      label: el.longName,
      value: el.id,
    };
  });

  const rounds = [
    "1/128-final",
    "1/64-final",
    "1/32-final",
    "1/16-final",
    "1/8-final",
    "quaterfinal",
    "semifinal",
    "thirdplace",
    "final",
  ];

  const selectedCompetition = competitions.find(
    (competition) => competition.id === matchForm.competition_id
  );

  const selectedLeague = leagues.find(
    (league) => league.competition_id === matchForm.competition_id
  );

  const selectedMixedCup = mixed_cups.find(
    (mixedCup) => mixedCup.competition_id === matchForm.competition_id
  );

  const handleMatchTeamChange = (
    e: { target: { name: string; value: string | number } },
    team: "home" | "away"
  ) => {
    const stats = Object.keys(matchForm.home.stats);
    const { name, value } = e.target;
    if (team === "home") {
      if (stats.includes(name)) {
        setMatchForm({
          ...matchForm,
          home: {
            ...matchForm.home,
            stats: { ...matchForm.home.stats, [name]: value },
          },
        });
      } else {
        setMatchForm({
          ...matchForm,
          home: { ...matchForm.home, [name]: value },
        });
      }
    } else if (team === "away") {
      if (stats.includes(name)) {
        setMatchForm({
          ...matchForm,
          away: {
            ...matchForm.away,
            stats: { ...matchForm.away.stats, [name]: value },
          },
        });
      } else {
        setMatchForm({
          ...matchForm,
          away: { ...matchForm.away, [name]: value },
        });
      }
    }
  };

  //   const competitions = [...currentLeagues, ...currentMixedCups];
  const handleMatchFormOnChange = (e: {
    target: { name: string; value: any };
  }) => {
    const { name, value } = e.target;
    if (name === "mvp" || name === "aboutMvp") {
      setMatchForm({
        ...matchForm,
        report: { ...matchForm.report, [name]: value },
      });
    } else if (name === "keyPlayer" || name === "aboutKeyPlayer") {
      setMatchForm({
        ...matchForm,
        preview: { ...matchForm.preview, [name]: value },
      });
    } else if (name === "coach" || name === "role") {
      setMatchForm({
        ...matchForm,
        coach: { ...matchForm.coach, [name]: value },
      });
    } else {
      setMatchForm({ ...matchForm, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(matchForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack justifyContent={"flex-end"} mb={4}>
        <FormBtn>{match ? "Update Match" : "Create Match"}</FormBtn>
      </HStack>
      <Stack
        flexDirection={{ base: "column" }}
        alignItems={"center"}
        css={stackStyles}
        mb={"5"}
        w={"full"}
      >
        <Field.Root>
          <FormLabel>Teams</FormLabel>
          <HStack w={"full"} flexDirection={{ base: "column", md: "row" }}>
            <CustomSelect
              name="team_id"
              description="team"
              id="home-team"
              options={teamOptions}
              selectedValue={matchForm.home.team_id}
              handleOnChange={(e) => handleMatchTeamChange(e, "home")}
            />
            <HStack align={"center"}>
              <Input
                name="goals"
                type="number"
                css={inputStyles}
                placeholder="-"
                id="home-goals"
                variant="subtle"
                maxW={"5"}
                textAlign={"center"}
                value={matchForm.home.goals || ""}
                onChange={(e) => handleMatchTeamChange(e, "home")}
              />
              <Text color={"text_md"} textTransform={"uppercase"}>
                VS
              </Text>
              <Input
                name="goals"
                type="number"
                css={inputStyles}
                placeholder="-"
                id="away-goals"
                variant="subtle"
                maxW={"5"}
                textAlign={"center"}
                value={matchForm.away.goals || ""}
                onChange={(e) => handleMatchTeamChange(e, "away")}
              />
            </HStack>
            <CustomSelect
              name="team_id"
              description="team"
              id="away-team"
              options={teamOptions}
              selectedValue={matchForm.away.team_id}
              handleOnChange={(e) => handleMatchTeamChange(e, "away")}
            />
          </HStack>
        </Field.Root>
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
              value={matchForm.date}
              onChange={handleMatchFormOnChange}
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
              value={matchForm.time}
              onChange={handleMatchFormOnChange}
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
              value={matchForm.venue}
              onChange={handleMatchFormOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Competition</FormLabel>
            <CustomSelect
              name="competition_id"
              description="competition"
              options={competitionOptions}
              selectedValue={matchForm.competition_id}
              handleOnChange={handleMatchFormOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          <Field.Root>
            <FormLabel>Status</FormLabel>
            <CustomSelect
              name="status"
              description="status"
              options={["upcoming", "finished", "canceled", "abandoned"].map(
                (el) => {
                  return {
                    label: el,
                    value: el,
                  };
                }
              )}
              selectedValue={matchForm.status}
              handleOnChange={handleMatchFormOnChange}
            />
          </Field.Root>
        </GridItem>
        <GridItem>
          {selectedCompetition &&
            (selectedLeague ||
              (selectedMixedCup &&
                selectedMixedCup.mainStatus === "pending")) && (
              <MatchRound
                handleMatchFormOnChange={handleMatchFormOnChange}
                matchForm={matchForm}
              />
            )}
          {selectedCompetition &&
            selectedMixedCup &&
            selectedMixedCup.mainStatus === "completed" && (
              <CustomSelect
                name="round"
                description="round"
                options={rounds.map((el) => {
                  return {
                    label: el,
                    value: el,
                  };
                })}
                selectedValue={matchForm.round}
                handleOnChange={handleMatchFormOnChange}
              />
            )}
        </GridItem>
      </Grid>
      <Box my={"5"}>
        <CustomTabs defaultValue={tabs[0]}>
          <>
            <CustomTabList>
              <>
                {tabs.map((el) => {
                  return <CustomTabTrigger label={el} value={el} key={el} />;
                })}
              </>
            </CustomTabList>
            <CustomTabContent value={"preview"}>
              <MatchPreview
                matchForm={matchForm}
                setMatchForm={setMatchForm}
                stackStyles={stackStyles}
                handleOnChange={handleMatchFormOnChange}
                handleMatchTeamChange={handleMatchTeamChange}
              />
            </CustomTabContent>
            <CustomTabContent value={"report"}>
              <MatchReport
                matchForm={matchForm}
                setMatchForm={setMatchForm}
                stackStyles={stackStyles}
                handleOnChange={handleMatchFormOnChange}
              />
            </CustomTabContent>
            <CustomTabContent value={"lineup"}>
              <Lineup
                stackStyles={stackStyles}
                matchForm={matchForm}
                setMatchForm={setMatchForm}
                handleMatchFormOnChange={handleMatchFormOnChange}
              />
            </CustomTabContent>
            <CustomTabContent value={"stats"}>
              <MatchStats
                stackStyles={stackStyles}
                matchForm={matchForm}
                handleMatchTeamChange={handleMatchTeamChange}
              />
            </CustomTabContent>
          </>
        </CustomTabs>
      </Box>
    </form>
  );
}

export default MatchForm;
