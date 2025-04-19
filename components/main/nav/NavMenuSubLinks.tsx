"use client";
import React from "react";
import styles from "./Nav.module.css";
import clsx from "clsx";
import NavMenuLink from "./NavMenuLink";
import { ICurrentMenu } from "@/lib/definitions";

function NavMenuSubLinks({
  currentMenu,
  closeMenu,
}: {
  currentMenu: ICurrentMenu;
  closeMenu: () => void;
}) {
  return (
    <div className={clsx(styles["nav-menu__sub-links"])}>
      <div
        className={clsx(
          styles["nav-menu__sub-link"],
          styles["menu-" + currentMenu.subMenu.length]
        )}
      >
        {currentMenu.subMenu.map((el, i) => {
          return <NavMenuLink el={el} closeMenu={closeMenu} key={i} />;
        })}
      </div>
    </div>
  );
}

export default NavMenuSubLinks;
