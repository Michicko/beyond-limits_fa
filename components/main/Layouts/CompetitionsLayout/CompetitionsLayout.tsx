import React, { Suspense } from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutMain from "./LayoutMain";
import LayoutContainer from "./LayoutContainer";
import clsx from "clsx";
import Header from "../../Header/Header";
import Heading from "../../Typography/Heading";
import Tab from "../../Tab/Tab";
import LinkTab from "../../Tab/LinkTab";
import styles from "../Layout.module.css";
import { months, seasons } from "@/lib/placeholder-data";
import SeasonFilter from "../../Filters/SeasonFilter";
import { getDefaultSeason } from "@/lib/helper";

function CompetitionsLayout({
  children,
  pageTitle,
  competitionId,
}: {
  children: React.ReactElement;
  competitionId?: string;
  pageTitle?: string;
}) {
  const currentSeason = getDefaultSeason(seasons);
  const date = new Date();
  const month = date.getUTCMonth();

  const tabLinks = competitionId
    ? [
        {
          name: "Results",
          href: `/competitions/${competitionId}/results?season=${encodeURIComponent(
            currentSeason.toString()
          )}&month=${months[month]}`,
        },
        {
          name: "Fixtures",
          href: `/competitions/${competitionId}/fixtures?season=${encodeURIComponent(
            currentSeason.toString()
          )}&month=${months[month]}`,
        },

        {
          name: "Standing",
          href: `/competitions/${competitionId}/standing?season=${encodeURIComponent(
            currentSeason.toString()
          )}`,
        },
      ]
    : [
        {
          name: "fixtures",
          href: `/fixtures?season=${encodeURIComponent(
            currentSeason.toString()
          )}&month=${months[month]}`,
        },
        {
          name: "results",
          href: `/results?season=${encodeURIComponent(
            currentSeason.toString()
          )}&month=${months[month]}`,
        },
        {
          name: "standing",
          href: `/standing?season=${encodeURIComponent(
            currentSeason.toString()
          )}`,
        },
      ];

  return (
    <>
      <Header
        bg={"/images/fixtures-layout-header-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading
              level={1}
              letterCase="upper"
              type="primary"
              color="white"
              center={true}
            >
              {pageTitle}
            </Heading>
            <Suspense key={currentSeason} fallback={<div>loading...</div>}>
              <SeasonFilter />
            </Suspense>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          <div className={clsx(styles["layout-tab"])}>
            <Suspense key={pageTitle} fallback={null}>
              <Tab bg="white" theme="theme-2">
                <>
                  {tabLinks.map((link) => {
                    return (
                      <LinkTab link={link} theme="theme-2" key={link.name} />
                    );
                  })}
                </>
              </Tab>
            </Suspense>
          </div>
          <LayoutContainer>{children}</LayoutContainer>
        </>
      </LayoutMain>
    </>
  );
}

export default CompetitionsLayout;
