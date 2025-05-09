import React from 'react'
import Competition from './Competition';
import clsx from 'clsx';
import styles from './Competition.module.css';

interface ICompetition {
  logo: string;
  season?: string;
  name: string;
  id: string;
}

function CompetitionList({competitions}: {competitions: ICompetition[]}) {
  return (
     <div className={clsx(styles.competitions)}>
      {competitions.map((competition) => {
        return (
          <Competition competition={competition} />
        );
      })}
    </div>
  )
}

export default CompetitionList