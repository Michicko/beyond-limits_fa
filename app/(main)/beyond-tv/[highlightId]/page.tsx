import React, { Suspense } from "react";
import styles from "./Highlight.module.css";
import clsx from "clsx";
import TextEditor from "@/components/TextEditor/TextEditor";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { Nullable } from "@/lib/definitions";
import SocialShareLinks from "@/components/main/Social/SocialShareLinks";

async function Highlight({ params }: { params: { highlightId: string } }) {
  const authMode = (await isAuthenticated()) ? "userPool" : "iam";

  const { data: highlightsData, errors: matchErrors } =
    await cookiesClient.models.Highlight.get(
      { id: params.highlightId },
      {
        authMode,
        selectionSet: ["id", "videoId", "description", "tags", "title"],
      }
    );

  const tags: Nullable<string>[] = highlightsData?.tags ?? [];
  const description = highlightsData?.description ?? {};

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
        <Suspense fallback={null}>
          <TextEditor
            content={JSON.parse(description as string)}
            readOnly={true}
          />
        </Suspense>
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
