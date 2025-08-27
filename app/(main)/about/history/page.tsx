import Card from "@/components/main/Card/Card";
import CardBody from "@/components/main/Card/CardBody";
import CardHeader from "@/components/main/Card/CardHeader";
import Header from "@/components/main/Header/Header";
import LayoutHeader from "@/components/main/Layouts/CompetitionsLayout/LayoutHeader";
import LayoutMain from "@/components/main/Layouts/CompetitionsLayout/LayoutMain";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import React from "react";
import clsx from "clsx";
import styles from "./History.module.css";

export const metadata = {
  title: "Beyond Limits Fa. History",
  description:
    "Beyond Limits Football Academy is a youth development programme based in Ikenne-Remo, Ogun State, Nigeria, focused on nurturing talent, creating opportunities, and empowering the next generation of footballers on and off the pitch.",
};

function History() {
  return (
    <>
      <Header
        bg={"/images/blfa-logo-scattered.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading color="white" level={1} letterCase="upper" type="primary">
              Our History
            </Heading>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <div className={clsx(styles.history)}>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    About Us
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.5", marginBottom: "1rem" }}
                  >
                    At Beyond Limits Football Academy, we are driven by a bold
                    vision: to redefine youth football development in Africa and
                    nurture the next generation of athletes, leaders, and global
                    citizens.
                  </Text>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.5", marginBottom: "1rem" }}
                  >
                    We believe that excellence has no boundaries. That’s why we
                    adopt a holistic approach, combining elite football
                    coaching, academic support, character development, and
                    global exposure. Our players are trained by top-tier
                    coaches, mentored by experienced professionals, and given
                    the platform to compete and thrive at the highest levels.
                  </Text>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.5", marginBottom: "1rem" }}
                  >
                    Whether it’s on the training ground in Ikenne or on the
                    world stage at tournaments like the Gothia Cup, our boys
                    represent the core values of Beyond Limits: discipline,
                    ambition, resilience, and integrity.
                  </Text>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.5" }}
                  >
                    We are proud to be shaping not just footballers, but future
                    leaders who carry the spirit of #NoLimits into every aspect
                    of their lives.
                  </Text>
                </div>
              </CardBody>
            </>
          </Card>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    Our Mission
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.2" }}
                  >
                    Founded in Ikenne-Remo, Nigeria, Beyond Limits is more than
                    a football academy — it is a transformative environment
                    where talent is discovered, nurtured, and elevated. Our
                    mission is simple but powerful: to provide young players
                    with world-class training, education, and mentorship that
                    empower them to reach their full potential — both on and off
                    the pitch.
                  </Text>
                </div>
              </CardBody>
            </>
          </Card>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    Home
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.2" }}
                  >
                    Remo Stars Stadium, Ikenne, Ogun state.
                  </Text>
                </div>
              </CardBody>
            </>
          </Card>
          <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    Established
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div className={clsx(styles.history__body, styles.p)}>
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.2" }}
                  >
                    The club was established in 2022 and competes in the Nigeria
                    National League.
                  </Text>
                </div>
              </CardBody>
            </>
          </Card>
          {/* <Card theme={"trans"}>
            <>
              <CardHeader theme={"dark"} border={true} as="div">
                <div className={clsx(styles.history__heading)}>
                  <Heading
                    level={3}
                    letterCase="capitalize"
                    color="secondary"
                    type="section"
                  >
                    Founder
                  </Heading>
                </div>
              </CardHeader>
              <CardBody as="div" theme={"light"}>
                <div
                  className={clsx(
                    styles.history__body,
                    styles.p,
                    styles["link-box"]
                  )}
                >
                  <Text
                    color="white"
                    size="base"
                    weight="regular"
                    cssStyles={{ lineHeight: "1.2" }}
                  >
                    Beyond Limits F.A. was founded in 2022 by
                  </Text>
                  <a
                    href={"https://en.wikipedia.org/wiki/Kunle_Soname"}
                    className={clsx(styles["history-link"])}
                  >
                    Kunle Soname.
                  </a>
                </div>
              </CardBody>
            </>
          </Card> */}
        </div>
      </LayoutMain>
    </>
  );
}

export default History;
