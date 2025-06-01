import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import styles from './Competition.module.css';
import ImageComp from '@/components/ImageComp/ImageComp';
import { getFirstLetter } from '@/lib/helpers';

interface ICompetition {
  logo: string;
  longName: string;
  id: string;
}

function Competition({competition}: {competition: ICompetition}) {
  return (
    <Link
    className={clsx(styles.competition)}
    key={competition.id}
    href={`/competitions/${competition.id}`}
  >
    <div className={clsx(styles["competition__logo-box"])}>
      <ImageComp
        alt={competition.longName}
        image={competition.logo}
        placeholder={competition.logo}
        priority={false}
      />
    </div>
    <p className={clsx(styles.competition__name, styles.short)}>
      {getFirstLetter(competition.longName)}
    </p>
    <p className={clsx(styles.competition__name, styles.long)}>
      {competition.longName}
    </p>
    <div className={clsx(styles["competition-icon__box"])}>
      <p>View</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 404.39"
      >
        <path
          fillRule="nonzero"
          d="M438.95 219.45 0 219.99v-34.98l443.3-.55L269.8 25.79 293.39 0 512 199.92 288.88 404.39l-23.59-25.8z"
        />
      </svg>
    </div>
  </Link>
  )
}

export default Competition