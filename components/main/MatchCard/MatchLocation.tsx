import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";

function MatchDate({
	location,
	size,
	hightlight,
}: {
	location: string;
	size: "sm" | "md" | "lg";
	hightlight: boolean;
}) {
	return (
		<p
			className={clsx(
				styles["matchlocation"],
				styles[size],
				hightlight && styles.highlight,
			)}
		>
			{location}
		</p>
	);
}

export default MatchDate;
