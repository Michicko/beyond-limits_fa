import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";

function TeamForm({ form }: { form: string }) {
	return (
		<div className={clsx(styles["team-form"], styles[form])}>
			<p>{form}</p>
		</div>
	);
}

export default TeamForm;
