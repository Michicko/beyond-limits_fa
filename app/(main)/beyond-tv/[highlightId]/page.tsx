import React, { Suspense } from "react";
import styles from "./Highlight.module.css";
import clsx from "clsx";
import TextEditor from "@/components/TextEditor/TextEditor";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { Nullable } from "@/lib/definitions";
import SocialShareLinks from "@/components/main/Social/SocialShareLinks";
import Text from "@/components/main/Typography/Text";
import { Metadata } from "next";
import { capitalize } from "@/lib/helpers";

export async function generateMetadata({
  params,
}: {
  params: { highlightId: string };
}): Promise<Metadata> {
  const auth = await isAuthenticated();
  const authMode = auth ? "userPool" : "iam";

  const { data: highlight } = await cookiesClient.models.Highlight.get(
    { id: params.highlightId },
    {
      authMode,
      selectionSet: ["id", "description", "tags", "title", "coverImage"],
    }
  );

  return {
    title: highlight?.title && capitalize(highlight?.title),
    description: highlight?.title,
    keywords: highlight?.tags as string[],
    openGraph: {
      title: highlight?.title && capitalize(highlight?.title),
      description: highlight?.title,
      images: [{ url: highlight?.coverImage ?? "" }],
    },
  };
}

async function Highlight({ params }: { params: { highlightId: string } }) {
  const auth = await isAuthenticated();
  const authMode = auth ? "userPool" : "iam";

  const { data: highlightsData, errors } =
    await cookiesClient.models.Highlight.get(
      { id: params.highlightId },
      {
        authMode,
        selectionSet: ["id", "videoId", "description", "tags", "title"],
      }
    );

  const tags: Nullable<string>[] = highlightsData?.tags ?? [];

  if (errors) {
    return (
      <>
        <main className={clsx(styles["highlight-main"], styles.error)}>
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            Something went wrong
          </Text>
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {errors[0].message}
          </Text>
        </main>
      </>
    );
  }

  return (
    <>
      <header className={clsx(styles["highlight-header"])}>
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${highlightsData?.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </header>
      <main className={clsx(styles["highlight-main"])}>
        {highlightsData && (
          <Suspense fallback={null}>
            <TextEditor
              content={JSON.parse(highlightsData.description as string)}
              readOnly={true}
            />
          </Suspense>
        )}
        <div className={clsx(styles.tags)}>
          {tags.map((tag) => {
            return (
              <p key={tag} className={clsx(styles.tag)}>
                #{tag}
              </p>
            );
          })}
        </div>
        <SocialShareLinks
          text={`Check out this video: ${highlightsData?.title}`}
          url={`/beyond-tv/${params.highlightId}`}
        />
      </main>
    </>
  );
}

export default Highlight;
