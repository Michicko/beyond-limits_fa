import React from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

function Container({
	as,
	children,
	size,
}: {
	as: "div" | "section";
	children: React.ReactNode;
	size: "sm" | "md" | "lg";
}) {
	const containerStyles = clsx(styles.container, styles[size]);

	return as === "div" ? (
		<div className={containerStyles}>{children}</div>
	) : as === "section" ? (
		<section className={containerStyles}>{children}</section>
	) : (
		<main className={containerStyles}>{children}</main>
	);
}

export default Container;
