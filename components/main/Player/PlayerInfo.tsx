import React from "react";
import styles from "./Player.module.css";
import clsx from "clsx";

function PlayerInfo({
	info,
}: {
	info: { name: string; value: string | number };
}) {
	return (
		<div className={clsx(styles["player-info"])}>
			<p className={clsx(styles["player-info__name"])}>{info.name}</p>
			<p className={clsx(styles["player-info__value"])}>{info.value}</p>
		</div>
	);
}

export default PlayerInfo;
