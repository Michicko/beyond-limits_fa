import MatchLayout from "@/components/main/Layouts/MatchLayout/MatchLayout";
import React from "react";
import clsx from "clsx";
import styles from "../../Match.module.css";
import Card from "@/components/main/Card/Card";
import CardHeader from "@/components/main/Card/CardHeader";
import Heading from "@/components/main/Typography/Heading";
import CardBody from "@/components/main/Card/CardBody";
import Logo from "@/components/main/MatchCard/Logo";
import Text from "@/components/main/Typography/Text";
import MatchStat from "@/components/main/MatchCard/MatchStat";
import Flex from "@/components/main/Container/Flex";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import MatchScores from "@/components/main/MatchCard/MatchScores";

async function Stats({ params }: { params: { matchId: string } }) {
  const authMode = (await isAuthenticated()) ? "userPool" : "iam";
  const { data: matchData, errors: matchErrors } =
    await cookiesClient.models.Match.get(
      { id: params.matchId },
      {
        authMode,
        selectionSet: [
          "id",
          "homeTeam.*",
          "awayTeam.*",
          "lineup",
          "substitutes",
          "coach.*",
          "competitionSeason.*",
          "date",
          "time",
          "venue",
          "status",
          "keyPlayerId",
          "aboutKeyPlayer",
          "mvpId",
          "aboutMvp",
          "scorers",
          "review",
          "report",
          "scorers",
          "createdAt"
        ],
      }
    );

  const match = matchData && matchData;

  if (!match)
    return (
      <MatchLayout>
        <Heading level={2} type="secondary" letterCase="capitalize" mb={"sm"}>
          No Match
        </Heading>
        <Text
          color="white"
          size="base"
          weight="regular"
          letterCase="lower"
          mb={"sm"}
        >
          No match available.
        </Text>
      </MatchLayout>
    );

  const reqStats = [
    "passes",
    "offsides",
    "corners",
    "shots",
    "yellows",
    "reds",
  ];

  const hstats =
    match.homeTeam &&
    Object.entries(match.homeTeam).filter(([key, _]) => {
      return reqStats.includes(key);
    });

  return (
    <MatchLayout match={match} currentLink={`/matches/${match.id}/stats`}>
      <div className={clsx(styles.stats)}>
        <Card theme={"trans"}>
          <>
            <CardHeader theme={"dark"} border={true} as="div">
              <div className={clsx(styles.preview__heading)}>
                <Heading
                  level={3}
                   letterCase="capitalize"
                  color="secondary"
                  type="section"
                >
                  General
                </Heading>
              </div>
            </CardHeader>
            <CardBody as="div" theme={"light"}>
              <div className={clsx(styles.preview__body, styles.p)}>
                <ul>
                  <li className={clsx(styles["preview-item"])}>
                    {match.homeTeam && match.awayTeam && match.status && (
                      <>
                        <Logo
                          logo={match.homeTeam.logo}
                          name={match.homeTeam.longName}
                          size="md"
                        />
                        <Flex
                          direction="col"
                          gap="xxs"
                          align="center"
                          justify="center"
                        >
                          {match.status &&
                            match.homeTeam.goals &&
                            match.awayTeam.goals && (
                              <MatchScores
                                status={match.status}
                                home_score={match.homeTeam.goals}
                                away_score={match.awayTeam.goals}
                                time={match.time}
                                size="md"
                              />
                            )}
                          <Text
                            color="white"
                            size="xs"
                            weight="bold"
                            letterCase="capitalize"
                            center={true}
                          >
                            {match.status.toLowerCase()}
                          </Text>
                        </Flex>
                        <Logo
                          logo={match.awayTeam?.logo}
                          name={match.awayTeam?.longName}
                          size="md"
                        />
                      </>
                    )}
                  </li>
                  <>
                    {hstats &&
                      hstats.map(([key, val], i) => {
                        return (
                          <li
                            className={clsx(
                              styles["preview-item"],
                              styles["no-border"]
                            )}
                            key={(i + 2) * (i * 10)}
                          >
                            {val && match.awayTeam && (
                              <MatchStat
                                stat={key}
                                home={val}
                                away={
                                  match.awayTeam[
                                    key as keyof typeof match.awayTeam
                                  ] ?? 0
                                }
                              />
                            )}
                          </li>
                        );
                      })}
                  </>
                </ul>
              </div>
            </CardBody>
          </>
        </Card>
      </div>
    </MatchLayout>
  );
}

export default Stats;
