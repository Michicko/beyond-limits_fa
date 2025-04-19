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
import { honors } from "@/lib/placeholder-data";

function Honours() {
  return (
    <>
      <Header
        bg={"/images/home-header-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading color="white" level={1} letterCase="upper" type="primary">
              Honours
            </Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <div className={clsx(styles["honours-container"])}>
          <div className={clsx(styles["honours-intro"])}>
            <Text color="white" size="base" cssStyles={{ lineHeight: "1.5" }}>
              At Beyond the Limits, we pride ourselves on our accomplishments.
              Our devotion to developing young, talented players and pushing the
              boundaries has earned us numerous prestigious honours.
            </Text>
          </div>
          <div className={clsx(styles["honors"])}>
            {honors.map((honor) => {
              return (
                <div
                  key={honor.competition.short}
                  className={clsx(styles.honor)}
                >
                  <div className={clsx(styles["honor-img__box"])}>
                    <div className={clsx(styles["honor-img"])}>
                      <ImageComp
                        alt={honor.competition.long}
                        image={honor.trophy}
                        placeholder={honor.trophy}
                        priority={false}
                      />
                    </div>
                    <h3 className={clsx(styles["honors-won"])}>
                      {honor.numbers_won}
                    </h3>
                  </div>
                  <div className={clsx(styles["honor-details"])}>
                    <h3 className={clsx(styles["honor-name"])}>
                      {honor.competition.long}
                    </h3>
                    <ul className={clsx(styles["honors-years"])}>
                      {honor.years.map((year, i) => {
                        return (
                          <li className={clsx(styles["honor-year"])} key={year}>
                            {year}
                            {i < honor.years.length - 1 ? "," : ""}
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      isLink={true}
                      text={"Learn more"}
                      url={`/news/${honor.article_id}`}
                      type="secondary"
                      size="lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LayoutMain>
    </>
  );
}

export default Honours;
