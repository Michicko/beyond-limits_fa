import Login from "@/components/Auth/Login";
import React from "react";
import styles from "./Login.module.css";
import clsx from "clsx";

function login() {
  return (
    <div className={clsx(styles["login-page"])}>
      <Login />
    </div>
  );
}

export default login;
