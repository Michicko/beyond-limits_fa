import React from "react";
import clsx from "clsx";
import styles from "./Knockout.module.css";
import Link from "next/link";
import KnockoutMatchDetails from "./KnockoutMatchDetails";
import { Nullable } from "@/lib/definitions";
import { getPlayOffRoundName } from "@/lib/helpers";

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

function Knockout({ playOffs }: { playOffs: IPlayOff[] }) {
  return (
    <div className={clsx(styles.knockout)}>
      <ul>
        {playOffs.map((playoff) => {
          return (
            <li className={clsx(styles["knockout-round"])} key={playoff.round}>
              <h3 className={clsx(styles["knockout-round-title"])}>
                {getPlayOffRoundName(playoff.round)}
              </h3>
              <Link
                href={`/matches/${playoff.match?.id}/report`}
                className={clsx(styles["knockout-match"])}
              >
                {playoff.match?.homeTeam &&
                  playoff.match?.homeTeam.goals &&
                  playoff.match?.awayTeam?.goals && (
                    <KnockoutMatchDetails
                      long_name={playoff.match?.homeTeam.longName}
                      short_name={playoff.match?.homeTeam.shortName}
                      logo={playoff.match?.homeTeam.logo}
                      goals={playoff.match?.homeTeam.goals || ""}
                      match_winner={
                        playoff.match?.homeTeam.goals >
                        playoff.match?.awayTeam.goals
                      }
                      // win_by_penalties={
                      //   playoff.match?.home.penalties &&
                      //   playoff.match?.away.penalties
                      //     ? playoff.match?.home.penalties >
                      //       playoff.match?.away.penalties
                      //     : false
                      // }
                    />
                  )}
                <div className={clsx(styles.versus)}>:</div>
                {playoff.match?.awayTeam &&
                  playoff.match.homeTeam &&
                  playoff.match.awayTeam.goals &&
                  playoff.match.homeTeam.goals && (
                    <KnockoutMatchDetails
                      long_name={playoff.match.awayTeam.longName}
                      short_name={playoff.match.awayTeam.shortName}
                      logo={playoff.match.awayTeam.logo}
                      goals={playoff.match.awayTeam.goals}
                      match_winner={
                        playoff.match.awayTeam.goals >
                        playoff.match.homeTeam.goals
                      }
                      // win_by_penalties={
                      //   match.home.penalties && match.away.penalties
                      //     ? match.away.penalties > match.home.penalties
                      //     : false
                      // }
                    />
                  )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Knockout;
