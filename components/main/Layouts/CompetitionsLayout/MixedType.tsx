import React, { Suspense } from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutMain from "./LayoutMain";
import LayoutContainer from "./LayoutContainer";
import { ILink, ISeason } from "@/lib/definitions";
import Header from "../../Header/Header";
import Heading from "../../Typography/Heading";
import Tab from "../../Tab/Tab";
import LinkTab from "../../Tab/LinkTab";

function MixedType({
  headerBg,
  pageTitle,
  seasons,
  children,
  links,
}: {
  headerBg?: string;
  pageTitle: string;
  seasons: ISeason[];
  children: React.ReactElement;
  links: ILink[];
}) {
  const phases = [
    {
      name: "league phase",
      value: "league-phase",
    },
    {
      name: "play offs",
      value: "play-offs",
    },
  ];
  return (
    <>
      <Header
        bg={headerBg || "/images/fixtures-layout-header-bg.png"}
        alt="2024 / 2025 ongoing campaign"
        overlay={true}
      >
        <LayoutHeader>
          <>
            <Heading color="white" level={1} letterCase="upper" type="primary">
              {pageTitle}
            </Heading>
            <select name="season" id="season">
              {seasons.map((el) => {
                return (
                  <option value={el.season} key={el.season}>
                    {el.season}
                  </option>
                );
              })}
            </select>
            <select name="season" id="season">
              {phases.map((el) => {
                return (
                  <option value={el.value} key={el.value}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </>
        </LayoutHeader>
      </Header>
      <LayoutMain>
        <>
          <Suspense key={pageTitle} fallback={null}>
            <Tab bg="white" theme="theme-2">
              <>
                {links.map((el) => {
                  return <LinkTab link={el} theme="theme-2" key={el.href} />;
                })}
              </>
            </Tab>
          </Suspense>

          <LayoutContainer>{children}</LayoutContainer>
        </>
      </LayoutMain>
    </>
  );
}

export default MixedType;
