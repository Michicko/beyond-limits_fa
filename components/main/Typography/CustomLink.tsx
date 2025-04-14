import Link from "next/link";
import React from "react";
import clsx from "clsx";
import styles from "./Typography.module.css";

function CustomLink({
	link,
	type,
}: {
	link: { name: string; href: string };
	type: "primary" | "secondary" | "section";
}) {
	return (
		<Link
			href={link.href}
			className={clsx(styles.link, styles[`link-${type}`])}
		>
			{link.name}
		</Link>
	);
}

export default CustomLink;
