"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./NewsClient.module.css";
import useCursorPaginate from "@/hooks/useCursorPaginate";
import useSWR from "swr";
import NewsSkeleton from "./NewsSkeleton";
import ImageCard from "../Card/ImageCard";
import PaginationCursor from "@/components/Pagination/PaginationCursor";
import { fetchVisualsServer } from "@/app/_actions/actions";
import { Nullable } from "@/lib/definitions";

type IVisual = {
  id: string;
  url: string;
  alt: Nullable<string>;
  createdAt: string;
};

type Props = {
  initialItems: IVisual[];
  initialNextToken?: string | null;
  auth: boolean;
};

function GalleryClient({ auth, initialItems, initialNextToken }: Props) {
  const [items, setItems] = useState(initialItems);
  const [nextToken, setNextToken] = useState(initialNextToken);
  const {
    setPageTokens,
    currentPageIndex,
    currentToken,
    setCurrentPageIndex,
    pageTokens,
  } = useCursorPaginate(initialNextToken);

  const { data, isValidating } = useSWR(
    currentPageIndex === 0 ? null : ["visuals", currentPageIndex],
    () => fetchVisualsServer(auth, currentToken),
    {
      revalidateOnFocus: false,
      onSuccess: (res) => {
        if (res.data) {
          if (!res.data.nextToken) {
            setNextToken(null);
            setItems([]);
            return;
          }

          setItems(res.data.visuals);
          setNextToken(res.data.nextToken);
        }
      },
    }
  );

  useEffect(() => {
    if (currentPageIndex === 0) {
      setItems(initialItems);
      setNextToken(initialNextToken);
    }
  }, [currentPageIndex, initialItems, initialNextToken]);

  return (
    <>
      <div className={clsx(styles["gallery-client"])}>
        {isValidating ? (
          <div className={clsx(styles.skeletons, styles.gallery)}>
            <NewsSkeleton loading={isValidating} />
            <NewsSkeleton loading={isValidating} />
            <NewsSkeleton loading={isValidating} />
            <NewsSkeleton loading={isValidating} />
            <NewsSkeleton loading={isValidating} />
            <NewsSkeleton loading={isValidating} />
          </div>
        ) : (
          <>
            {items.map((visual) => {
              return <ImageCard visual={visual.url} key={visual.id} />;
            })}
          </>
        )}
      </div>
      <PaginationCursor
        currentPageIndex={currentPageIndex}
        setCurrentPageIndex={setCurrentPageIndex}
        pageTokens={pageTokens}
        setPageTokens={setPageTokens}
        nextToken={nextToken}
      />
    </>
  );
}

export default GalleryClient;
