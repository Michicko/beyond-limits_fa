import React from "react";
import styles from "./MatchCard.module.css";
import Link from "next/link";

function MatchInfo({
  status,
  time,
  id
}: {
  status: string;
  time: string;
  id?: string
}) {
  return (
    <Link className={styles["match-info"]} href={`/matches/${id}/preview`}>
      <p className={styles.status}>{status}</p>
      <p className={styles.time}>{time}</p>
    </Link>
  );
}

export default MatchInfo;
