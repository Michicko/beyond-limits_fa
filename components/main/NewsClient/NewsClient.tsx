
'use client';
import { fetchArticlesServer } from '@/app/_actions/actions';
import ArticleList from '@/components/Article/ArticleList';
import PaginationCursor from '@/components/Pagination/PaginationCursor';
import useCursorPaginate from '@/hooks/useCursorPaginate';
import { IArticle } from '@/lib/definitions';
import { sortByCreatedAt } from '@/lib/helpers';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import styles from './NewsClient.module.css';
import clsx from 'clsx';
import NewsSkeleton from './NewsSkeleton';

type Props = {
  initialItems: IArticle[];
  initialNextToken?: string | null;
  auth: boolean;
  category?: string
};

function NewsClient({ auth, category, initialItems, initialNextToken }: Props) {
  const [items, setItems] = useState(initialItems);
  const [nextToken, setNextToken] = useState(initialNextToken);
  const {setPageTokens, currentPageIndex, currentToken, setCurrentPageIndex, pageTokens} = useCursorPaginate(initialNextToken);

  const { data, isValidating } = useSWR(
    currentPageIndex === 0 ? null : ['articles', currentPageIndex],
    () => fetchArticlesServer(auth, category, currentToken),
    {
      revalidateOnFocus: false,
      onSuccess: (res) => {
        if(res.data){
          if(!res.data.nextToken){
            setNextToken(null);
            setItems([]);
            return
          }

          setItems(res.data.articles);
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
    <div className={clsx(styles['news-client'])}>
      {
        isValidating ? 
        <div className={clsx(styles.skeletons)}>
          <NewsSkeleton loading={isValidating} />  
          <NewsSkeleton loading={isValidating} />  
          <NewsSkeleton loading={isValidating} />  
          <NewsSkeleton loading={isValidating} />  
          <NewsSkeleton loading={isValidating} />  
          <NewsSkeleton loading={isValidating} />  
        </div>
         : 
        <ArticleList articles={items} />
      }
    </div>
      <PaginationCursor 
         currentPageIndex={currentPageIndex}
         setCurrentPageIndex={setCurrentPageIndex}
         pageTokens={pageTokens}
         setPageTokens={setPageTokens}
         nextToken={nextToken}
      />
    </>
  )
}

export default NewsClient