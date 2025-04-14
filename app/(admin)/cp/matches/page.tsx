import CustomAlert from "@/components/admin/Alert/CustomAlert";
import MatchCard from "@/components/admin/Card/MatchCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import Pagination from "@/components/admin/Pagination/Pagination";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, Button, Grid, GridItem, HStack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

async function Matches() {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

  const { data: matches, errors } = await cookiesClient.models.Match.list({
    selectionSet: [
      "id",
      "status",
      "competitionSeasonId",
      "competitionSeason.logo",
      "competitionSeason.name",
      "competitionSeason.season",
      "date",
      "time",
      "venue",
      "status",
      "aboutKeyPlayer",
      "keyPlayerId",
      "aboutMvp",
      "mvpId",
      "time",
      "status",
      "review",
      "report",
      "lineup",
      "substitutes",
      "homeTeam.*",
      "awayTeam.*",
      "coach.name",
      "coach.role",
      "scorers",
    ],
  });

  console.log(matches);

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
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : matches.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Match."
            message={"No match available, create some to get started."}
          />
        ) : (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={"20px"}
            mb={"100px"}
          >
            {matches.map((match) => {
              return (
                <GridItem key={match.id}>
                  <MatchCard match={match} showMenu={true} />
                </GridItem>
              );
            })}
          </Grid>
        )}
        {matches && matches.length > 0 && (
          <HStack justify={"center"} w={"full"}>
            <Pagination />
          </HStack>
        )}
      </Box>
    </>
  );
}

export default Matches;
