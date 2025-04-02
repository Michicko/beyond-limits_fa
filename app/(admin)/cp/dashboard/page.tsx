import MatchCard from "@/components/admin/Card/MatchCard";
import MatchStats from "@/components/admin/Card/MatchStats";
import StatCard from "@/components/admin/Card/StatCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Scorers from "@/components/admin/Scorers/Scorers";
import Standing from "@/components/admin/Standing/Standing";
import { leagues, matches, standing } from "@/lib/placeholder-data";
import { Box, HStack, SimpleGrid, GridItem } from "@chakra-ui/react";
import React from "react";

const league = leagues.find((el) => el.competition?.short_name === "nnl");
const standings = standing.filter((el) => el.league_id === league?.id);

function Dashboard() {
  return (
    <>
      <PageTitle pageTitle="Dashboard" />
      <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"} mb={"11px"}>
        <HStack w={"full"} overflowX={"auto"} pb={"8px"}>
          <StatCard name="Competitions" value="4" />
          <StatCard name="Active" value="3" />
          <StatCard name="Win" value="24" type="success" />

          <StatCard name="Draw" value="5" type="warning" />
          <StatCard name="Lose" value="4" type="error" />
        </HStack>
      </Box>
      <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"} mb={"19px"}>
        <SimpleGrid columns={{ base: 1, xl: 8 }} gap={"10px"}>
          <GridItem colSpan={{ base: 1, xl: 5 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={"10px"}>
              <GridItem colSpan={{ base: 1 }}>
                <MatchCard match={matches[1]} showMenu={false} />
              </GridItem>
              <GridItem colSpan={{ base: 1 }}>
                <MatchCard match={matches[0]} showMenu={false} />
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem colSpan={{ base: 1, xl: 3 }}>
            <MatchStats />
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"}>
        <SimpleGrid columns={{ base: 1, xl: 10 }} gap={"10px"}>
          <GridItem colSpan={{ base: 1, xl: 6 }}>
            <Standing name="NNL" standings={standings} />
          </GridItem>
          <GridItem colSpan={{ base: 1, xl: 4 }}>
            <Scorers />
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Dashboard;
