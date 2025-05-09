import ArticleList from "@/components/Article/ArticleList";
import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import Pagination from "@/components/Pagination/Pagination";
import { clientPaginate } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React from "react";
import Text from "@/components/main/Typography/Text";

const links = [
  { name: "Academy news", href: "/news" },
  { name: "Beyon limits tv", href: "/beyond-tv" },
];

async function News({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const currentPage = +(searchParams.page ?? 1);
  const limit = 12;

  const filter = {
    status: { eq: "PUBLISHED" },
    ...(searchParams.category && {
      category: { 
        eq: searchParams.category.toLowerCase(),
      },
    }),
  };

  const { data: articleList, errors } = await cookiesClient.models.Article.list({
    limit: 150,
    authMode: (await isAuthenticated()) ? "userPool" : "iam",
    filter,
    sortDirection: "DESC",
    selectionSet: [
      "id",
      "category",
      "content",
      "tags",
      "title",
      "coverImage",
      "status",
      "createdAt",
      "matchId",
      "matchHomeTeamLogo",
      "matchAwayTeamLogo",
    ],
  });


  const { paginatedItems: articles, hasNextPage } = clientPaginate(
    articleList,
    currentPage,
    limit
  );


  return (
    <ArticleLayout links={links} theme="theme-1" bg="trans">
      <div className="main-container">
        {errors && (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {`Something went wrong, ${errors[0].message}`}
          </Text>
        )}
        {searchParams.category && (
          <Text color="white" letterCase={"lower"} size="md" weight="regular" cssStyles={{marginBottom: '2rem', fontSize: '1.4rem'}}>
            Showing articles for {searchParams.category}
          </Text>
        )}
        {!articles ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No articles available
         </Text>
        ) : (
          <>
            <ArticleList articles={articles} />
            <Pagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              basePath="/news"
            />
          </>
        )}
      </div>
    </ArticleLayout>
  );
}

export default News;
