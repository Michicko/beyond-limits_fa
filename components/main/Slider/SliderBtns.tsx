"use client";
import React, { useEffect } from "react";
import styles from "./Slider.module.css";
import clsx from "clsx";
import { getIcon } from "@/lib/icons";

function SliderBtns({
  slides,
  current,
  setCurrent,
}: {
  slides: string[];
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) {
  const next = () => {
    let next = current + 1;
    if (next > slides.length - 1) {
      next = 0;
    }
    setCurrent(next);
  };

  const prev = () => {
    let next = current - 1;
    if (next < 0) {
      next = slides.length - 1;
    }
    setCurrent(next);
  };

  // auto slide after 5s
  useEffect(() => {
    const slideInterval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [next]);

  return (
    <div className={clsx(styles["slider-btns"])}>
      <button onClick={prev}>{getIcon("prev")}</button>
      <button onClick={next}>{getIcon("next")}</button>
    </div>
  );
}

export default SliderBtns;
