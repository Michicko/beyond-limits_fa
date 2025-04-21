import React from "react";
import styles from "./TeamStat.module.css";
import clsx from "clsx";
import Text from "../Typography/Text";
import Logo from "../MatchCard/Logo";

const endings = [
  {
    nums: [1],
    ending: "st",
  },
  {
    nums: [2],
    ending: "nd",
  },
  {
    nums: [3],
    ending: "rd",
  },
  {
    nums: [4, 5, 6, 7, 8, 9, 0],
    ending: "th",
  },
];

const getPosition = (num: number) => {
  const position = endings.find((el) => el.nums.includes(num))?.ending;
  return position ? num + position : num;
};

function TeamStat({
  position,
  competition_name,
  competition_logo,
}: {
  position: number | string;
  competition_name: string;
  competition_logo: string;
}) {
  return (
    <li className={clsx(styles["competition"])}>
      <div>
        <Text color="secondary" size="md" weight="semibold" letterCase="normal">
          {typeof position === "number" ? getPosition(position) : position}
        </Text>
        <Text color="white" size="md" weight="semibold" letterCase="upper">
          {competition_name}
        </Text>
      </div>
      <Logo name={competition_name} logo={competition_logo} size="lg" />
    </li>
  );
}

export default TeamStat;
