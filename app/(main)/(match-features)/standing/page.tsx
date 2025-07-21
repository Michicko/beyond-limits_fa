export const dynamic = "force-dynamic";
import { getCurrentNnlStanding } from "@/app/_actions/actions";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import StandingComp from "@/components/main/Standing/Standing";
import Text from "@/components/main/Typography/Text";
import { isAuthenticated } from "@/utils/amplify-utils";
import React from "react";

export const metadata = {
  title: "Standing",
  description:
    "Find the current standing for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function Standing() {
  const auth = await isAuthenticated();
  const nnlStanding = await getCurrentNnlStanding(auth ? "auth" : "guest");

  return (
    <CompetitionsLayout pageTitle="Nigerian National League">
      {!nnlStanding || (nnlStanding && nnlStanding.length < 1) ? (
        <Text color="white" letterCase={"lower"} size="base" weight="regular">
          No Standing available at the moment.
        </Text>
      ) : (
        <StandingComp
          name={"NNL"}
          standings={nnlStanding}
          showFull={true}
          showLongName={true}
        />
      )}
    </CompetitionsLayout>
  );
}

export default Standing;
