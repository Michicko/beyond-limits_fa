import ImageComp from "@/components/ImageComp/ImageComp";
import React from "react";
import styles from "./MatchCard.module.css";
import clsx from "clsx";

function Logo({
	name,
	logo,
	size,
}: {
	name: string;
	logo: string;
	size?: "sm" | "md" | "lg" | "xl" | "xxl";
}) {
	return (
		<div className={clsx(styles["logo-box"])}>
			<div className={clsx(styles["logo"], size && styles[size])}>
				<ImageComp image={logo} alt={`${name} logo`} />
			</div>
		</div>
	);
}

export default Logo;
