import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Heading from "@/components/main/Typography/Heading";
import React from "react";
import clsx from "clsx";
import styles from "./TeamStats.module.css";
import Card from "@/components/main/Card/Card";
import CardHeader from "@/components/main/Card/CardHeader";
import CardBody from "@/components/main/Card/CardBody";
import TeamForm from "@/components/main/MatchCard/TeamForm";
import TeamStat from "@/components/main/TeamStat/TeamStat";
import {
  getCounts,
  getCurrentCompetitionSeasonsMatches,
} from "@/app/_actions/actions";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { IStandingRow } from "@/lib/definitions";
import {
  filterGroupedSeasonsByCurrent,
  getFirstLetter,
  getPlayOffRoundName,
} from "@/lib/helpers";
import Text from "@/components/main/Typography/Text";

export const metadata = {
  title: "Team Stats",
  description:
    "Find out about current positions, rounds, status and forms for Beyond Limits Fa. First team on the official website, Beyondlimitsfa.com.",
};

async function TeamStats() {
  const isAuth = await isAuthenticated();

  const year = new Date().getUTCFullYear();
  const { data: seasons, errors } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        season: {
          contains: `${year}`,
        },
      },
      authMode: isAuth ? "userPool" : "iam",
      selectionSet: [
        "id",
        "name",
        "type",
        "status",
        "season",
        "seasonStartMonth",
        "logo",
        "leagueId",
        "cupId",
        "league.*",
        "league.standings.*",
        "cup.*",
        "cup.playOffs.*",
        "league.leagueRounds.*",
      ],
    });
  const currentSeasons = seasons && filterGroupedSeasonsByCurrent(seasons);

  let leagues: any[] = [];
  let cups: any[] = [];
  let rounds: any[] = [];

  if (currentSeasons) {
    for (let season of currentSeasons) {
      if (season.leagueId) {
        leagues = [
          ...leagues,
          {
            name: season.name,
            type: season.type,
            logo: season.logo,
            league: season.league,
          },
        ];
        rounds = [...rounds, ...season.league.leagueRounds];
      }

      if (season.cupId) {
        cups = [
          ...cups,
          {
            name: season.name,
            type: season.type,
            logo: season.logo,
            cup: season.cup,
          },
        ];

        rounds = [...rounds, ...season.cup.playOffs];
      }
    }
  }

  leagues =
    leagues &&
    leagues.map((row) => {
      const beyondStanding = row.league.standings.find(
        (el: IStandingRow) => el && el.isBeyondLimits
      );
      return {
        type: row.type,
        name: row.name,
        logo: row.logo,
        standing: beyondStanding,
        leagueStatus: row.league.status,
      };
    });

  cups =
    cups &&
    cups.map((row) => {
      const lastRound =
        row.cup.playOffs && row.cup.playOffs[row.cup.playOffs.length - 1];
      return {
        id: row.cup.id,
        name: row.name,
        type: row.type,
        logo: row.logo,
        round: lastRound,
      };
    });

  const forms = Array.isArray(rounds)
    ? rounds
        .filter((el) => el?.status === "COMPLETED" && el?.result)
        .map((el) => getFirstLetter(el.result))
    : [];

  const matches = await getCurrentCompetitionSeasonsMatches(
    isAuth ? "auth" : "guest"
  );

  const roundsCounts = await getCounts(matches);

  return (
    <>
      <Header bg={"/images/team-stats.JPG"} alt="Team Stats" overlay={true}>
        <LayoutHeader>
          <>
            <Heading
              color={"white"}
              type="primary"
              level={1}
              letterCase="upper"
            >
              Team Stats
            </Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          {errors && (
            <Text
              color="white"
              letterCase={"lower"}
              size="base"
              weight="regular"
            >
              {`Something went wrong, ${errors[0].message}`}
            </Text>
          )}
          <div className={clsx(styles["team-stats"])}>
            <Card theme={"trans"}>
              <>
                <CardHeader theme={"dark"} border={true} as="div">
                  <div className={clsx(styles["team-stats__heading"])}>
                    <Heading
                      level={3}
                      letterCase="capitalize"
                      color="secondary"
                      type="section"
                    >
                      Competitions
                    </Heading>
                  </div>
                </CardHeader>
                <CardBody as="div" theme={"light"}>
                  <div className={clsx(styles["team-stats__body"], styles.py)}>
                    <ul className={clsx(styles["competition-list"])}>
                      {leagues.map((league, i) => {
                        if (
                          league.type === "MIXED" &&
                          league.leagueStatus === "COMPLETED"
                        )
                          return null;
                        return (
                          <TeamStat
                            competition_logo={league.logo}
                            competition_name={league.name}
                            position={league.standing?.position ?? ""}
                            key={league.name + i + (i + 3) + i + 2}
                          />
                        );
                      })}
                    </ul>
                    <ul className={clsx(styles["competition-list"])}>
                      {cups.map((cup, i) => {
                        if (!cup.round) return null;
                        return (
                          <TeamStat
                            competition_logo={cup.logo}
                            competition_name={cup.name}
                            position={
                              getPlayOffRoundName(cup.round?.round) ?? ""
                            }
                            key={cup.id + i + (i + 2) + i + 3}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </CardBody>
              </>
            </Card>
            <div className={clsx(styles["team-stats__streaks"])}>
              <div className={clsx(styles["team-stats__streak"])}>
                <h4>Wins</h4>
                <p>{roundsCounts.wins}</p>
              </div>
              <div className={clsx(styles["team-stats__streak"])}>
                <h4>Draws</h4>
                <p>{roundsCounts.draws}</p>
              </div>
              <div className={clsx(styles["team-stats__streak"])}>
                <h4>Defeat</h4>
                <p>{roundsCounts.losses}</p>
              </div>
            </div>
            <Card theme={"trans"}>
              <>
                <CardHeader theme={"dark"} border={true} as="div">
                  <div className={clsx(styles["team-stats__heading"])}>
                    <Heading
                      level={3}
                      letterCase="capitalize"
                      color="secondary"
                      type="section"
                    >
                      Form
                    </Heading>
                  </div>
                </CardHeader>
                <CardBody as="div" theme={"light"}>
                  <div className={clsx(styles["team-stats__body"], styles.p)}>
                    <div className={clsx(styles["team-stats__forms"])}>
                      {forms.map((form, i) => {
                        return <TeamForm form={form} key={i} />;
                      })}
                    </div>
                  </div>
                </CardBody>
              </>
            </Card>
          </div>
        </>
      </LayoutMain>
    </>
  );
}

export default TeamStats;
