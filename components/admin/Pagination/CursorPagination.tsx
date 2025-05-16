'use client';
import { Button, Flex } from '@chakra-ui/react'
import React from 'react'

function CursorPagination({nextToken, setPageTokens, setCurrentPageIndex, pageTokens, currentPageIndex,}: {nextToken?: string| null; setPageTokens: React.Dispatch<React.SetStateAction<(string | null)[]>>, setCurrentPageIndex: React.Dispatch<React.SetStateAction<number>>, pageTokens: (string | null)[], currentPageIndex: number;}) {

  const handleNextPage = () => {
    if (!nextToken) return;

    setPageTokens((prevTokens) => [...prevTokens, nextToken]);
    setCurrentPageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} mt={5}>
      <Button disabled={currentPageIndex === 0} onClick={() => setCurrentPageIndex(currentPageIndex - 1)} px={'10px'} variant={'outline'} colorPalette={'gray'}>Previous</Button>
      <Button disabled={!nextToken} onClick={handleNextPage} px={'10px'} variant={'outline'} colorPalette={'gray'}>Next</Button>
    </Flex>
  )
}

export default CursorPagination