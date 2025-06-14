import React from "react";
import styles from "./Standing.module.css";
import clsx from "clsx";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import { IStandingRow } from "@/lib/definitions";
import StandingRow from "./StandingRow";
import Link from "next/link";

function Standing({
  name,
  standings,
  showFull,
  showLongName,
}: {
  name: string;
  standings: IStandingRow[];
  showFull: boolean;
  showLongName: boolean;
}) {
  const sortedStandings = standings.sort((a, b) => a.position - b.position);

  // get blfc index in standing
  const blfcIndex = sortedStandings.findIndex((el) => el?.isBeyondLimits);

  // get team before blfc and blfc postions
  let filteredStandings = [];

  if (showFull || blfcIndex === -1) {
    filteredStandings = sortedStandings;
  } else {
    const isFirst = blfcIndex === 0;
    const isLast = blfcIndex === sortedStandings.length - 1;

    if (isFirst) {
      filteredStandings = sortedStandings.slice(0, 2);
    } else if (isLast) {
      filteredStandings = sortedStandings.slice(blfcIndex - 1);
    } else {
      filteredStandings = sortedStandings.slice(blfcIndex, blfcIndex + 2);
    }
  }

  const theads = ["pos", "club", "p", "w", "d", "l", "g", "gd", "pts"];

  return (
    <div className={clsx(styles.standing)}>
      <Card theme="light">
        <p className={clsx(styles["standing-title"])}>{name} Standing</p>
        <div className={clsx(styles["standing-box"])}>
          <table className={clsx(styles.showFull)}>
            <CardHeader as="thead" theme="trans" border={true}>
              <tr>
                {theads.map((el, i) => {
                  if (i === 1)
                    return (
                      <th key={i + 2} colSpan={4}>
                        {el}
                      </th>
                    );
                  if (i === 6) {
                    return (
                      <th key={i + 2} colSpan={2}>
                        {el}
                      </th>
                    );
                  }
                  return <th key={i + 2}>{el}</th>;
                })}
              </tr>
            </CardHeader>
            <CardBody as="tbody" theme="light">
              <>
                {filteredStandings.map((row, i) => {
                  return (
                    <tr
                      key={i + 1 * 2}
                      className={clsx(
                        styles.tr,
                        row.isBeyondLimits && styles.shade
                      )}
                    >
                      {row && (
                        <StandingRow row={row} showLongName={showLongName} />
                      )}
                    </tr>
                  );
                })}
              </>
            </CardBody>
          </table>
          {!showFull && (
            <Link href="/standing" className={clsx(styles["standing-btn"])}>
              view full table
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Standing;
