export const dynamic = "force-dynamic";

import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { findCurrentSeason, getMatches } from "@/lib/helpers";
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
  const title = `Fixtures & Results ${seasonLabel}`;
  const description = `Find the current fixtures & results for Beyond Limits FA. First team in the ${seasonLabel} on the official website, Beyondlimitsfa.com.`;

  return {
    title,
    description,
  };
}

async function CompetitionFixtures({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams: Promise<{
    month: string;
    season: string;
  }>;
}) {
  const searchParam = await searchParams;
  const auth = await isAuthenticated();
  const date = new Date();
  const currentYear = date.getUTCFullYear();

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

  let fixtures;
  const currentSeason =
    competitionSeasons &&
    findCurrentSeason(competitionSeasons, new Date(), searchParam.season);

  if (currentSeason) {
    fixtures = getMatches(
      currentSeason?.matches,
      "UPCOMING",
      searchParam.month
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
        ) : !fixtures || (fixtures && fixtures.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Fixtures available at the moment.
          </Text>
        ) : (
          <Grid gap="sm">
            {fixtures.map((match) => {
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

export default CompetitionFixtures;
