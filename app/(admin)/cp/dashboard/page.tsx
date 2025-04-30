"use client";
import { fetchDashboardData } from "@/app/_actions/actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import MatchCard from "@/components/admin/Card/MatchCard";
import MatchStats from "@/components/admin/Card/MatchStats";
import StatCard from "@/components/admin/Card/StatCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Scorers from "@/components/admin/Scorers/Scorers";
import DashboardSkeleton from "@/components/admin/Skeletons/DashboardSkeleton";
import Standing from "@/components/admin/Standing/Standing";
import {
  Box,
  HStack,
  SimpleGrid,
  GridItem,
  Card,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

function Dashboard() {
  const { data, error, isLoading } = useSWR("dashboard", fetchDashboardData);

  const dashboardData = data && data.data;

  return (
    <>
      <PageTitle pageTitle="Dashboard" />
      {error ? (
        <CustomAlert status="error" title={error.message} />
      ) : isLoading ? (
        <DashboardSkeleton isLoading={isLoading} />
      ) : !dashboardData || !dashboardData.totalCompetitions ? (
        <Card.Root
          size="md"
          p={"5"}
          border={"1px solid"}
          borderColor={"gray.200"}
        >
          <Card.Body color="fg.muted">
            <Heading
              as={"h2"}
              fontSize={"4xl"}
              fontWeight={"bold"}
              color={"text_lg"}
              mb={"5"}
            >
              Welcome Admin
            </Heading>
            <Text>
              To Get started, create a season, competitions, teams, competition
              season, matches, rounds and other resources.
            </Text>
          </Card.Body>
        </Card.Root>
      ) : (
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
                    {dashboardData.lastMatch && (
                      <MatchCard
                        match={dashboardData.lastMatch}
                        showMenu={false}
                      />
                    )}
                  </GridItem>
                  <GridItem colSpan={{ base: 1 }}>
                    {dashboardData.upcomingMatch && (
                      <MatchCard
                        match={dashboardData.upcomingMatch}
                        showMenu={false}
                      />
                    )}
                  </GridItem>
                </SimpleGrid>
              </GridItem>
              <GridItem colSpan={{ base: 1, xl: 3 }}>
                {dashboardData.upcomingCompetition && (
                  <MatchStats
                    played={dashboardData.upcomingCompetition.played}
                    win={dashboardData.upcomingCompetition.win}
                    draw={dashboardData.upcomingCompetition.draw}
                    lose={dashboardData.upcomingCompetition.lose}
                  />
                )}
              </GridItem>
            </SimpleGrid>
          </Box>
          <Box w="full" pb={"2px"} overflowX={"hidden"} as={"section"}>
            <SimpleGrid columns={{ base: 1, xl: 10 }} gap={"10px"}>
              <GridItem colSpan={{ base: 1, xl: 6 }}>
                {dashboardData.nnlStanding && (
                  <Standing name="NNL" standings={dashboardData.nnlStanding} />
                )}
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
