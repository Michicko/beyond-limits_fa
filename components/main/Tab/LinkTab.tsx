"use client";
import Link from "next/link";
import styles from "./Tab.module.css";
import clsx from "clsx";
import { ILink } from "@/lib/definitions";
import { usePathname, useSearchParams } from "next/navigation";

const LinkTab = ({
  link,
  theme,
  currentLink,
}: {
  link: ILink;
  theme: "theme-1" | "theme-2";
  currentLink?: string;
}) => {
  const path = usePathname();

  return (
    <Link
      href={link.href}
      className={clsx(styles.tab, styles[theme], {
        [styles.current]: (currentLink || path) === link.href.split("?")[0],
      })}
    >
      {link.name}
    </Link>
  );
};

export default LinkTab;
