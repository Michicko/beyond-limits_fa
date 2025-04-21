import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Heading from "@/components/main/Typography/Heading";
import React from "react";
import clsx from "clsx";
import styles from "./PlayerStats.module.css";
import Text from "@/components/main/Typography/Text";
import Card from "@/components/main/Card/Card";
import CardHeader from "@/components/main/Card/CardHeader";
import CardBody from "@/components/main/Card/CardBody";

function PlayerStats() {
  return (
    <>
      <Header
        bg={"/images/teamstats.jpg"}
        alt="2024 / 2025 Stats"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              color={"white"}
              type="primary"
              level={1}
              letterCase="upper"
            >
              Player Stats
            </Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <div className={clsx(styles["player-stats"])}>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles["player-stats__heading"])}>
                  <Heading
                    level={3}
                    letterCase="upper"
                    color="secondary"
                    type="section"
                  >
                    Player Stats
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles["player-stats__body"], styles.p)}>
                  <Text color="white" size="md" letterCase="normal">
                    This page is currently undergoing maintenance, please check
                    back soon.
                  </Text>
                </div>
              </CardBody>
            </>
          </Card>
        </div>
      </LayoutMain>
    </>
  );
}

export default PlayerStats;
