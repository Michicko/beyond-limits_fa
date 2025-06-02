import React from "react";
import { formatDate, formatDateTime } from "@/lib/helpers";
import Text from "../Typography/Text";

function MatchDate({ date, time, size }: { date: string; time: string; size: "sm" | "md" | "lg" }) {
  return (
    <Text weight="bold" size={size || "md"} letterCase="upper">
      {formatDateTime(date, time)}
    </Text>
  );
}

export default MatchDate;
