'use client';
import React from 'react'

function useCursorPaginate() {
  const [pageTokens, setPageTokens] = React.useState<(string | null)[]>([null]);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const currentToken = pageTokens[currentPageIndex] ?? null;

  return {
    setPageTokens,
    currentPageIndex,
    currentToken,
    setCurrentPageIndex,
    pageTokens
  }
}

export default useCursorPaginate