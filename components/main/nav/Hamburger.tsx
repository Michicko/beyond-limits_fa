"use client";

import clsx from "clsx";
import styles from "./Nav.module.css";
import { Dispatch, SetStateAction } from "react";

const Hamburger = ({
  setIsMenuOpened,
}: {
  setIsMenuOpened: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className={clsx(styles["nav-btn"])}
      type="button"
      onClick={() => setIsMenuOpened(true)}
    >
      <svg
        width="41"
        height="40"
        viewBox="0 0 41 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.747803"
          y="3.05176e-05"
          width="40.2092"
          height="40"
          rx="7"
          fill="#F8F7F7"
        />
        <path
          d="M8.53833 11.25V14.75H33.1665V11.25H8.53833ZM8.53833 18.25V21.75H33.1665V18.25H8.53833ZM8.53833 25.25V28.75H33.1665V25.25H8.53833Z"
          fill="#327BC0"
        />
      </svg>
    </button>
  );
};

export default Hamburger;
