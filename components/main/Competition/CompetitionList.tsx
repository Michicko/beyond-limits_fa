import React from "react";
import Competition from "./Competition";
import clsx from "clsx";
import styles from "./Competition.module.css";

interface ICompetition {
  logo: string;
  longName: string;
  id: string;
}

const sortCompetitions = (competitions: ICompetition[]) =>
  competitions.sort((a, b) => {
    const nameA = a.longName.toUpperCase();
    const nameB = b.longName.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

function CompetitionList({ competitions }: { competitions: ICompetition[] }) {
  return (
    <div className={clsx(styles.competitions)}>
      {sortCompetitions([...competitions]).map((competition) => {
        return <Competition competition={competition} key={competition.id} />;
      })}
    </div>
  );
}

export default CompetitionList;
