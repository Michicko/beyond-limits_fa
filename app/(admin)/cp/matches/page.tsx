import MatchCard from "@/components/admin/Card/MatchCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import { matches } from "@/lib/placeholder-data";
import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Matches() {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };
  return (
    <>
      <PageTitle pageTitle="Matches" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-end"} mb={4}>
          <Button
            colorPalette={"blue"}
            variant={"solid"}
            css={btnStyles}
            size={"md"}
            asChild
          >
            <Link href={"/cp/matches/create"}>Create Match</Link>
          </Button>
        </HStack>
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={"20px"}
          mb={"20px"}
        >
          {matches.map((match) => {
            return (
              <GridItem key={match.id}>
                <MatchCard match={match} showMenu={true} />
              </GridItem>
            );
          })}
        </Grid>
        <HStack justify={"center"} w={"full"}>
          <Pagination />
        </HStack>
      </Box>
    </>
  );
}

export default Matches;
