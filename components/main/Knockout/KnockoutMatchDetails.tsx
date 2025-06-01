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
}: // win_by_penalties,
{
  long_name: string;
  short_name: string;
  logo: string;
  goals?: string;
  match_winner?: boolean;
  // win_by_penalties?: boolean;
}) {
  return (
    <div
      className={clsx(
        styles["knockout-match__team"],
        // match_winner || win_by_penalties
        //   ? styles["knockout-match__team--winner"]
        //   : !goals && +goals !== 0
        //   ? styles["knockout-match__team--null"]
        //   : styles["knockout-match__team--loser"]
        match_winner
          ? styles["knockout-match__team--winner"]
          : !goals || +goals !== 0
          ? styles["knockout-match__team--null"]
          : styles["knockout-match__team--loser"]
      )}
    >
      <div className={clsx(styles["knockout-match__team--details"])}>
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
        <span className={clsx(styles["knockout-match__number"])}>
          {goals && +goals === 0 ? goals : "-"}
        </span>
      </div>
    </div>
  );
}

export default KnockoutMatchDetails;
