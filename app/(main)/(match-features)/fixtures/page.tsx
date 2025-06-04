import React, { Suspense } from "react";
import Flex from "@/components/main/Container/Flex";
import Calendar from "@/components/main/Calendar/Calendar";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import { isAuthenticated } from "@/utils/amplify-utils";
import Text from "@/components/main/Typography/Text";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import { months } from "@/lib/placeholder-data";
import { getCurrentSeasonMatches } from "@/app/_actions/actions";

export const metadata = {
  title: "Fixtures & Results",
  description:
    "Find fixtures and results for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function Fixtures(props: {
  searchParams: Promise<{
    month: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const monthParam = months.indexOf(searchParams.month);
  const auth = await isAuthenticated();

  const { fixtures } = await getCurrentSeasonMatches(
    auth ? "auth" : "guest",
    monthParam
  );

  return (
    <CompetitionsLayout pageTitle="Fixtures">
      <>
        <Suspense fallback={null}>
          <Calendar />
        </Suspense>
        {!fixtures || (fixtures && fixtures.length < 1) ? (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Fixtures available at the moment.
          </Text>
        ) : (
          <Flex
            align="center"
            direction="col"
            justify="between"
            gap="sm"
            my="lg"
          >
            {fixtures.map((match) => {
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

export default Fixtures;
