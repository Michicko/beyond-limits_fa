import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import Seasons from "@/components/main/Filters/Seasons";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { findCurrentSeason, getFixturesResults } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams?: { season?: string };
}) {
  const auth = await isAuthenticated();
  const { data: competitionSeasons } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        competitionId: {
          eq: params.competitionId,
        },
      },
      authMode: auth ? "userPool" : "iam",
      selectionSet: ["name", "season", "seasonStartMonth"],
    });

  const currentSeason =
    competitionSeasons &&
    findCurrentSeason(competitionSeasons, new Date(), searchParams?.season);

  const seasonLabel = currentSeason?.season ?? "Season";
  const title = `Fixtures & Results | ${seasonLabel}`;
  const description = `Find the current fixtures & results for Beyond Limits FA. First team in the ${seasonLabel} on the official website, Beyondlimitsfa.com.`;

  return {
    title,
    description,
  };
}

async function resultsFixtures({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams: Promise<{
    month: string;
    season: string;
    year: string;
  }>;
}) {
  const searchParam = await searchParams;
  const auth = await isAuthenticated();

  const { data: competitionSeasons, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        competitionId: {
          eq: params.competitionId,
        },
      },
      authMode: auth ? "userPool" : "iam",
      selectionSet: [
        "id",
        "season",
        "seasonStartMonth",
        "matches.*",
        "name",
        "matches.competitionSeason.*",
      ],
    });

  let matches;
  const currentSeason =
    competitionSeasons &&
    findCurrentSeason(competitionSeasons, new Date(), searchParam.season);

  if (currentSeason) {
    matches = getFixturesResults(
      currentSeason.matches,
      ["UPCOMING", "COMPLETED"],
      searchParam.month,
      +searchParam.year
    );
  }

  const years = currentSeason?.season.trim().split("/") ?? [];

  return (
    <CompetitionsLayout
      pageTitle={currentSeason?.name}
      competitionId={params.competitionId}
      seasons={competitionSeasons.map((el) => el.season) ?? []}
      currentSeason={currentSeason?.season}
    >
      <>
        <Suspense fallback={null}>
          <Calendar years={years} />
        </Suspense>
        {errors ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {errors[0].message}
          </Text>
        ) : !currentSeason ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Season available at the moment.
          </Text>
        ) : !matches || (matches && matches.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Matches available at the moment.
          </Text>
        ) : (
          <Grid gap="sm">
            {matches.map((match) => {
              return (
                <MatchCard
                  match={match}
                  key={match.id}
                  showName={true}
                  theme="light"
                />
              );
            })}
          </Grid>
        )}
      </>
    </CompetitionsLayout>
  );
}

export default resultsFixtures;
