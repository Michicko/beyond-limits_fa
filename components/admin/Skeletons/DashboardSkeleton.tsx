import { Box, GridItem, HStack, SimpleGrid, Skeleton } from "@chakra-ui/react";
import React from "react";

function DashboardSkeleton({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <HStack w={"full"} overflowX={"auto"} pb={"8px"}>
        <Skeleton h={"95px"} w={"full"} maxW={"180px"} loading={isLoading} />
        <Skeleton h={"95px"} w={"full"} maxW={"180px"} loading={isLoading} />
        <Skeleton h={"95px"} w={"full"} maxW={"180px"} loading={isLoading} />
        <Skeleton h={"95px"} w={"full"} maxW={"180px"} loading={isLoading} />
      </HStack>
      <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"} mb={"19px"}>
        <SimpleGrid columns={{ base: 1, xl: 8 }} gap={"10px"}>
          <GridItem colSpan={{ base: 1, xl: 5 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={"10px"}>
              <GridItem colSpan={{ base: 1 }}>
                <Skeleton h={"160px"} w={"full"} loading={isLoading} />
              </GridItem>
              <GridItem colSpan={{ base: 1 }}>
                <Skeleton h={"160px"} w={"full"} loading={isLoading} />
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={{ base: 1, xl: 3 }}>
            <Skeleton h={"165px"} w={"full"} loading={isLoading} />
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"}>
        <SimpleGrid columns={{ base: 1, xl: 10 }} gap={"10px"}>
          <GridItem colSpan={{ base: 1, xl: 6 }}>
            <Skeleton h={"250px"} w={"full"} loading={isLoading} />
          </GridItem>
          <GridItem colSpan={{ base: 1, xl: 4 }}>
            <Skeleton h={"300px"} w={"full"} loading={isLoading} />
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default DashboardSkeleton;
