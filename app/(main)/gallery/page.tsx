import { visuals } from "@/lib/placeholder-data";
import React from "react";
import styles from "./Gallery.module.css";
import clsx from "clsx";
import ImageCard from "@/components/main/Card/ImageCard";

export const metadata = {
  title: 'Gallery',
  description: "Check out our gallery.",
};

function Gallery() {

  return (
    <div className={clsx(styles.gallery)}>
      {visuals.map((visual) => {
        return (
          <ImageCard visual={visual} key={visual} />
        );
      })}
    </div>
  );
}

export default Gallery;
