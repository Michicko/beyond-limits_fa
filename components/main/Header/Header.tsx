import React from "react";
import styles from "./Header.module.css";
import clsx from "clsx";
import ImageComp from "@/components/ImageComp/ImageComp";

function Header({
	bg,
	alt,
	children,
	overlay,
	loadingScreen,
}: {
	bg: string;
	alt: string;
	children: React.ReactElement;
	overlay?: boolean;
	loadingScreen?: boolean;
}) {
	return (
		<header
			className={clsx(
				styles.header,
				overlay && styles.overlay,
				loadingScreen && styles.loading,
			)}
		>
			{!loadingScreen && <ImageComp image={bg} alt={alt} priority={true} />}
			<div className={clsx(styles["header-content"])}>{children}</div>
		</header>
	);
}

export default Header;
