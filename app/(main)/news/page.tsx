import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React from "react";
import Text from "@/components/main/Typography/Text";
import NewsClient from "@/components/main/NewsClient/NewsClient";

const links = [
  { name: "Academy news", href: "/news" },
  { name: "Beyond limits tv", href: "/beyond-tv" },
];

async function News({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const auth = await isAuthenticated()
  const limit = 15;
  const token = '';

  const filter = {
    status: { eq: "PUBLISHED" },
    ...(searchParams.category && {
      category: { 
        eq: searchParams.category.toLowerCase(),
      },
    }),
  };

  const { data: articleList, errors, nextToken } = await cookiesClient.models.Article.list({
    limit,
    authMode: (await isAuthenticated()) ? "userPool" : "iam",
    filter,
    nextToken: token,
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

  const articles = articleList ?? [];

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
        {!articles || articleList.length < 1 ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No articles available
         </Text>
        ) : (
        <NewsClient 
          auth={auth}
          initialItems={articles}
          initialNextToken={nextToken}
          category={searchParams.category}
        />
        )}
      </div>
    </ArticleLayout>
  );
}

export default News;
