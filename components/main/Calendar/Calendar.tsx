import React from "react";
import FilterBtns from "../Filters/FilterBtns";
import { months } from "@/lib/placeholder-data";
import Dropdown from "../Filters/Dropdown";

function Calendar({
  slice,
  years,
  currentYear,
  noUrl,
  setCurrentYear,
  currentIndex,
  setCurrentIndex,
  size,
}: {
  slice?: number;
  years: string[];
  currentYear?: number;
  noUrl?: boolean;
  currentIndex?: number;
  setCurrentYear?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  size?: "sm" | "lg";
}) {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  return (
    <>
      <Dropdown
        years={years}
        currentYear={currentYear ?? year}
        noUrl={noUrl}
        setCurrentYear={setCurrentYear}
        size={size}
      />
      <FilterBtns
        list={months}
        name="month"
        currentIndex={currentIndex ?? month}
        noUrl={noUrl}
        setCurrentIndex={setCurrentIndex}
      />
    </>
  );
}

export default Calendar;
