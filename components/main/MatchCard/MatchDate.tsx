import React from "react";
import { formatDate } from "@/lib/helpers";
import Text from "../Typography/Text";

function MatchDate({ date, size }: { date: string; size: "sm" | "md" | "lg" }) {
  return (
    <Text weight="bold" size={size || "md"} letterCase="upper">
      {formatDate(date)}
    </Text>
  );
}

export default MatchDate;
