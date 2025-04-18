import React from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

function Grid({
	children,
	justify,
	align,
	col,
	gap,
}: {
	children: React.ReactNode;
	justify?: string;
	align?: string;
	col?: string;
	gap?: "sm" | "base" | "md" | "lg";
}) {
	return (
		<div
			className={clsx(
				styles.grid,
				styles[`justify-${justify}`],
				styles[`align-${align}`],
				styles[`col-${col}`],
				styles[`gap-${gap}`],
			)}
		>
			{children}
		</div>
	);
}

export default Grid;
