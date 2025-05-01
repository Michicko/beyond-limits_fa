import React from "react";
import styles from "./VideoCard.module.css"; // Assuming CSS module is in the same folder
import ImageComp from "@/components/ImageComp/ImageComp";
import clsx from "clsx";
import Link from "next/link";

interface IHighlight {
  id: string;
  title: string;
  coverImage: string;
}

const VideoCard = ({ highlight }: { highlight: IHighlight }) => {
  return (
    <div className={styles.videoCard}>
      <div className={styles.thumbnailWrapper}>
        <ImageComp
          alt={highlight.title}
          image={highlight.coverImage}
          placeholder={highlight.coverImage}
          priority={false}
        />
      </div>
      <div className={styles.buttonContainer}>
        <h4 className={clsx(styles["videocard-title"])}>{highlight.title}</h4>
      </div>
      <Link
        href={`/beyond-tv/${highlight.id}`}
        className={styles["videocard-link"]}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          viewBox="0 0 585 684"
          className={styles["play-icon"]}
        >
          <path d="M0 49v605c0 11 5 20 15 26c4 3 11 4 16 4s9-1 14-4l524-302c10-7 16-16 16-27c0-10-6-19-16-26L45 23C27 10 0 26 0 49z" />
        </svg>
      </Link>
    </div>
  );
};

export default VideoCard;
