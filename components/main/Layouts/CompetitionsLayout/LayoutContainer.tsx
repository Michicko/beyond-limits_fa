import React from "react";
import styles from "../Layout.module.css";
import clsx from "clsx";

function LayoutContainer({ children }: { children: React.ReactElement }) {
	return <div className={clsx(styles.layout__container)}>{children}</div>;
}

export default LayoutContainer;
