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
      const el = tabRef.current;

      // Scrollable container
      const scrollContainer = el.closest(`.${styles["tab__container"]}`);
      if (!scrollContainer) return;

      // Only scroll if there's actually overflow
      const isOverflowing =
        scrollContainer.scrollWidth > scrollContainer.clientWidth;

      if (!isOverflowing) return;

      const scrollOffset =
        el.offsetLeft - scrollContainer.clientWidth / 2 + el.offsetWidth / 2;

      scrollContainer.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
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
