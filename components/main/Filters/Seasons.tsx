'use client';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import styles from './Filters.module.css';

function Seasons({seasons}: {seasons: string[]}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const year = new Date().getUTCFullYear();
  const containedSeasons = seasons.filter((el) => el.includes(year.toString()));
  const [selected, setSelected] = useState(containedSeasons[containedSeasons.length - 1] || '');

  const onChange = (e: {target: {value: string}}) => {
    const {value} = e.target;
    const params = new URLSearchParams(searchParams);
    params.set('season', value);
    setSelected(value);
    replace(`${pathname}?${params.toString()}`);
  }


  return (
    <select name="season" id="season" 
      className={clsx(styles.season)} 
      defaultValue={selected}
      onChange={onChange} 
      >
      {
        seasons.map((season) => {
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

export default Seasons