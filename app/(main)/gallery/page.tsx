import React from "react";
import styles from "./Gallery.module.css";
import clsx from "clsx";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import Text from "@/components/main/Typography/Text";
import GalleryClient from "@/components/main/NewsClient/GalleryClient";
import Album from "@/components/main/Gallery/Album";

export const metadata = {
  title: "Gallery",
  description: "Check out our gallery.",
};

async function Gallery() {
  // const limit = 15;
  // const token = "";
  // const auth = await isAuthenticated();

  // const {
  //   data: visualsData,
  //   errors,
  //   nextToken,
  // } = await cookiesClient.models.Visual.list({
  //   authMode: auth ? "userPool" : "iam",
  //   selectionSet: ["id", "url", "alt", "createdAt"],
  //   limit,
  //   nextToken: token,
  //   sortDirection: "DESC",
  // });

  // const visuals = visualsData ?? [];

  const albums = [
    {
      id: 1,
      coverImage: "academy-news.JPG",
      title: "NNL 2024 campaign",
    },
    {
      id: 2,
      coverImage: "academy-news.JPG",
      title: "TCC 2024 campaign",
    },
    {
      id: 3,
      coverImage: "academy-news.JPG",
      title: "TCCL 2024 campaign",
    },
    {
      id: 4,
      coverImage: "academy-news.JPG",
      title: "Viareggio cup 2024 campaign",
    },
  ];

  return (
    <div className={clsx(styles["main-container"])}>
      {/* {errors ? (
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
      )} */}
      <div className={clsx(styles.albums)}>
        {albums.map((album) => {
          return <Album album={album} key={album.id} />;
        })}
      </div>
    </div>
  );
}

export default Gallery;
