"use client";
import React, { useEffect, useRef, useState } from "react";
import Search from "../search/Search";
import NavMenu from "./NavMenu";
import clsx from "clsx";
import styles from "./Nav.module.css";
import NavLink from "./NavLink";
import Hamburger from "./Hamburger";
import NavLogo from "./NavLogo";
import NavSearchBtn from "./NavSearchBtn";
import { fetchAuthSession } from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Logout from "@/components/Auth/Logout";

function Nav() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isSearchBarOpened, setIsSearchBarOpened] = useState(false);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollYRef = useRef<number | null>(null);

  const openSearchBar = () => {
    setIsSearchBarOpened(true);
  };

  const controlNavbar = () => {
    const lastScrollY = lastScrollYRef.current;
    if (lastScrollY && lastScrollY > 35 && window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    // remember current page location to use in the next move
    lastScrollYRef.current = window.scrollY;
  };

  //   handling nav on scroll
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollYRef.current]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { tokens } = await fetchAuthSession();
        const isAuthenticated = !!tokens;
        setAuthenticated(isAuthenticated);
        const rawGroups = tokens?.accessToken.payload["cognito:groups"];
        const groups = Array.isArray(rawGroups) ? rawGroups : [];
        const isAdmin = groups.includes("Admin") || groups.includes("Writer");
        setIsAdmin(isAdmin);
      } catch (error) {
        setAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") {
        setAuthenticated(true);
      }
      if (payload.event === "signedOut") {
        setAuthenticated(false);
      }
    });

    return () => {
      hubListenerCancel();
    };
  }, []);

  return (
    <>
      <Search isOpened={isSearchBarOpened} setIsOpened={setIsSearchBarOpened} />
      <NavMenu isMenuOpened={isMenuOpened} setIsMenuOpened={setIsMenuOpened} />
      <nav
        className={clsx(styles.nav, {
          [styles.show]: show,
          [styles.hide]: !show,
        })}
      >
        <div className={clsx(styles["nav-sm"])}>
          <div className={clsx(styles.left)}>
            <NavLink link={{ href: "/gallery", name: "gallery" }} />
            <NavLink link={{ href: "/contact", name: "Contact us" }} />
          </div>
          <p className={clsx(styles["nav-text"])}>No Limits</p>
          <div className={clsx(styles.right)}>
            {authenticated && isAdmin ? (
              <NavLink link={{ href: "/cp/dashboard", name: "Dashboard" }} />
            ) : authenticated ? (
              <Logout isMain={true} />
            ) : (
              <NavLink link={{ href: "/login", name: "Login" }} />
            )}
          </div>
        </div>
        <div className={clsx(styles["nav-main"])}>
          <Hamburger setIsMenuOpened={setIsMenuOpened} />
          <NavLogo size="md" />
          <NavSearchBtn handleOnClick={openSearchBar} />
        </div>
      </nav>
    </>
  );
}
export default Nav;
