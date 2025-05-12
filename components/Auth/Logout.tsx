"use client";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import styles from './Auth.module.css';
import clsx from "clsx";

export default function Logout({isMain}: {isMain?: boolean}) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/");
      }}
      className={isMain ? clsx(styles.signout) : "px-2 bg-white text-black"}
    >
      Sign out
    </button>
  );
}
