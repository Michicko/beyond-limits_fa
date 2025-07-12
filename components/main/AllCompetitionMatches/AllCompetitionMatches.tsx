"use client";
import React, { useState } from "react";
import MatchCard from "../MatchCard/MatchCard";
import Grid from "../Container/Grid";
import Calendar from "../Calendar/Calendar";
import styles from "./AllCompetitionMatches.module.css";
import clsx from "clsx";
import { Nullable } from "@/lib/definitions";
import Text from "../Typography/Text";

interface ICompetitionSeason {
  id?: string;
  logo: string;
  name: string;
  shortName?: string;
}

interface IMatch {
  id?: string;
  competitionSeasonId?: Nullable<string>;
  competitionSeason?: ICompetitionSeason;
  date: string;
  time: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELED" | "ABANDONED" | null;
  result?: "WIN" | "DRAW" | "LOSE" | null;
  homeTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  awayTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  review: string | number | boolean | object | any[] | null;
}

function AllCompetitionMatches({ matches }: { matches: IMatch[] }) {
  const date = new Date();
  const currentYear = date.getUTCFullYear();
  const currentMonth = date.getMonth();
  const years = [
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ];

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const filteredMatches = matches.filter((match) => {
    const date = new Date(match.date);
    return date.getUTCFullYear() === year && date.getUTCMonth() === month;
  });
  const [showAllMatches, setShowAllMatches] = useState(false);

  return (
    <div className={clsx(styles.container)}>
      <Calendar
        years={years}
        noUrl={true}
        currentYear={year}
        setCurrentYear={setYear}
        currentIndex={month}
        setCurrentIndex={setMonth}
      />
      {!filteredMatches || (filteredMatches && filteredMatches.length < 1) ? (
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          No Matches available at the moment.
        </Text>
      ) : (
        <Grid gap="sm">
          {filteredMatches
            .slice(0, showAllMatches ? filteredMatches.length : 4)
            .map((match) => {
              return (
                <MatchCard
                  match={match}
                  key={match.id}
                  showName={true}
                  theme="light"
                />
              );
            })}

          {filteredMatches.length > 4 && (
            <button
              onClick={() => setShowAllMatches((prev) => !prev)}
              style={{
                marginTop: "1rem",
                background: "#ffcc00",
                color: "#000",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
              }}
            >
              {showAllMatches ? "Show Less" : "Show All"}
            </button>
          )}
        </Grid>
      )}
    </div>
  );
}

export default AllCompetitionMatches;
