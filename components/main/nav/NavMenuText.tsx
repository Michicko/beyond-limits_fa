import React from "react";
import styles from "./Nav.module.css";
import clsx from "clsx";
import Socials from "../Social/Socials";
import NavLogo from "./NavLogo";

function NavMenuText({ description }: { description: string }) {
  return (
    <div className={clsx(styles["nav-menu__text-box"])}>
      <NavLogo size="md" />
      <p className={clsx(styles.interlude)}>{description}</p>
      <div className={clsx(styles["nav-menu__footer"])}>
        <Socials />
        <p>
          Beyond Limits FA &copy;{new Date().getUTCFullYear()} All rights
          reserved
        </p>
      </div>
    </div>
  );
}

export default NavMenuText;
