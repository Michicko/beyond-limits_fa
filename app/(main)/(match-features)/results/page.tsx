import Calendar from "@/components/main/Calendar/Calendar";
import Flex from "@/components/main/Container/Flex";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";
import Text from "@/components/main/Typography/Text";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import { months } from "@/lib/placeholder-data";


export const metadata = {
  title: 'Fixtures & Results',
  description: "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function Results(props: {
  searchParams: Promise<{
    month: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const date = new Date();
  const year = date.getFullYear();
  const monthParam = months.indexOf(searchParams.month);
  const startOfMonth = new Date(year, monthParam, 1).toISOString().split('T')[0];
  const startOfNextMonth = new Date(year, monthParam + 1, 1).toISOString().split('T')[0];
  const auth = await isAuthenticated()

    const { data: results, errors } = await cookiesClient.models.Match.list({
        authMode: auth ? "userPool" : "iam",
        filter: {
          status: {
            eq: 'COMPLETED'
          },
          date: {
            ge: startOfMonth,  
            lt: startOfNextMonth
          }
        },
        selectionSet: [
           "id",
            "status",
            "competitionSeason.logo",
            "competitionSeason.name",
            "date",
            "time",
            "homeTeam.*",
            "awayTeam.*",
            "createdAt",
            "review",
        ],
      });

      
      const sortedResults = Array.isArray(results)
      ? results.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      : [];

  return (
    <CompetitionsLayout pageTitle="Results">
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {
          errors ? 
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
          {errors[0].message}
        </Text>
        :
        !results || (results && results.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Results available at the moment.
          </Text>
        ) : (
          <Flex
            align="center"
            justify="between"
            direction="col"
            gap="sm"
            my="lg"
          >
            {sortedResults.map((match) => {
              return (
                <MatchCard
                  match={match}
                  showName={true}
                  theme="light"
                  key={match.id}
                />
              );
            })}
          </Flex>
        )}
      </>
    </CompetitionsLayout>
  );
}

export default Results;
