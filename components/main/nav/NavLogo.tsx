import ImageComp from "@/components/ImageComp/ImageComp";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import styles from "./Nav.module.css";

function NavLogo({ size }: { size: "sm" | "md" | "lg" }) {
	return (
		<Link className={clsx(styles["nav-logo"], styles[size])} href={"/"}>
			<ImageComp
				alt="Beyond Limits FA Logo"
				image="/images/bright-logo.png"
				placeholder="/images/bright-logo.png"
				priority={true}
			/>
		</Link>
	);
}

export default NavLogo;
