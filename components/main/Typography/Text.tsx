import clsx from "clsx";
import React from "react";
import styles from "./Typography.module.css";

function Text({
  children,
  size,
  weight,
  color,
  letterCase,
  type,
  cssStyles,
  mb,
  center,
  hide_sm,
}: {
  children: React.ReactNode;
  size:
    | "xxs"
    | "xs"
    | "sm"
    | "base"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
    | "iv"
    | "v"
    | "vi";
  mb?:
    | "xxs"
    | "xs"
    | "sm"
    | "base"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
    | "iv"
    | "v"
    | "vi";
  weight?: "light" | "semibold" | "bold" | "regular";
  color?: string;
  letterCase?: "upper" | "lower" | "capitalize" | "normal";
  type?: "lead" | "text" | "interlude";
  cssStyles?: object;
  center?: boolean;
  hide_sm?: boolean;
}) {
  return (
    <p
      className={clsx(
        styles.text,
        styles[size],
        styles[weight || "light"],
        color && styles[color],
        letterCase && styles[letterCase],
        styles[type || "text"],
        mb && styles[`mb-${mb}`],
        center && styles.center,
        hide_sm && styles["hide-on-sm"]
      )}
      style={cssStyles && { ...cssStyles }}
    >
      {children}
    </p>
  );
}

export default Text;
