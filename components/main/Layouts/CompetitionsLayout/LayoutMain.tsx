import React from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";

function LayoutMain({ children }: { children: React.ReactElement }) {
	return <div className={clsx(styles.layout__main)}>{children}</div>;
}

export default LayoutMain;
