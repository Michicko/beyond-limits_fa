import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { capitalize, findCurrentSeason, getMatchesByDateRange } from "@/lib/helpers";
import { months } from "@/lib/placeholder-data";
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
  const { data: competitionSeasons } = await cookiesClient.models.CompetitionSeason.list({
    filter: {
      competitionId: {
        eq: params.competitionId,
      },
    },
    authMode: auth ? "userPool" : "iam",
    selectionSet: ['name', "season", "seasonStartMonth"],
  });

  const currentSeason = competitionSeasons &&
    findCurrentSeason(competitionSeasons, new Date(), searchParams?.season);

  const seasonLabel = currentSeason?.season ?? "Season";
  const title = `Fixtures & Results ${seasonLabel}`;
  const description = `Find the current fixtures & results for Beyond Limits FA. First team in the ${seasonLabel} on the official website, Beyondlimitsfa.com.`;

  return {
    title,
    description,
  };
}

async function CompetitionResults({
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
  const year = new Date().getUTCFullYear();
  const monthIndex = months.indexOf(searchParam.month.toLowerCase());  
  const auth = await isAuthenticated()

  const { data: competitionSeasons, errors} =
    await cookiesClient.models.CompetitionSeason.list(
      {
        filter: {
          competitionId: {
            eq: params.competitionId,
          }
        },
        authMode: auth ? "userPool" : "iam",
        selectionSet: [
          "id",
          "matches.*",
          "season",
          "seasonStartMonth",
          "name",
          "matches.competitionSeason.*",
        ],
      },
    );

  const startDate = new Date(year, monthIndex, 1); 
  const endDate = new Date(year, monthIndex + 1, 1);

  let results;
  const currentSeason = competitionSeasons && findCurrentSeason(competitionSeasons, new Date(), searchParam.season);
  
  if (currentSeason) {
    results = getMatchesByDateRange(currentSeason?.matches, "COMPLETED", startDate, endDate);
  }

  return (
    <CompetitionsLayout
      pageTitle={currentSeason?.name}
      competitionId={params.competitionId}
      seasons={competitionSeasons.map((el) => el.season) ?? []}
      currentSeason={currentSeason?.season}
    >
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {errors ? 
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {errors[0].message}
        </Text>:
        !results || (results && results.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Results available at the moment.
          </Text>
        ) : (
          <Grid gap="sm">
            {results.map((match) => {
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

export default CompetitionResults;
