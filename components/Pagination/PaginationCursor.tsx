'use client';
import clsx from 'clsx';
import React from 'react'
import styles from './Pagination.module.css';

function PaginationCursor({nextToken, setPageTokens, setCurrentPageIndex, pageTokens, currentPageIndex,}: {nextToken?: string| null; setPageTokens: React.Dispatch<React.SetStateAction<(string | null)[]>>, setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>, pageTokens: (string | null)[], currentPageIndex: number;}) {

  const handleNextPage = () => {
    if (!nextToken) return;
  
    setPageTokens((prevTokens) => [...prevTokens, nextToken]);
    setCurrentPageIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevPage = () => {
    setPageTokens((prevTokens) => {
      const updated = [...prevTokens];
      updated.pop(); // remove current
      return updated;
    });
  
    setCurrentPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className={clsx(styles['pagination-cursor'])}>
      <button disabled={currentPageIndex === 0} onClick={handlePrevPage}>prev</button>
      <button disabled={!nextToken} onClick={handleNextPage}>next</button>
    </div>
  )
}

export default PaginationCursor

