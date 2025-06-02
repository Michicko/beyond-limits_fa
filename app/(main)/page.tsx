import Button from "@/components/main/Button/Button";
import Container from "@/components/main/Container/Container";
import Flex from "@/components/main/Container/Flex";
import Grid from "@/components/main/Container/Grid";
import PlayerList from "@/components/main/Player/PlayerList";
import Slider from "@/components/main/Slider/Slider";
import Standing from "@/components/main/Standing/Standing";
import CustomLink from "@/components/main/Typography/CustomLink";
import Heading from "@/components/main/Typography/Heading";
import Text from "@/components/main/Typography/Text";
import VideoCards from "@/components/main/VideoCard/VideoCards";
import "@aws-amplify/ui-react/styles.css";
import clsx from "clsx";
import { fetchHomepageData } from "../_actions/actions";
import ArticleList from "@/components/Article/ArticleList";
import MatchCard from "@/components/main/MatchCard/MatchCard";
import { appendMonthToLink } from "@/lib/helpers";

export default async function Home() {
  const { data: homepageContent } = await fetchHomepageData();

  return (
    <>
      <Slider />
      <main className="main">
        {homepageContent && (
          <Container as="section" size="lg">
            <div className={clsx("matchcards")}>
              <Grid col="2fr" gap="md">
                <>
                  {homepageContent.lastMatch && (
                    <MatchCard
                      match={homepageContent?.lastMatch}
                      fixedHeight={true}
                      theme="light"
                    />
                  )}
                  {homepageContent?.fixtures &&
                    homepageContent.fixtures.length > 0 && (
                      <MatchCard
                        match={homepageContent.fixtures[0]}
                        fixedHeight={true}
                        theme="light"
                      />
                    )}
                </>
              </Grid>
              {homepageContent?.nnlStanding &&
                homepageContent.nnlStanding.length > 0 && (
                  <Standing
                    name={"NNL"}
                    showFull={false}
                    standings={homepageContent.nnlStanding}
                    showLongName={false}
                  />
                )}
            </div>
          </Container>
        )}
        {homepageContent?.articles && homepageContent.articles.length > 0 && (
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
                link={{ name: "View more news", href: "/news?page=1" }}
                type="section"
              />
            </Flex>
            <ArticleList articles={homepageContent.articles.slice(0, 4)} />
          </Container>
        )}
        {homepageContent?.players && homepageContent.players.length > 0 && (
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
                link={{ name: "View More Players", href: "/players/under_19" }}
                type="section"
              />
            </Flex>
            <PlayerList players={homepageContent.players} />
          </Container>
        )}
        {homepageContent?.fixtures && homepageContent.fixtures.length > 0 && (
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
                {homepageContent.fixtures.slice(1, 4).map((match, i) => {
                  return (
                    <MatchCard
                      match={match}
                      theme={i === 0 ? "dark" : i === 1 ? "light" : "dark"}
                      key={match.id}
                    />
                  );
                })}
              </>
            </Grid>
            <Flex justify="center" align="center" my={"iv"}>
              <Button
                type="secondary"
                isLink={true}
                size={"md"}
                text={"View more matches"}
                url={appendMonthToLink("/fixtures")}
              />
            </Flex>
          </Container>
        )}
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
        {homepageContent && (
          <Container as="section" size="md">
            {homepageContent?.highlights && (
              <VideoCards videos={homepageContent.highlights} />
            )}
          </Container>
        )}
      </main>
    </>
  );
}
