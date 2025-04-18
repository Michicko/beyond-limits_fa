import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Text from "../Typography/Text";

function MatchScoreBoard({
  status,
  home_score,
  away_score,
  size,
  time,
}: {
  status: string;
  home_score: number;
  away_score: number;
  size: "sm" | "md" | "lg" | "xl" | "xxl" | "iv";
  time: string;
}) {
  return (
    <div className={clsx(styles["matchscoreboard"], styles[size])}>
      {status === "UPCOMING" ? (
        <>
          <Text weight="light" size="sm">
            {time}
          </Text>
        </>
      ) : status === "FINISHED" ? (
        <>
          <p className={clsx(styles.score)}>{home_score}</p>
          <div className={clsx(styles.versus)}></div>
          <p className={clsx(styles.score)}>{away_score}</p>
        </>
      ) : status === "ABANDONED" ? (
        <>
          <p>Abandoned</p>
          <Text weight="bold" size="md">
            Abandoned
          </Text>
        </>
      ) : (
        <>
          <p>Abandoned</p>
          <Text weight="bold" size="md">
            Canceled
          </Text>
        </>
      )}
    </div>
  );
}

export default MatchScoreBoard;
