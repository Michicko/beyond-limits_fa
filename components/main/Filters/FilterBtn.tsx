import React, { useEffect, useRef } from "react";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const current = React.useMemo(
    () => searchParams.get(filterName),
    [searchParams, filterName]
  );

  // Scroll current filter button into view
  useEffect(() => {
    if (current === filterValue && buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [current, filterValue]);

  return (
    <button
      className={clsx(styles.filter__btn, {
        [styles.current]: current === filterValue,
      })}
      onClick={selectFilterValue}
      ref={buttonRef}
    >
      {filterValue}
    </button>
  );
}

export default React.memo(FilterBtn);
