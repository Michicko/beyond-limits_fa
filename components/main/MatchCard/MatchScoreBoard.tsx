import React from "react";
import styles from "./MatchCard.module.css";
import Link from "next/link";
import { Nullable } from "@/lib/definitions";
import clsx from "clsx";

function MatchScoreBoard({
  homeScore,
  awayScore,
  url,
  homePenalty,
  awayPenalty,
}: {
  homeScore: number | string;
  awayScore: number | string;
  url: string;
  homePenalty?: Nullable<string>;
  awayPenalty?: Nullable<string>;
}) {
  return (
    <Link href={url} className={styles["matchscoreboard"]}>
      <p className={styles.score}>
        <span
          className={clsx(styles.penalty, styles.home, styles["score-pena"])}
        >
          {homePenalty}
        </span>
        {homeScore}
      </p>
      <span className={styles["v-sep"]}></span>
      <p className={styles.score}>
        <span
          className={clsx(styles.penalty, styles.away, styles["score-pena"])}
        >
          {awayPenalty}
        </span>
        {awayScore}
      </p>
    </Link>
  );
}

export default MatchScoreBoard;
