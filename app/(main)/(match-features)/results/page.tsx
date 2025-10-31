import Calendar from "@/components/main/Calendar/Calendar";
import Flex from "@/components/main/Container/Flex";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import { isAuthenticated } from "@/utils/amplify-utils";
import React, { Suspense } from "react";
import Text from "@/components/main/Typography/Text";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import { months } from "@/lib/placeholder-data";
import { getCurrentSeasonMatches } from "@/app/_actions/actions";

export const metadata = {
  title: "Fixtures & Results",
  description:
    "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function Results(props: {
  searchParams: Promise<{
    month: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const monthParam = months.indexOf(searchParams.month);
  const auth = await isAuthenticated();
  const date = new Date();
  const currentYear = date.getUTCFullYear();

  const { results } = await getCurrentSeasonMatches(
    auth ? "auth" : "guest",
    monthParam
  );

  return (
    <CompetitionsLayout pageTitle="Results">
      <>
        <Suspense fallback={null}>
          <Calendar
            years={[
              `${currentYear - 1}`,
              `${currentYear}`,
              `${currentYear + 1}`,
            ]}
          />
        </Suspense>
        {!results || (results && results.length < 1) ? (
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
            {results.map((match) => {
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
