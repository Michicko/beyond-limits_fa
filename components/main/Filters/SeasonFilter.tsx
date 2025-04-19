"use client";
import React, { useEffect, useState } from "react";
import { seasons as temp_seasons } from "@/lib/placeholder-data";
import styles from "./Filters.module.css";
import clsx from "clsx";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function SeasonFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const options = temp_seasons.map((el) => {
    return {
      label: el.season,
      value: el.season,
    };
  });

  const [selectedOption, setSelectedOption] = useState(
    searchParams.get("season")?.toString()
  );

  const handleOnChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const params = new URLSearchParams(searchParams);
    if (target.value) {
      params.set("season", target.value);
    } else {
      params.delete("season");
    }
    setSelectedOption(target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      name="season"
      id="season"
      className={clsx(styles["season-filter"])}
      onChange={handleOnChange}
      value={selectedOption}
    >
      {options.map((option) => {
        return (
          <option key={option.label} value={option.value}>
            {option.label} Season
          </option>
        );
      })}
    </select>
  );
}

export default SeasonFilter;
