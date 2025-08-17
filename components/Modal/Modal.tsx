import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import clsx from "clsx";
function Modal({
  children,
  isModalShown,
  setIsModalShown,
}: {
  children: React.ReactElement;
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isModalShown) {
      dialog.showModal();
    } else {
      dialog.close();
      setIsModalShown(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        dialog.close();
        setIsModalShown(false);
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalShown]);

  return (
    <dialog className={clsx(styles.modal)} ref={dialogRef}>
      {children}
    </dialog>
  );
}

export default Modal;
