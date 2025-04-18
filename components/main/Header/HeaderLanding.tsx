import clsx from "clsx";
import React from "react";
import styles from "./Header.module.css";

function HeaderLanding({ children }: { children: React.ReactNode }) {
	return <div className={clsx(styles["header-landing"])}>{children}</div>;
}

export default HeaderLanding;
