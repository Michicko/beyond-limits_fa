import React from "react";
import styles from "./MatchCard.module.css";
import Image from "next/image";
import clsx from "clsx";

function MatchTeam({
  team,
  name,
  logo,
  showName,
}: {
  team: "home" | "away";
  name: string;
  logo: string;
  showName?: boolean;
}) {
  return (
    <div
      className={clsx(
        styles["match-team"],
        styles[team],
        showName && styles["show-name"]
      )}
      title={name}
    >
      <div className={styles["logo-bg"]}>
        <Image src={logo} height={40} width={40} alt={name} />
      </div>
      <p className={styles["team-name"]}>
        {name} ({team.substring(0, 1).toUpperCase()})
      </p>
    </div>
  );
}

export default MatchTeam;
