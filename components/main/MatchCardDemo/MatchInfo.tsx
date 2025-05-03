import React from "react";
import styles from "./MatchCard.module.css";

function MatchInfo({
  status,
  date,
  time,
}: {
  status: string;
  date: string;
  time: string;
}) {
  return (
    <div className={styles["match-info"]}>
      <p className={styles.status}>{status}</p>
      <p className={styles.date}>{date}</p>
      <p className={styles.time}>{time}</p>
    </div>
  );
}

export default MatchInfo;
