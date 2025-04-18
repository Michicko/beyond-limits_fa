import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

function CardHeader({
	children,
	theme,
	border,
	as,
}: {
	children: React.ReactElement;
	theme: "dark" | "light" | "trans";
	border: boolean;
	as: "thead" | "div";
}) {
	return as === "div" ? (
		<div
			className={clsx(styles["card-header"], styles[theme], {
				[styles.border]: border,
			})}
		>
			{children}
		</div>
	) : (
		<thead
			className={clsx(styles["card-header"], styles[theme], {
				[styles.border]: border,
			})}
		>
			{children}
		</thead>
	);
}

export default CardHeader;
