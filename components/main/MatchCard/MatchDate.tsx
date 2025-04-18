import React from "react";
import formatDate from "@/lib/formatDate";
import Text from "../Typography/Text";

function MatchDate({ date, size }: { date: string; size: "sm" | "md" | "lg" }) {
  return (
    <Text weight="bold" size="md" letterCase="upper">
      {formatDate(date)}
    </Text>
  );
}

export default MatchDate;
