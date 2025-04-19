"use client";
import React, { useState } from "react";
import Standing from "../Standing/Standing";
import Knockout from "../Knockout/Knockout";
import ButtonTab from "@/components/main/Tab/ButtonTab";
import Tab from "@/components/main/Tab/Tab";
import { IStandingRow, Nullable } from "@/lib/definitions";
import clsx from "clsx";
import styles from "./MixedCup.module.css";

interface IMatchTeam {
  id: string;
  logo: string;
  longName: string;
  shortName: string;
  stadium?: string;
  goals: Nullable<string>;
  penalties?: number;
}

export interface IPlayOff {
  id: string;
  cupId: Nullable<string>;
  round: string;
  matchId: Nullable<string>;
  match: {
    id: string;
    homeTeam: IMatchTeam | null;
    awayTeam: IMatchTeam | null;
  };
}

function MixedCup({
  league_standing,
  playoffs,
  league_status,
}: {
  league_standing: IStandingRow[];
  playoffs: IPlayOff[];
  league_status: string;
}) {
  const mixedTabs = [{ name: "group stage" }, { name: "knockout" }];

  const [index, setIndex] = useState(league_status === "completed" ? 1 : 0);

  return (
    <>
      <Tab theme="theme-1" bg="trans">
        <>
          {mixedTabs.map((el, i) => {
            return (
              <ButtonTab
                currentIndex={index}
                index={i}
                setIndex={setIndex}
                theme="theme-1"
                text={el.name}
                key={el.name + i}
              />
            );
          })}
        </>
      </Tab>
      <div className={clsx(styles["body"])}>
        {index === 0 ? (
          <div>
            <Standing
              standings={league_standing}
              showFull={true}
              showLongName={true}
            />
          </div>
        ) : (
          <div>{playoffs && <Knockout playOffs={playoffs} />}</div>
        )}
      </div>
    </>
  );
}

export default MixedCup;
