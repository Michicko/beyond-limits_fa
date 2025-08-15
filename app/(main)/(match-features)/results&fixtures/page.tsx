import { getCurrentSeasonMatches } from "@/app/_actions/actions";
import Calendar from "@/components/main/Calendar/Calendar";
import Flex from "@/components/main/Container/Flex";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import Text from "@/components/main/Typography/Text";
import { sortMatchesByStatusAndDate } from "@/lib/helpers";
import { months } from "@/lib/placeholder-data";
import { isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";

export const metadata = {
  title: "Fixtures & Results",
  description:
    "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function resultsFixtures(props: {
  searchParams: Promise<{
    month: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const monthParam = months.indexOf(searchParams.month);
  const auth = await isAuthenticated();

  const { results, fixtures } = await getCurrentSeasonMatches(
    auth ? "auth" : "guest",
    monthParam
  );

  const matches = [...results, ...fixtures].sort((a, b) => {
    // Sort UPCOMING before COMPLETED
    if (a.status !== b.status) {
      return a.status === "UPCOMING" ? -1 : 1;
    }
    // If same status, sort by date
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const date = new Date();
  const year = date.getUTCFullYear();

  return (
    <CompetitionsLayout pageTitle="Results & Fixtures">
      <>
        <Suspense fallback={null}>
          <Calendar years={[year - 2, year - 1, year, year + 1]} size="sm" />
        </Suspense>
        {!matches || (matches && matches.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Matches available at the moment.
          </Text>
        ) : (
          <Flex
            align="center"
            justify="between"
            direction="col"
            gap="sm"
            my="lg"
          >
            {sortMatchesByStatusAndDate(matches).map((match) => {
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

export default resultsFixtures;
