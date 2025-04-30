import { getCurrentNnlStanding } from "@/app/_actions/actions";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import StandingComp from "@/components/main/Standing/Standing";
import Text from "@/components/main/Typography/Text";
import { isAuthenticated } from "@/utils/amplify-utils";
import React from "react";

async function Standing() {
  const nnlStanding = await getCurrentNnlStanding(
    (await isAuthenticated()) ? "auth" : "guest"
  );

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
