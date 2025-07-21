import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import Heading from "@/components/main/Typography/Heading";
import React from "react";
import clsx from "clsx";
import styles from "./Honors.module.css";
import Text from "@/components/main/Typography/Text";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { getHonorsStats } from "@/lib/helpers";
import Honour from "./Honour";

export const metadata = {
  title: "Beyond Limits Fa. Trophy Room | Club Honors, Silverware & Trophies",
  description: "Read more about Beyond Limits' major silverware triumphs.",
};

async function Honours() {
  const auth = await isAuthenticated();

  const { data: honors, errors } = await cookiesClient.models.Competition.list({
    authMode: auth ? "userPool" : "iam",
    selectionSet: [
      "id",
      "longName",
      "trophyImage",
      "trophyArticleId",
      "trophiesWon",
      "yearsWon",
      "competitionSeasons.isWinner",
      "competitionSeasons.status",
      "competitionSeasons.season",
    ],
  });

  return (
    <>
      <Header bg={"/images/honours.png"} alt="honours" overlay={true}>
        <LayoutHeader>
          <>
            <Heading color="white" level={1} letterCase="upper" type="primary">
              Honours
            </Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          <div className={clsx(styles["honours-container"])}>
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
            <div className={clsx(styles["honors"])}>
              {honors &&
                honors.map((honor) => {
                  const stats = getHonorsStats([honor]);
                  if (stats.numbersWon + (honor.trophiesWon || 0) === 0)
                    return null;
                  return <Honour honor={honor} stats={stats} key={honor.id} />;
                })}
            </div>
          </div>
        </>
      </LayoutMain>
    </>
  );
}

export default Honours;
