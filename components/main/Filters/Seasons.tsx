'use client';
import clsx from 'clsx';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { memo, useState } from 'react'
import styles from './Filters.module.css';

function Seasons({seasons, currentSeason}: {seasons: string[]; currentSeason?: string}) {
  const mappedSeasons: string[] = seasons ? Array.from(new Set(seasons)) : [];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selected, setSelected] = useState(() => {
    const urlSeason = searchParams.get('season');
    return urlSeason || currentSeason || '';
  });

  const onChange = (e: {target: {value: string}}) => {
    const {value} = e.target;
    setSelected(value);
    const params = new URLSearchParams(searchParams);
    params.set('season', value);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select name="season" id="season" 
      className={clsx(styles.season)} 
      value={selected}
      onChange={onChange} 
      >
      {
        mappedSeasons.map((season) => {
          return (
          <option value={season} key={season}>
            {season}
          </option>
          )
        })
      }
    </select>
  )
}

export default memo(Seasons)