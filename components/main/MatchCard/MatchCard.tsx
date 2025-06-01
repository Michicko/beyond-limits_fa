import React from "react";
import styles from "./MatchCard.module.css";
import Image from "next/image";
import MatchTeam from "./MatchTeam";
import MatchInfo from "./MatchInfo";
import MatchScoreBoard from "./MatchScoreBoard";
import {
  formatTime,
  getFirstLetter,
  isLessThan24HoursAgo,
} from "@/lib/helpers";
import clsx from "clsx";
import { Nullable } from "@/lib/definitions";
import Link from "next/link";
import moment from "moment";

interface ICompetitionSeason {
  id?: string;
  logo: string;
  name: string;
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

function MatchCard({
  match,
  fixedHeight,
  theme,
  showName,
}: {
  match: IMatch;
  fixedHeight?: boolean;
  theme: "light" | "dark";
  showName?: boolean;
}) {
  return (
    <div
      className={clsx(styles.matchcard, theme ? styles[theme] : styles.light)}
    >
      <div className={styles.header}>
        <div className={styles["header-box"]}>
          <Image
            src={match.competitionSeason?.logo ?? ""}
            height={200}
            width={200}
            alt={match.competitionSeason?.name ?? ""}
          />
          <p className={clsx(styles["header-text"])}>
            {getFirstLetter(match.competitionSeason?.name ?? "").toUpperCase()}
          </p>
        </div>
        <div className={styles["header-box"]}>
          <p className={clsx(styles["header-text"], styles.date)}>
            {moment(match.date).format('ll')}
          </p>
        </div>
      </div>
      <div className={clsx(styles.body, fixedHeight && styles["fixed-height"])}>
        <MatchTeam
          team="home"
          name={match.homeTeam?.longName ?? ""}
          logo={match.homeTeam?.logo ?? ""}
          showName={showName}
        />

        {match.status === "UPCOMING" &&
          !isLessThan24HoursAgo(match.date) && (
            <MatchInfo
              id={match.id}
              status={match.status}
              time={formatTime(match.time)}
            />
          )}

        {match.status === "UPCOMING" &&
          match.review &&
          isLessThan24HoursAgo(match.date) && (
            <div className={clsx(styles["preview-box"])}>
              <Link
                href={`/matches/${match.id}/preview`}
                className={clsx(styles.preview)}
              >
                preview
              </Link>
              <p className={styles.time}>{formatTime(match.time)}</p>
            </div>
          )}

        {(match.status === "CANCELED" || match.status === "ABANDONED") && (
          <div className={styles["match-status"]}>
            <span className={styles["v-sep"]}></span>
            <span className={styles["ex-status"]}>{match.status}</span>
          </div>
        )}
        {match.status === "COMPLETED" && (
          <MatchScoreBoard
            homeScore={match.homeTeam?.goals ?? ""}
            awayScore={match.awayTeam?.goals ?? ""}
            url={`/matches/${match.id}/report`}
          />
        )}
        <MatchTeam
          team="away"
          name={match.awayTeam?.longName ?? ""}
          logo={match.awayTeam?.logo ?? ""}
          showName={showName}
        />
      </div>
    </div>
  );
}

export default MatchCard;
