import React from "react";
import styles from "./Nav.module.css";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavMenuLink({
	el,
	closeMenu,
}: {
	el: { link: string; id: number; name: string; image: string };
	closeMenu: () => void;
}) {
	const pathname = usePathname();

	return (
		<Link
			href={el.link}
			className={clsx(styles["nav-menu__sublinkbody"], {
				[styles.current]: pathname === el.link,
			})}
			style={{
				background: `linear-gradient(0deg, rgba(4, 48, 91, 54%), rgba(64, 84, 102, 27%)), url('${el.image}')`,
			}}
			onClick={closeMenu}
			key={el.id}
			as={el.link}
		>
			<p>{el.name}</p>
		</Link>
	);
}

export default NavMenuLink;
