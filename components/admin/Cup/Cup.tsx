"use client";
import React, { useState } from "react";
import PlayoffRound from "../PlayoffRound/PlayoffRound";
import { IRound } from "@/lib/definitions";

enum IStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

function Cup() {
  const [rounds, setRounds] = useState<IRound[]>([
    {
      cupId: 1,
      round: "FINALS_128",
      matchId: 1,
      result: "",
      status: IStatus.PENDING,
    },
    {
      cupId: 1,
      round: "FINALS_64",
      matchId: 1,
      result: "",
      status: IStatus.PENDING,
    },
  ]);

  const play_offs = [
    { value: "QUALIFIERS", label: "qualifiers" },
    { value: "FINALS_128", label: "1/128-finals" },
    { value: "FINALS_64", label: "1/64-finals" },
    { value: "FINALS_32", label: "1/32-finals" },
    { value: "FINALS_16", label: "1/16-finals" },
    { value: "FINALS_8", label: "1/8-finals" },
    { value: "QUARTER_FINALS", label: "quater-finals" },
    { value: "SEMI_FINALS", label: "semi-finals" },
    { value: "FINALS", label: "final" },
  ];

  return (
    <PlayoffRound rounds={rounds} setRounds={setRounds} play_offs={play_offs} />
  );
}

export default Cup;
