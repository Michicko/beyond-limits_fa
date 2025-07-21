import Card from "@/components/main/Card/Card";
import MatchLayout from "@/components/main/Layouts/MatchLayout/MatchLayout";
import React, { Suspense } from "react";
import styles from "../../Match.module.css";
import clsx from "clsx";
import CardHeader from "@/components/main/Card/CardHeader";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import CardBody from "@/components/main/Card/CardBody";
import TeamForm from "@/components/main/MatchCard/TeamForm";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import TextEditor from "@/components/TextEditor/TextEditor";

async function Review({ params }: { params: { matchId: string } }) {
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
          "homeForm",
          "awayForm",
          "createdAt",
        ],
      }
    );

  const match = matchData && matchData;
  // const keyPlayer =
  //   (match &&
  //     match.keyPlayerId &&
  //     (
  //       await cookiesClient.models.Player.get(
  //         {
  //           id: match.keyPlayerId,
  //         },
  //         {
  //           authMode,
  //         }
  //       )
  //     ).data) ||
  //   null;

  if (!match)
    return (
      <MatchLayout>
        <div className={clsx(styles["error-box"])}>
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
            {matchErrors ? matchErrors[0].message : "Something went wrong!"}
          </Text>
        </div>
      </MatchLayout>
    );

  return (
    <MatchLayout match={match} currentLink={`/matches/${match.id}/preview`}>
      {matchErrors ? (
        <div className={clsx(styles["error-box"])}>
          <Text color="white" letterCase={"lower"} size="base" weight="regular">
            {matchErrors[0].message}
          </Text>
        </div>
      ) : (
        <div className={clsx(styles.preview)}>
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
                    Match Context
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <Suspense fallback={null}>
                  <TextEditor
                    content={JSON.parse(match.review as string)}
                    readOnly={true}
                  />
                </Suspense>
              </CardBody>
            </>
          </Card>
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
                    Team Form
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.preview__body, styles["py-b"])}>
                  <ul className={clsx(styles["team-form__list"])}>
                    {match.homeForm && match.homeForm.split(",").length > 0 && (
                      <li
                        className={clsx(
                          styles["preview-item"],
                          styles["item-name"]
                        )}
                      >
                        <Text
                          color="white"
                          size="base"
                          weight="semibold"
                          letterCase="capitalize"
                        >
                          {match.homeTeam?.shortName}
                        </Text>
                        <Text
                          color="white"
                          size="base"
                          weight="semibold"
                          letterCase="capitalize"
                        >
                          {match.homeTeam?.longName}
                        </Text>
                        {match.homeForm && (
                          <div className={clsx(styles["team-form"])}>
                            {match.homeForm.split(",").map((el, i) => {
                              return <TeamForm form={el} key={match.id + i} />;
                            })}
                          </div>
                        )}
                      </li>
                    )}
                    {match.awayForm && match.awayForm.split(",").length > 0 && (
                      <li
                        className={clsx(
                          styles["preview-item"],
                          styles["item-name"]
                        )}
                      >
                        <Text
                          color="white"
                          size="base"
                          weight="regular"
                          letterCase="capitalize"
                        >
                          {match.awayTeam?.shortName}
                        </Text>
                        <Text
                          color="white"
                          size="base"
                          weight="regular"
                          letterCase="capitalize"
                        >
                          {match.awayTeam?.longName}
                        </Text>
                        {match.awayForm && (
                          <div className={clsx(styles["team-form"])}>
                            {match.awayForm.split(",").map((el, i) => {
                              return (
                                <TeamForm form={el} key={match.id + (i + 2)} />
                              );
                            })}
                          </div>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              </CardBody>
            </>
          </Card>
          {/* <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.preview__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    key player
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.preview__body, styles.p)}>
                  <Text
                    color="secondary"
                    size="sm"
                    letterCase="capitalize"
                    weight="semibold"
                    mb={"sm"}
                  >
                    {keyPlayer?.firstname} {keyPlayer?.lastname}
                  </Text>
                  <Text color="white" size="base" weight="regular">
                    {match.aboutKeyPlayer}
                  </Text>
                </div>
              </CardBody>
            </>
          </Card> */}
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
                    Brief
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.preview__body, styles["py-b"])}>
                  <ul className={clsx(styles["preview-list"])}>
                    {match.competitionSeason && (
                      <li className={clsx(styles["preview-item"], styles.col)}>
                        <Text
                          color="secondary"
                          size="sm"
                          letterCase="capitalize"
                          weight="semibold"
                        >
                          Competition
                        </Text>
                        <Text
                          color="white"
                          size="base"
                          letterCase="capitalize"
                          weight="semibold"
                        >
                          {match.competitionSeason.name}
                        </Text>
                      </li>
                    )}
                    <li className={clsx(styles["preview-item"], styles.col)}>
                      <Text
                        color="secondary"
                        size="sm"
                        letterCase="capitalize"
                        weight="semibold"
                      >
                        Location
                      </Text>
                      <Text
                        color="white"
                        size="base"
                        letterCase="capitalize"
                        weight="semibold"
                      >
                        {match.venue}
                      </Text>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </>
          </Card>
        </div>
      )}
    </MatchLayout>
  );
}

export default Review;
