import React from "react";
import styles from "./Gallery.module.css";
import clsx from "clsx";

interface Album {
  id: number;
  coverImage: string;
  title: string;
}

function Album({ album }: { album: Album }) {
  return (
    <a href={`/gallery/${album.title}`} className={clsx(styles.album)}>
      <img
        src={`/images/${album.coverImage}`}
        alt={album.title}
        className={clsx(styles["album-cover-img"])}
      />
      <div className={clsx(styles["album-footer"])}>
        <h4 className={clsx(styles["album-title"])}>{album.title}</h4>
      </div>
    </a>
  );
}

export default Album;
