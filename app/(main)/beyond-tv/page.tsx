import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import VideoCards from "@/components/main/VideoCard/VideoCards";
import { match_highlights } from "@/lib/placeholder-data";
import React from "react";

const links = [
  { name: "Academy news", href: "/news" },
  { name: "Beyond limits tv", href: "/beyond-tv" },
];

function BeyondTv() {
  return (
    <ArticleLayout bg="trans" theme="theme-1" links={links}>
      <div className="main-container">
        <VideoCards videos={match_highlights} />
        {/* pagination */}
      </div>
    </ArticleLayout>
  );
}

export default BeyondTv;
