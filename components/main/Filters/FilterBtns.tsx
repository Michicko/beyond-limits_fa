"use client";
import React from "react";
import clsx from "clsx";
import styles from "./Filters.module.css";
import FilterBtn from "./FilterBtn";

function FilterBtns({
  list,
  name,
  noUrl,
  currentIndex,
  setCurrentIndex,
}: {
  list: string[];
  name: string;
  noUrl?: boolean;
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={clsx(styles["filter__btns-container"])}>
      <div className={clsx(styles.filter__btns)}>
        {list.map((item, i) => {
          return (
            <FilterBtn
              filterName={name}
              filterValue={item}
              index={i}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              key={item}
              noUrl={noUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FilterBtns;
