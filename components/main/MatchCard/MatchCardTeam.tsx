import React from "react";
import Logo from "./Logo";
import Text from "../Typography/Text";
import clsx from "clsx";
import styles from "./MatchCard.module.css";

function MatchCardTeam({
  showName,
  short_name,
  long_name,
  logo,
  iconSize,
  team,
}: {
  showName?: boolean;
  short_name: string;
  long_name: string;
  logo: string;
  iconSize: "sm" | "md" | "lg" | "xl" | "xxl";
  team: "home" | "away";
}) {
  return (
    <div className={clsx(styles["matchcard-team"], styles[team])}>
      {showName && (
        <Text
          color="white"
          letterCase={"upper"}
          size="base"
          weight="bold"
          hide_sm={true}
        >
          {long_name}
        </Text>
      )}
      <Logo logo={logo} name={short_name} size={iconSize || "lg"} />
    </div>
  );
}

export default MatchCardTeam;
