"use client";
import Link from "next/link";
import styles from "./Tab.module.css";
import clsx from "clsx";
import { ILink } from "@/lib/definitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
  const tabRef = useRef<HTMLAnchorElement>(null);
  const isCurrent = (currentLink || path) === link.href.split("?")[0];

  useEffect(() => {
    if (isCurrent && tabRef.current) {
      tabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isCurrent]);

  return (
    <Link
      href={link.href}
      className={clsx(styles.tab, styles[theme], {
        [styles.current]: isCurrent,
      })}
      ref={tabRef}
    >
      {link.name}
    </Link>
  );
};

export default LinkTab;
