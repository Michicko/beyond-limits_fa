import CompetitionsLayout from "@/components/main/Layouts/CompetitionsLayout/CompetitionsLayout";
import MixedCup from "@/components/main/MixedCup/MixedCup";
import Standing from "@/components/main/Standing/Standing";
import React from "react";
import clsx from "clsx";
import styles from "../../Competitions.module.css";
import Knockout from "@/components/main/Knockout/Knockout";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { findCurrentSeason, getFirstLetter, capitalize } from "@/lib/helpers";
import Text from "@/components/main/Typography/Text";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams?: { season?: string };
}) {
  const auth = await isAuthenticated();
  const { data: competitionSeasons } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        competitionId: {
          eq: params.competitionId,
        },
      },
      authMode: auth ? "userPool" : "iam",
      selectionSet: ["name", "season", "seasonStartMonth"],
    });

  const currentSeason =
    competitionSeasons &&
    findCurrentSeason(competitionSeasons, new Date(), searchParams?.season);

  const seasonLabel = currentSeason?.season ?? "Season";
  const title = `${capitalize(currentSeason?.name)} ${seasonLabel}`;
  const description = `Find the current standing for Beyond Limits FA. First team in the ${seasonLabel} on the official website, Beyondlimitsfa.com.`;

  return {
    title,
    description,
  };
}

async function CompetitionStanding({
  params,
  searchParams,
}: {
  params: { competitionId: string };
  searchParams: Promise<{
    season: string;
  }>;
}) {
  const auth = await isAuthenticated();
  const searchParam = await searchParams;
  const { data: competitionSeasons, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        competitionId: {
          eq: params.competitionId,
        },
      },
      authMode: auth ? "userPool" : "iam",
      selectionSet: [
        "id",
        "leagueId",
        "cupId",
        "name",
        "shortName",
        "type",
        "league.status",
        "league.standings.*",
        "cup.playOffs.*",
        "matches.*",
        "season",
        "seasonStartMonth",
      ],
    });

  const currentSeason =
    competitionSeasons &&
    findCurrentSeason(competitionSeasons, new Date(), searchParam.season);
  let standing;
  let playoffs;

  if (currentSeason && currentSeason.cupId) {
    playoffs = currentSeason.cup.playOffs;

    playoffs = playoffs
      .map((el: any) => {
        const match = currentSeason.matches.find(
          (match: any) => el.matchId === match.id
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
      .filter((el: any) => el !== undefined);
  }

  if (currentSeason && currentSeason.leagueId) {
    standing = currentSeason.league.standings;
  }

  return (
    <CompetitionsLayout
      pageTitle={currentSeason?.name}
      competitionId={params.competitionId}
      seasons={competitionSeasons.map((el) => el.season) ?? []}
      currentSeason={currentSeason?.season}
    >
      <div className={clsx(styles["competition-box"])}>
        {!currentSeason && (
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            No Season available at the moment.
          </Text>
        )}
        {currentSeason &&
          currentSeason.type === "MIXED" &&
          playoffs &&
          standing && (
            <>
              <MixedCup
                name={currentSeason.shortName}
                league_status={currentSeason.league.status || ""}
                playoffs={playoffs}
                league_standing={standing}
              />
            </>
          )}
        {currentSeason && currentSeason.type === "CUP" && playoffs && (
          <Knockout playOffs={playoffs} />
        )}
        {currentSeason && currentSeason.type === "LEAGUE" && (
          <>
            {standing && standing.length > 0 && (
              <Standing
                name={currentSeason.shortName}
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
