"use client";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Filters.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Dropdown({
  years = [],
  currentYear,
  noUrl,
  setCurrentYear,
  size,
}: {
  years: string[];
  currentYear: number;
  noUrl?: boolean;
  setCurrentYear?: React.Dispatch<React.SetStateAction<number>>;
  size?: "sm" | "lg";
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selected, setSelected] = useState(() => {
    if (!noUrl) {
      const urlSeason = searchParams.get("year");
      return urlSeason || currentYear;
    }

    return "";
  });

  const onChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    if (!noUrl) {
      setSelected(value);
      const params = new URLSearchParams(searchParams);
      params.set("year", value);
      replace(`${pathname}?${params.toString()}`);
    } else if (setCurrentYear) {
      setCurrentYear(+value);
    }
  };

  return (
    <select
      name="year"
      id="year"
      className={clsx(styles.season, styles.year, size && styles[size])}
      value={noUrl ? currentYear : selected}
      onChange={onChange}
    >
      {years.map((year) => {
        return (
          <option value={year} key={year}>
            {year}
          </option>
        );
      })}
    </select>
  );
}

export default Dropdown;
