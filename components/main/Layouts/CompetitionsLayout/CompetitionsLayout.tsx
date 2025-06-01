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
import { appendMonthToLink } from "@/lib/helpers";
import Seasons from "../../Filters/Seasons";

function CompetitionsLayout({
  children,
  pageTitle,
  competitionId,
  seasons = [],
  currentSeason
}: {
  children: React.ReactElement;
  competitionId?: string;
  pageTitle?: string;
  seasons?: string[];
  currentSeason?: string;
}) {

  const tabLinks = competitionId
    ? [
        {
          name: "Results",
          href: appendMonthToLink(`/competitions/${competitionId}/results`),
        },
        {
          name: "Fixtures",
          href: appendMonthToLink(`/competitions/${competitionId}/fixtures`),
        },

        {
          name: "Standing",
          href: `/competitions/${competitionId}/standing`,
        },
      ]
    : [
        {
          name: "fixtures",
          href: appendMonthToLink("/fixtures"),
        },
        {
          name: "results",
          href: appendMonthToLink("/results"),
        },
        {
          name: "standing",
          href: `/standing`,
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
            {seasons && seasons.length > 0 && 
            <Suspense fallback={null}>
              <Seasons seasons={seasons} currentSeason={currentSeason} />
            </Suspense>}
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
