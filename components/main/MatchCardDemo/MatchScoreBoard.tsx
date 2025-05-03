import React from "react";
import styles from "./MatchCard.module.css";
import Link from "next/link";

function MatchScoreBoard({
  homeScore,
  awayScore,
  url,
}: {
  homeScore: number | string;
  awayScore: number | string;
  url: string;
}) {
  return (
    <Link href={url} className={styles["matchscoreboard"]}>
      <p className={styles.score}>{homeScore}</p>
      <span className={styles["v-sep"]}></span>
      <p className={styles.score}>{awayScore}</p>
    </Link>
  );
}

export default MatchScoreBoard;
