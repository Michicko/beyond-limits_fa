import React, { useState } from "react";
import FilterBtns from "../Filters/FilterBtns";
import { months } from "@/lib/placeholder-data";

function Calendar({ slice }: { slice?: number }) {
  const date = new Date();
  const month = date.getUTCMonth();

  return (
    <FilterBtns
      initial={month}
      list={slice ? months.slice(slice) : months}
      name="month"
    />
  );
}

export default Calendar;
