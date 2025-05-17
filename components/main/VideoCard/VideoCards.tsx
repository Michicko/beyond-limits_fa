import React from "react";
import styles from "./VideoCard.module.css";
import clsx from "clsx";
import VideoCard from "./VideoCard";
import { sortByCreatedAt } from "@/lib/helpers";

interface IHighlight {
  id: string;
  title: string;
  coverImage: string;
  createdAt: string;
}

function VideoCards({ videos }: { videos: IHighlight[] }) {
  const sortedHighlights = sortByCreatedAt(videos);
  return (
    <div className={clsx(styles.videocards)}>
      {sortedHighlights.map((highlight) => {
        return <VideoCard highlight={highlight} key={highlight.id} />;
      })}
    </div>
  );
}

export default VideoCards;
