import { Schema } from "@/amplify/data/resource";
import { fetchDashboardData } from "@/app/_actions/actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import MatchCard from "@/components/admin/Card/MatchCard";
import MatchStats from "@/components/admin/Card/MatchStats";
import StatCard from "@/components/admin/Card/StatCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Scorers from "@/components/admin/Scorers/Scorers";
import Standing from "@/components/admin/Standing/Standing";
import { leagues, standing } from "@/lib/placeholder-data";
import { Box, HStack, SimpleGrid, GridItem } from "@chakra-ui/react";
import React from "react";

async function Dashboard() {
  const {
    data: dashboardContent,
    status,
    message,
  } = await fetchDashboardData();

  const dashboardData = dashboardContent && dashboardContent;

  return (
    <>
      <PageTitle pageTitle="Dashboard" />
      {status === "error"
        ? message && <CustomAlert status="error" title={message} />
        : dashboardData && (
            <>
              <Box
                w="full"
                pb={"2px"}
                overflowX={"hidden"}
                as={"section"}
                mb={"11px"}
              >
                <HStack w={"full"} overflowX={"auto"} pb={"8px"}>
                  <StatCard
                    name="Competitions"
                    value={`${dashboardData?.totalCompetitions}`}
                  />
                  <StatCard
                    name="Active"
                    value={`${dashboardData?.activeCompetitions}`}
                  />
                  <StatCard
                    name="Win"
                    value={`${dashboardData.matchSummary.wins}`}
                    type="success"
                  />
                  <StatCard
                    name="Draw"
                    value={`${dashboardData.matchSummary.draws}`}
                    type="warning"
                  />
                  <StatCard
                    name="Lose"
                    value={`${dashboardData.matchSummary.losses}`}
                    type="error"
                  />
                </HStack>
              </Box>
              {dashboardData.upcomingMatch && dashboardData.lastMatch && (
                <Box
                  w="full"
                  pb={"2px"}
                  overflowX={"hidden"}
                  as={"section"}
                  mb={"19px"}
                >
                  <SimpleGrid columns={{ base: 1, xl: 8 }} gap={"10px"}>
                    <GridItem colSpan={{ base: 1, xl: 5 }}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} gap={"10px"}>
                        <GridItem colSpan={{ base: 1 }}>
                          <MatchCard
                            match={dashboardData.lastMatch}
                            showMenu={false}
                          />
                        </GridItem>
                        <GridItem colSpan={{ base: 1 }}>
                          <MatchCard
                            match={dashboardData.upcomingMatch}
                            showMenu={false}
                          />
                        </GridItem>
                      </SimpleGrid>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, xl: 3 }}>
                      <MatchStats
                        played={dashboardData.upcomingCompetition.played}
                        win={dashboardData.upcomingCompetition.win}
                        draw={dashboardData.upcomingCompetition.draw}
                        lose={dashboardData.upcomingCompetition.lose}
                      />
                    </GridItem>
                  </SimpleGrid>
                </Box>
              )}
              <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"}>
                <SimpleGrid columns={{ base: 1, xl: 10 }} gap={"10px"}>
                  <GridItem colSpan={{ base: 1, xl: 6 }}>
                    <Standing
                      name="NNL"
                      standings={dashboardData.nnlStanding}
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: 1, xl: 4 }}>
                    {dashboardData.goalRanking && (
                      <Scorers ranking={dashboardData.goalRanking} />
                    )}
                  </GridItem>
                </SimpleGrid>
              </Box>
            </>
          )}
    </>
  );
}

export default Dashboard;
