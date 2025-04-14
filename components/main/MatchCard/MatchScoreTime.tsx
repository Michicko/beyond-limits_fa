import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";
import Text from "../Typography/Text";

function MatchScoreTime({
  time,
  theme,
}: {
  time: string | number;
  theme?: "dark" | "light";
}) {
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

  const getEnd = (num: number | string) => {
    let str = num.toString();
    const lastNum = +str.slice(str.length - 1);
    const end = endings.find((el) => el.nums.includes(lastNum))?.ending;
    return end ? num + end : num;
  };

  return (
    <div
      className={clsx(
        styles["match-score-tile"],
        theme ? styles[theme] : styles.light
      )}
    >
      <Text letterCase="normal" weight="regular" color="primary" size="sm">
        {getEnd(time)}
      </Text>
    </div>
  );
}

export default MatchScoreTime;
