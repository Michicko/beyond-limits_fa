import React, { Suspense } from "react";
import styles from "./Highlight.module.css";
import clsx from "clsx";
import TextEditor from "@/components/TextEditor/TextEditor";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { Nullable } from "@/lib/definitions";
import SocialShareLinks from "@/components/main/Social/SocialShareLinks";
import Text from "@/components/main/Typography/Text";

async function Highlight({ params }: { params: { highlightId: string } }) {
  const authMode = (await isAuthenticated()) ? "userPool" : "iam";

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
      <main className={clsx(styles["highlight-main"])}>
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {`Something went wrong, ${errors[0].message}`}
        </Text>
      </main>
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
