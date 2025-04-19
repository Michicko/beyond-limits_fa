import React from "react";
import Text from "../Typography/Text";
import clsx from "clsx";
import styles from "./MatchCard.module.css";
import { Nullable } from "@/lib/definitions";

function Details({
  status,
  home_score,
  away_score,
}: {
  status: string;
  home_score?: Nullable<string> | null;
  away_score?: Nullable<string> | null;
}) {
  return status === "COMPLETED" ? (
    <div className={clsx(styles["matchcard-scores"])}>
      <Text color="white" letterCase="normal" size="xl" weight="bold">
        {home_score}
      </Text>
      <Text color="white" letterCase="upper" size="xl" weight="bold">
        -
      </Text>
      <Text color="white" letterCase="normal" size="xl" weight="bold">
        {away_score}
      </Text>
    </div>
  ) : status === "UPCOMING" ? (
    <>
      <Text color="white" letterCase="upper" size="xl" weight="bold">
        -
      </Text>
    </>
  ) : status === "ABANDONED" ? (
    <Text color="white" letterCase="upper" size="base" weight="light">
      ABANDONED
    </Text>
  ) : (
    <Text color="white" letterCase="upper" size="base" weight="light">
      CANCELED
    </Text>
  );
}

export default Details;
