import Button from "@/components/main/Button/Button";
import Container from "@/components/main/Container/Container";
import Flex from "@/components/main/Container/Flex";
import Grid from "@/components/main/Container/Grid";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import PlayerList from "@/components/main/Player/PlayerList";
import Slider from "@/components/main/Slider/Slider";
import Standing from "@/components/main/Standing/Standing";
import CustomLink from "@/components/main/Typography/CustomLink";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import VideoCards from "@/components/main/VideoCard/VideoCards";
import { match_highlights } from "@/lib/placeholder-data";
import "@aws-amplify/ui-react/styles.css";
import clsx from "clsx";
import { fetchHomepageData } from "../_actions/actions";
import ArticleList from "@/components/Article/ArticleList";

export default async function Home() {
  const { data: homepageContent, status } = await fetchHomepageData();

  return (
    <>
      <Slider />
      <main className="main">
        <Container as="section" size="lg">
          <div className={clsx("matchcards")}>
            <Grid col="2fr" gap="md">
              <>
                {homepageContent && (
                  <>
                    {homepageContent.lastMatch && (
                      <MatchCard
                        match={homepageContent?.lastMatch}
                        theme="light"
                        iconSize={"md"}
                      />
                    )}
                    {homepageContent.upcomingMatch && (
                      <MatchCard
                        match={homepageContent.upcomingMatch}
                        theme="light"
                        iconSize={"md"}
                      />
                    )}
                  </>
                )}
              </>
            </Grid>
            {homepageContent && (
              <Standing
                showFull={false}
                standings={homepageContent.nnlStanding}
                showLongName={false}
              />
            )}
          </div>
        </Container>
        <Container as="section" size="lg">
          <Flex
            align="center"
            justify="between"
            wrap={true}
            gap="xxs"
            mb={"sm"}
          >
            <Heading level={2} type="section" letterCase="upper">
              Latest News
            </Heading>
            <CustomLink
              link={{ name: "View more news", href: "/news" }}
              type="section"
            />
          </Flex>
          {homepageContent?.articles && (
            <ArticleList articles={homepageContent.articles} />
          )}
        </Container>
        <Container as="section" size="lg">
          <Flex
            align="center"
            justify="between"
            wrap={true}
            gap="xxs"
            mb={"sm"}
          >
            <Heading level={2} type="section" letterCase="upper">
              Our Players
            </Heading>
            <CustomLink
              link={{ name: "View More Players", href: "/players/under-19" }}
              type="section"
            />
          </Flex>
          {homepageContent?.players && (
            <PlayerList players={homepageContent.players} />
          )}
        </Container>
        <Container as="section" size="md">
          <Heading
            level={2}
            type="section"
            letterCase="upper"
            mb="xxl"
            align={"center"}
          >
            Upcoming matches
          </Heading>
          <Grid col="3" gap="sm">
            <>
              {homepageContent?.upcomingMatch && (
                <>
                  <MatchCard
                    match={homepageContent.upcomingMatch}
                    theme="dark"
                    iconSize={"md"}
                  />
                  <MatchCard
                    match={homepageContent.upcomingMatch}
                    theme="light"
                    iconSize={"md"}
                  />
                  <MatchCard
                    match={homepageContent.upcomingMatch}
                    theme="dark"
                    iconSize={"md"}
                  />
                </>
              )}
            </>
          </Grid>
          <Flex justify="center" align="center" my={"iv"}>
            <Button
              type="secondary"
              isLink={true}
              size={"md"}
              text={"View more matches"}
              url={`/fixtures?season=2024/2025`}
            />
          </Flex>
        </Container>
        <Container as="section" size="md">
          <Flex justify="center" align="center" my={"iv"}>
            <Text
              color="white"
              size="base"
              letterCase="normal"
              weight="regular"
              type="interlude"
            >
              At Beyond Limits Football Academy, we believe in more than just
              developing exceptional football talent; we strive to shape
              responsible, empowered individuals who contribute positively to
              society. As the juniors of the esteemed Remo Stars in the Nigerian
              Professional Football League, we take pride in our commitment to
              community development.
            </Text>
          </Flex>
        </Container>
        <Container as="section" size="md">
          <VideoCards videos={match_highlights.slice(0, 3)} />
          <></>
        </Container>
      </main>
    </>
  );
}
