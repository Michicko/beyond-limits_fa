import React from "react";
import styles from "./Standing.module.css";
import clsx from "clsx";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import { IStandingRow } from "@/lib/definitions";
import StandingRow from "./StandingRow";

function Standing({
  standings,
  showFull,
  showLongName,
}: {
  standings: IStandingRow[];
  showFull: boolean;
  showLongName: boolean;
}) {
  const sortedStandings = standings.sort((a, b) => a.position - b.position);

  // get blfc index in standing
  const blfcIndex = sortedStandings.findIndex(
    (el) => el.team && el.team.isBeyondLimits
  );

  console.log(blfcIndex);

  // get team before blfc and blfc postions
  const filteredStandings = showFull
    ? sortedStandings
    : sortedStandings.slice(blfcIndex > 0 ? blfcIndex - 1 : 0, blfcIndex + 2);

  const theads = ["pos", "club", "p", "w", "d", "l", "g", "gd", "pts"];

  return (
    <div className={clsx(styles.standing)}>
      <Card theme="light">
        <p className={clsx(styles["standing-title"])}>NNL</p>
        <>
          <table className={clsx(showFull)}>
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
                        row.team?.isBeyondLimits && styles.shade
                      )}
                    >
                      {row.team && (
                        <StandingRow row={row} showLongName={showLongName} />
                      )}
                    </tr>
                  );
                })}
              </>
            </CardBody>
          </table>
        </>
      </Card>
    </div>
  );
}

export default Standing;
