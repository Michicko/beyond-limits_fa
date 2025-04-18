import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

function CardBody({
	children,
	as,
	theme,
	fixedBodyHeight,
}: {
	children: React.ReactElement;
	as: "tbody" | "div";
	theme: "dark" | "light" | "trans";
	fixedBodyHeight?: boolean;
}) {
	return as === "div" ? (
		<div
			className={clsx(
				styles["card-body"],
				styles[theme],
				fixedBodyHeight && styles["fixed-height"],
			)}
		>
			{children}
		</div>
	) : (
		<tbody
			className={clsx(
				styles["card-body"],
				styles[theme],
				fixedBodyHeight && styles["fixed-height"],
			)}
		>
			{children}
		</tbody>
	);
}

export default CardBody;
