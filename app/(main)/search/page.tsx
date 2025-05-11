import React from "react";
import styles from "./Search.module.css";
import clsx from "clsx";
import { globalSearch } from "@/app/_actions/actions";
import PlayerList from "@/components/main/Player/PlayerList";
import ArticleList from "@/components/Article/ArticleList";
import VideoCards from "@/components/main/VideoCard/VideoCards";
import CompetitionList from "@/components/main/Competition/CompetitionList";
import { isAuthenticated } from "@/utils/amplify-utils";
import EmptyResult from "@/components/Search/EmptyResult";
import SearchError from "@/components/Search/SearchError";

async function search(props: {
  searchParams: Promise<{
    q: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const {q} = searchParams;
  const authenticated = await isAuthenticated();

  const { data: searchResults, status, error } = await globalSearch(q, authenticated ? 'auth' : 'guest');
  const competitions = searchResults?.competitions ?? [];
  const players = searchResults?.players ?? [];
  const articles = searchResults?.articles ?? [];
  const highlights = searchResults?.highlights ?? [];

  return (
    <div className={clsx(styles.container)}>
      <h1>Search results for: "{q}"</h1>
      {
        status === 200 && [competitions, players, articles, highlights].some(arr => arr.length > 0) && (competitions) ? ( 
        <div className={clsx(styles["result-box"])}>
          {
            competitions.length > 0 && (
              <div className={clsx(styles['search-row'])}>
                <h3>Competitions matching your search...</h3>
                <CompetitionList competitions={competitions} />
              </div>
            )
          }
          {
            players.length > 0 && 
            <div className={clsx(styles['search-row'])}>
              <h3>Players matching your search...</h3>
              <PlayerList players={players} />
            </div>
          }
          {
            articles.length > 0 && (
             <div className={clsx(styles['search-row'])}>
               <h3>Articles matching your search...</h3>
               <ArticleList articles={articles} />
              </div>
              )
          }
          {
            highlights.length > 0 &&
            <div className={clsx(styles['search-row'])}>
              <h3>Highlights matching your search...</h3>
              <VideoCards videos={highlights} />
            </div>
          }
        </div>
        )
         : status === 200 ? <EmptyResult keyword={q} /> :
          <SearchError error={error} />
        }
    </div>
  );
}

export default search;
