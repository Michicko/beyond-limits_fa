import React from "react";
import styles from "./Typography.module.css";
import clsx from "clsx";

function Heading({
  level,
  children,
  type,
  letterCase,
  mb,
  mt,
  align,
  center,
  color,
}: {
  level: number;
  children: React.ReactNode;
  type: "primary" | "secondary" | "section";
  letterCase: "upper" | "lower" | "capitalize" | "normal";
  mb?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "xxl";
  mt?: "xs" | "sm" | "base" | "md" | "lg" | "xl" | "xxl";
  align?: string;
  center?: boolean;
  color?: string;
}) {
  const headingStyles = clsx(
    styles.heading,
    styles[`heading-${type}`],
    styles[letterCase],
    mb && styles[`mb-${mb}`],
    mt && styles[`mt-${mt}`],
    align && styles[align],
    center && styles["center"],
    color && styles[color]
  );

  return level === 1 ? (
    <h1 className={headingStyles}>{children}</h1>
  ) : level === 2 ? (
    <h2 className={headingStyles}>{children}</h2>
  ) : level === 3 ? (
    <h3 className={headingStyles}>{children}</h3>
  ) : level === 4 ? (
    <h4 className={headingStyles}>{children}</h4>
  ) : (
    <h5 className={headingStyles}>{children}</h5>
  );
}

export default Heading;
