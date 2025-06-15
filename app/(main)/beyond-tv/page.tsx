import ArticleLayout from "@/components/main/Layouts/ArticleLayout";
import HighlightClient from "@/components/main/NewsClient/HighlightClient";
import Text from "@/components/main/Typography/Text";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React from "react";

const links = [
  { name: "Academy news", href: "/news" },
  { name: "Beyond limits tv", href: "/beyond-tv" },
];

export const metadata = {
  title: "Beyond Tv",
  description:
    "Find videos and short match highlights of Beyond Limits Fa. on the official website, Beyondlimitsfa.com.",
};

async function BeyondTv() {
  const limit = 15;
  const token = "";
  const auth = await isAuthenticated();

  const {
    data: highlightsData,
    errors,
    nextToken,
  } = await cookiesClient.models.Highlight.list({
    authMode: auth ? "userPool" : "iam",
    selectionSet: ["id", "coverImage", "title", "createdAt"],
    limit,
    nextToken: token,
    sortDirection: "DESC",
  });

  const highlights = highlightsData ?? [];

  return (
    <ArticleLayout bg="trans" theme="theme-1" links={links}>
      <div className="main-container">
        {errors ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {`Something went wrong, ${errors[0].message}`}
          </Text>
        ) : !highlights || highlights.length < 1 ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Highlights available at the moment.
          </Text>
        ) : (
          highlights &&
          highlights.length > 0 && (
            <HighlightClient
              auth={auth}
              initialItems={highlights}
              initialNextToken={nextToken}
            />
          )
        )}
      </div>
    </ArticleLayout>
  );
}

export default BeyondTv;
