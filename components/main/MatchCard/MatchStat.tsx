import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import calcWidth from "@/lib/calcWidth";

function MatchStat({
  home,
  away,
  stat,
}: {
  home: number;
  away: number;
  stat: string;
}) {
  const scale = home === away ? "equal" : "";

  return (
    <div className={clsx(styles["match-stat"])}>
      <p className={clsx(styles[scale], home > away && styles.greater)}>
        {home}
        <span
          className={clsx(
            styles.line,
            styles.home,
            styles[scale],
            home > away && styles.greater,
            away > home && styles.less
          )}
          style={{
            width: `${home + away === 0 ? 0 : calcWidth(home + away, home)}%`,
          }}
        ></span>
      </p>
      <p>{stat}</p>
      <p className={clsx(styles[scale])}>
        {away}
        <span
          className={clsx(
            styles.line,
            styles.away,
            styles[scale],
            away > home && styles.greater,
            home > away && styles.less
          )}
          style={{
            width: `${home + away === 0 ? 0 : calcWidth(home + away, away)}%`,
          }}
        ></span>
      </p>
    </div>
  );
}

export default MatchStat;
