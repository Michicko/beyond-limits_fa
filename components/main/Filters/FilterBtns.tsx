"use client";
import React, { useState } from "react";
import clsx from "clsx";
import styles from "./Filters.module.css";
import FilterBtn from "./FilterBtn";

function FilterBtns({
  list,
  name,
  initial,
}: {
  list: string[];
  name: string;
  initial: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(initial);

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
            />
          );
        })}
      </div>
    </div>
  );
}

export default FilterBtns;
