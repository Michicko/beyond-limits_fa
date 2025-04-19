import React from "react";
import styles from "./Filters.module.css";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterBtn({
  filterName,
  filterValue,
  index,
  currentIndex,
  setCurrentIndex,
}: {
  filterName: string;
  filterValue: string;
  index: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectFilterValue = () => {
    const params = new URLSearchParams(searchParams);
    if (filterValue) {
      params.set(filterName, filterValue.toLowerCase());
    } else {
      params.delete(filterName);
    }

    replace(`${pathname}?${params.toString()}`);
    setCurrentIndex(index);
  };

  return (
    <button
      className={clsx(styles.filter__btn, {
        [styles.current]: currentIndex === index,
      })}
      onClick={selectFilterValue}
    >
      {filterValue}
    </button>
  );
}

export default FilterBtn;
