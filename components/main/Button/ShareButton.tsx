import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

function ShareButton({ name, href }: { name: string; href: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={clsx(styles.btn, styles["share-btn"])}
		>
			{name}
		</a>
	);
}

export default ShareButton;
