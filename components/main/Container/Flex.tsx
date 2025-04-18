import React from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

function Flex({
	children,
	justify,
	align,
	gap,
	h_full,
	wrap,
	mb,
	my,
	direction,
}: {
	children: React.ReactNode;
	justify: string;
	align: string;
	gap?: "xxs" | "xs" | "sm" | "base" | "md" | "lg" | "xl";
	h_full?: boolean;
	wrap?: boolean;
	mb?: "xxs" | "xs" | "sm" | "base" | "md" | "lg" | "xl";
	my?: "xxs" | "xs" | "sm" | "base" | "md" | "lg" | "xl" | "iv" | "v";
	direction?: "col" | "row";
}) {
	return (
		<div
			className={clsx(
				styles.flex,
				styles[`justify-${justify}`],
				styles[`align-${align}`],
				gap && styles[`gap-${gap}`],
				h_full && styles["h-full"],
				wrap && styles["wrap"],
				mb && styles[`mb-${mb}`],
				my && styles[`my-${my}`],
				direction && styles[`direction-${direction}`],
			)}
		>
			{children}
		</div>
	);
}

export default Flex;
