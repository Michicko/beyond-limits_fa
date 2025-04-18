import Link from "next/link";
import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function Button({
  isLink,
  text,
  url,
  type,
  size,
  handleOnClick,
}: {
  isLink: boolean;
  text: string;
  url?: string;
  type: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  handleOnClick?: () => void;
}) {
  const btnStyles = clsx(styles.btn, styles[type], styles[size]);

  return isLink && url ? (
    <Link href={url} className={btnStyles}>
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 404.39"
      >
        <path
          fillRule="nonzero"
          d="M438.95 219.45 0 219.99v-34.98l443.3-.55L269.8 25.79 293.39 0 512 199.92 288.88 404.39l-23.59-25.8z"
        />
      </svg>
    </Link>
  ) : (
    <button className={btnStyles} onClick={handleOnClick && handleOnClick}>
      {text}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 404.39"
      >
        <path
          fillRule="nonzero"
          d="M438.95 219.45 0 219.99v-34.98l443.3-.55L269.8 25.79 293.39 0 512 199.92 288.88 404.39l-23.59-25.8z"
        />
      </svg>
    </button>
  );
}

export default Button;
