import React from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";

function LayoutHeader({
  children,
  article,
}: {
  children: React.ReactElement;
  article?: boolean;
}) {
  return (
    <div
      className={clsx(styles["layout__header"], article && styles["article"])}
    >
      {children}
    </div>
  );
}

export default LayoutHeader;
