'use client';
import React from 'react'

function useCursorPaginate(initialToken?: string | null) {
  const [pageTokens, setPageTokens] = React.useState<(string | null)[]>([initialToken ?? null]);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const currentToken = pageTokens[currentPageIndex] ?? initialToken;

  return {
    setPageTokens,
    currentPageIndex,
    currentToken,
    setCurrentPageIndex,
    pageTokens,
  }
}

export default useCursorPaginate