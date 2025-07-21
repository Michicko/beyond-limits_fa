import React from "react";
import clsx from "clsx";
import styles from "./Knockout.module.css";
import Logo from "../MatchCard/Logo";

function KnockoutMatchDetails({
  long_name,
  short_name,
  logo,
  goals,
  match_winner,
  win_by_penalties,
  penalty,
  status,
}: {
  long_name: string;
  short_name: string;
  logo: string;
  goals?: string;
  match_winner?: boolean;
  win_by_penalties?: boolean;
  penalty?: number | null;
  status: string;
}) {
  return (
    <div
      className={clsx(
        styles["knockout-match__team"],
        (match_winner || win_by_penalties) &&
          styles["knockout-match__team--winner"],
        !match_winner &&
          !win_by_penalties &&
          styles["knockout-match__team--loser"],
        status !== "COMPLETED" && styles["knockout-match__team--null"]
      )}
    >
      <div
        className={clsx(styles["knockout-match__team--details"])}
        title={long_name}
      >
        <abbr
          className={clsx(styles["knockout-match__code"])}
          title={long_name}
        >
          {short_name}
        </abbr>
        <p
          className={clsx(
            styles["knockout-match__code"],
            styles["knockout-match__long"]
          )}
        >
          {long_name}
        </p>
        <Logo logo={logo} name={long_name} size="sm" />
      </div>
      <div className={clsx(styles["knockout-match__score"])}>
        <span className={clsx(styles["knockout-match__penalty"])}>
          {penalty}
        </span>
        <p className={clsx(styles["knockout-match__number"])}>
          {goals ? goals : goals && +goals === 0 ? goals : "-"}
        </p>
      </div>
    </div>
  );
}

export default KnockoutMatchDetails;
