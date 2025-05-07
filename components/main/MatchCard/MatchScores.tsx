import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Text from "../Typography/Text";
import { formatTime } from "@/lib/helpers";

function MatchScores({
  status,
  home_score,
  away_score,
  size,
  time,
}: {
  status: string;
  home_score: string;
  away_score: string;
  size: "sm" | "md" | "lg" | "xl" | "xxl" | "iv" | 'v';
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
          <p className={clsx(styles.score)}>{home_score}</p>
          <div className={clsx(styles.versus)}></div>
          <p className={clsx(styles.score)}>{away_score}</p>
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