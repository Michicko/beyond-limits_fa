import { getCurrentNnlStanding } from "@/app/_actions/actions";
import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import StandingComp from "@/components/main/Standing/Standing";
import { isAuthenticated } from "@/utils/amplify-utils";
import React from "react";

async function Standing() {
  const nnlStanding = await getCurrentNnlStanding(
    (await isAuthenticated()) ? "auth" : "guest"
  );

  return (
    <CompetitionsLayout pageTitle="Nigerian National League">
      {!nnlStanding ? (
        <div>No Nnl Table Available</div>
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
