import React from "react";
import styles from "./VideoCard.module.css";
import clsx from "clsx";
import VideoCard from "./VideoCard";

interface IHighlight {
  id: string;
  title: string;
  coverImage: string;
}
function VideoCards({ videos }: { videos: IHighlight[] }) {
  return (
    <div className={clsx(styles.videocards)}>
      {videos.map((highlight) => {
        return <VideoCard highlight={highlight} key={highlight.id} />;
      })}
    </div>
  );
}

export default VideoCards;
