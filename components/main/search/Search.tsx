"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Search.module.css";
import { useRouter } from "next/navigation";

function Search({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const closeSearchBar = () => {
    setIsOpened(false);
  };

  const searchRef = useRef<HTMLInputElement | null>(null);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) return;
    router.replace(`/search?q=${encodeURIComponent(trimmedKeyword)}`);
    setIsOpened(false);
  };

  useEffect(() => {
    const search = searchRef.current;
    if(isOpened && search){
      search.focus();
      setKeyword('');
    }
  }, [isOpened])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpened(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={clsx(styles["search-container"], {
        [styles.open]: isOpened,
      })}
    >
      <form className={clsx(styles["search-form"])} onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="What are you looking for?"
          className={clsx(styles["search-input"])}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={searchRef}
          aria-label="Search input"
          tabIndex={0}
        />
        <button type="submit" aria-label="Submit search" className={clsx(styles["search-btn"])}>
          search
        </button>
        <button
          type="button"
          onClick={closeSearchBar}
          className={clsx(styles["cancel-btn"])}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40.2092" height="40" rx="7" fill="#F8F7F7"></rect>
            <path
              d="M28.1981 13.4783L26.5531 11.8333L20.0314 18.355L13.5097 11.8333L11.8647 13.4783L18.3864 20L11.8647 26.5217L13.5097 28.1667L20.0314 21.645L26.5531 28.1667L28.1981 26.5217L21.6764 20L28.1981 13.4783Z"
              fill="#339CFF"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default Search;
