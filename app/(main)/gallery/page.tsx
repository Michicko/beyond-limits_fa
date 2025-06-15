import React from "react";
import styles from "./Gallery.module.css";
import clsx from "clsx";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import Text from "@/components/main/Typography/Text";
import GalleryClient from "@/components/main/NewsClient/GalleryClient";

export const metadata = {
  title: "Gallery",
  description: "Check out our gallery.",
};

async function Gallery() {
  const limit = 15;
  const token = "";
  const auth = await isAuthenticated();

  const {
    data: visualsData,
    errors,
    nextToken,
  } = await cookiesClient.models.Visual.list({
    authMode: auth ? "userPool" : "iam",
    selectionSet: ["id", "url", "alt", "createdAt"],
    limit,
    nextToken: token,
    sortDirection: "DESC",
  });

  const visuals = visualsData ?? [];

  return (
    <div className={clsx(styles["main-container"])}>
      {errors ? (
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {`Something went wrong, ${errors[0].message}`}
        </Text>
      ) : !visuals || visuals.length < 1 ? (
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          No Visuals available at the moment.
        </Text>
      ) : (
        visuals &&
        visuals.length > 0 && (
          <GalleryClient
            auth={auth}
            initialItems={visuals}
            initialNextToken={nextToken}
          />
        )
      )}
    </div>
  );
}

export default Gallery;
