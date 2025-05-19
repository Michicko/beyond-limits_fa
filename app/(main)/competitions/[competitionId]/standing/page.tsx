import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MixedCup from "@/components/main/MixedCup/MixedCup";
import Standing from "@/components/main/Standing/Standing";
import React from "react";
import clsx from "clsx";
import styles from "../../Competitions.module.css";
import Knockout from "@/components/main/Knockout/Knockout";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { getFirstLetter } from "@/lib/helpers";
import Text from "@/components/main/Typography/Text";

export const metadata = {
  title: 'Standing',
  description: "Find the current standing for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function CompetitionStanding({
  params,
}: {
  params: { competitionId: string };
}) {
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
          "leagueId",
          "cupId",
          "name",
          "type",
          "league.status",
          "league.standings.*",
          "cup.playOffs.*",
          "matches.*",
        ],
      }
    );

  let standing;
  let playoffs;
  let leagueStatus;

  if (competition && competition.cupId) {
    playoffs = competition.cup.playOffs;
    playoffs = playoffs
      .map((el) => {
        const match = competition.matches.find(
          (match) => el.matchId === match.id
        );
        if (!match) return;
        return {
          ...el,
          match: {
            id: match.id,
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
          },
        };
      })
      .filter((el) => el !== undefined);
  }

  if (competition && competition.leagueId) {
    standing = competition.league.standings;
  }

  return (
    <CompetitionsLayout
      pageTitle={competition?.name}
      competitionId={params.competitionId}
    >
      <div className={clsx(styles["competition-box"])}>
        {!competition && (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Competition Season available at the moment.
          </Text>
        )}
        {competition &&
          competition.type === "MIXED" &&
          playoffs &&
          standing && (
            <>
              <MixedCup
                name={getFirstLetter(competition.name)}
                league_status={competition.league.status || ""}
                playoffs={playoffs}
                league_standing={standing}
              />
            </>
          )}
        {competition && competition.type === "CUP" && playoffs && (
          <Knockout playOffs={playoffs} />
        )}
        {competition && competition.type === "LEAGUE" && (
          <>
            {standing && standing.length > 0 && (
              <Standing
                name={getFirstLetter(competition.name)}
                standings={standing}
                showFull={true}
                showLongName={true}
              />
            )}
          </>
        )}
      </div>
    </CompetitionsLayout>
  );
}

export default CompetitionStanding;
