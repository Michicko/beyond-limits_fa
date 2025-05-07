import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import Heading from "@/components/main/Typography/Heading";
import React from "react";
import clsx from "clsx";
import styles from "./Honors.module.css";
import Text from "@/components/main/Typography/Text";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import ImageComp from "@/components/ImageComp/ImageComp";
import Button from "@/components/main/Button/Button";
import { cookiesClient, isAuthenticated } from "@/utils/amplify-utils";
import { getHonorsStats } from "@/lib/helpers";

async function Honours() {
  const authMode = (await isAuthenticated()) ? "userPool" : "iam";
  // const { data: honors, errors } = await cookiesClient.models.CompetitionSeason.list({
  //   authMode,
  // });

  const honors = [] as [];

  let stats: {
    numbersWon: number;
    seasonsWon: string[];
  };

  if (honors) {
    stats = getHonorsStats(honors);
  }

  return (
    <>
      <Header bg={"/images/home-header-bg.png"} alt="honours" overlay={true}>
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
            <div className={clsx(styles["honours-intro"])}>
              <Text color="white" size="base" cssStyles={{ lineHeight: "1.5" }}>
                At Beyond the Limits, we pride ourselves on our accomplishments.
                Our devotion to developing young, talented players and pushing
                the boundaries has earned us numerous prestigious honours.
              </Text>
            </div>
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
                  return (
                    <div key={honor.trophyName} className={clsx(styles.honor)}>
                      <div className={clsx(styles["honor-img__box"])}>
                        <div className={clsx(styles["honor-img"])}>
                          <ImageComp
                            alt={honor.trophyName}
                            image={honor.image}
                            placeholder={honor.image}
                            priority={false}
                          />
                        </div>
                        <h3 className={clsx(styles["honors-won"])}>
                          {stats.numbersWon}
                        </h3>
                      </div>
                      {stats && (
                        <div className={clsx(styles["honor-details"])}>
                          <h3 className={clsx(styles["honor-name"])}>
                            {honor.trophyName.replace(/trophy/gi, "")}
                          </h3>
                          <ul className={clsx(styles["honors-years"])}>
                            {stats.seasonsWon.map((season, i) => {
                              return (
                                <li
                                  className={clsx(styles["honor-year"])}
                                  key={season}
                                >
                                  {season}
                                  {i < stats.seasonsWon.length - 1 ? "," : ""}
                                </li>
                              );
                            })}
                          </ul>
                          <Button
                            isLink={true}
                            text={"Learn more"}
                            url={`/news/${honor.articleId}`}
                            type="secondary"
                            size="lg"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      </LayoutMain>
    </>
  );
}

export default Honours;
