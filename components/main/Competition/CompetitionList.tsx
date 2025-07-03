import React from "react";
import Competition from "./Competition";
import clsx from "clsx";
import styles from "./Competition.module.css";
import { sortCompetitions } from "@/lib/helpers";

interface ICompetition {
  logo: string;
  longName: string;
  id: string;
}

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
