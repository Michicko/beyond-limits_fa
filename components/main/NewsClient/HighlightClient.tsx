'use client';
import React, { useEffect, useState } from 'react'
import VideoCards from '../VideoCard/VideoCards'
import PaginationCursor from '@/components/Pagination/PaginationCursor'
import NewsSkeleton from './NewsSkeleton'
import clsx from 'clsx'
import styles from './NewsClient.module.css';
import useCursorPaginate from '@/hooks/useCursorPaginate';
import useSWR from 'swr';
import { sortByCreatedAt } from '@/lib/helpers';
import { fetchHighlightsServer } from '@/app/_actions/actions';

type IHighlight = {
  id: string;
  title: string;
  coverImage: string;
  createdAt: string;
}

type Props = {
  initialItems: IHighlight[];
  initialNextToken?: string | null;
  auth: boolean;
};

function HighlightClient({ auth, initialItems, initialNextToken }: Props) {
    const [items, setItems] = useState(initialItems);
    const [nextToken, setNextToken] = useState(initialNextToken);
    const {setPageTokens, currentPageIndex, currentToken, setCurrentPageIndex, pageTokens} = useCursorPaginate(initialNextToken);
  
    const { data, isValidating } = useSWR(
      currentPageIndex === 0 ? null : ['highlights', currentPageIndex],
      () => fetchHighlightsServer(auth, currentToken),
      {
        revalidateOnFocus: false,
        onSuccess: (res) => {
          if(res.data){
            if(!res.data.nextToken){
              setNextToken(null);
              setItems([]);
              return
            }
  
            setItems(res.data.highlights);
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
            <div className={clsx(styles.skeletons, styles.highlights)}>
              <NewsSkeleton loading={isValidating} />  
              <NewsSkeleton loading={isValidating} />  
              <NewsSkeleton loading={isValidating} />  
              <NewsSkeleton loading={isValidating} />  
              <NewsSkeleton loading={isValidating} />  
              <NewsSkeleton loading={isValidating} />  
            </div>
             : 
             <VideoCards videos={items} />
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

export default HighlightClient