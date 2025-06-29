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
  noUrl,
}: {
  filterName: string;
  filterValue: string;
  index: number;
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  noUrl?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectFilterValue = () => {
    if (!noUrl) {
      const params = new URLSearchParams(searchParams);
      if (filterValue) {
        params.set(filterName, filterValue.toLowerCase());
      } else {
        params.delete(filterName);
      }

      replace(`${pathname}?${params.toString()}`);
    } else if (setCurrentIndex) {
      setCurrentIndex(index);
    }
  };

  const current = React.useMemo(
    () => (noUrl ? null : searchParams.get(filterName)),
    [searchParams, filterName]
  );

  useEffect(() => {
    const isSelected = noUrl ? currentIndex === index : current === filterValue;

    if (!isSelected || !buttonRef.current) return;

    const el = buttonRef.current;

    const scrollContainer = el.closest(`.${styles["filter__btns-container"]}`);
    if (!scrollContainer) return;

    const scrollOffset =
      el.offsetLeft - scrollContainer.clientWidth / 2 + el.offsetWidth / 2;

    scrollContainer.scrollTo({
      left: scrollOffset,
      behavior: "smooth",
    });
  }, [current, currentIndex, index, filterValue, noUrl]);

  const isSelected = noUrl ? currentIndex === index : current === filterValue;

  return (
    <button
      className={clsx(styles.filter__btn, {
        [styles.current]: isSelected,
      })}
      onClick={selectFilterValue}
      ref={buttonRef}
    >
      {filterValue}
    </button>
  );
}

export default React.memo(FilterBtn);
