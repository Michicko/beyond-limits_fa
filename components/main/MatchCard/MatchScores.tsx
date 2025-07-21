import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Text from "../Typography/Text";
import { formatTime } from "@/lib/helpers";
import { Nullable } from "@/lib/definitions";

function MatchScores({
  status,
  home_score,
  home_penalty,
  away_score,
  away_penalty,
  size,
  time,
}: {
  status: string;
  home_score: string;
  home_penalty?: Nullable<string>;
  away_score: string;
  away_penalty?: Nullable<string>;
  size: "sm" | "md" | "lg" | "xl" | "xxl" | "iv" | "v";
  time: string;
}) {
  return (
    <div className={clsx(styles["matchscores"], styles[size])}>
      {status === "UPCOMING" ? (
        <Text weight="light" size="sm">
          {formatTime(time)}
        </Text>
      ) : status === "COMPLETED" ? (
        <>
          <p className={clsx(styles.score)}>
            <span className={clsx(styles.penalty, styles.home)}>
              {home_penalty}
            </span>
            {home_score}
          </p>
          <div className={clsx(styles.versus)}></div>
          <p className={clsx(styles.score)}>
            {away_score}{" "}
            <span className={clsx(styles.penalty, styles.away)}>
              {away_penalty}
            </span>
          </p>
        </>
      ) : status === "ABANDONED" ? (
        <Text weight="bold" size="md">
          Abandoned
        </Text>
      ) : (
        <Text weight="bold" size="md">
          Canceled
        </Text>
      )}
    </div>
  );
}

export default MatchScores;
