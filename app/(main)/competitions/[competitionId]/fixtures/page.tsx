import Calendar from "@/components/main/Calendar/Calendar";
import Grid from "@/components/main/Container/Grid";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { getMatches } from "@/lib/helpers";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

export const metadata = {
  title: 'Fixtures & Results',
  description: "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function CompetitionFixtures({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams: Promise<{
    month: string;
  }>;
}) {
  const searchParam = await searchParams;
  const auth = await isAuthenticated()

  const { data: competition, errors } =
    await cookiesClient.models.CompetitionSeason.get(
      {
        id: params.competitionId,
      },
      {
        authMode: auth ? "userPool" : "iam",
        selectionSet: [
          "id",
          "matches.*",
          "name",
          "matches.competitionSeason.*",
        ],
      }
    );

  let fixtures;
  if (competition) {
    fixtures = getMatches(competition?.matches, "UPCOMING", searchParam.month);
  }

  return (
    <CompetitionsLayout
      pageTitle={competition?.name}
      competitionId={params.competitionId}
    >
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {errors ? 
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {errors[0].message}
        </Text>:
        !fixtures || (fixtures && fixtures.length < 1) ? (
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
