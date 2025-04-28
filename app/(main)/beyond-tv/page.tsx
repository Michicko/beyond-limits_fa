import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import VideoCards from "@/components/main/VideoCard/VideoCards";
import { clientPaginate } from "@/lib/helpers";
import { match_highlights } from "@/lib/placeholder-data";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React from "react";

const links = [
  { name: "Academy news", href: "/news" },
  { name: "Beyond limits tv", href: "/beyond-tv" },
];

async function BeyondTv({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const currentPage = +(searchParams.page ?? 1);
  const limit = 10;
  const { data: highlightsData, errors } =
    await cookiesClient.models.Highlight.list({
      authMode: (await isAuthenticated()) ? "userPool" : "iam",
      selectionSet: ["id", "coverImage", "title"],
      limit: 200,
    });

  const { paginatedItems: highlights, hasNextPage } = clientPaginate(
    highlightsData,
    currentPage,
    limit
  );

  console.log(highlights);

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
