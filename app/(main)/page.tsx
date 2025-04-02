import ArticleList from "@/components/main/Article/ArticleList";
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
import { getDefaultSeason } from "@/lib/helper";
import {
  articles,
  leagues,
  match_highlights,
  matches,
  players,
  seasons,
  standing,
  teams,
} from "@/lib/placeholder-data";
import "@aws-amplify/ui-react/styles.css";
import clsx from "clsx";

export default function Home() {
  const previous_match = matches.find((el) => el.status === "FINISHED");
  const upcoming_match = matches.find((el) => el.status === "UPCOMING");
  const currentSeason = getDefaultSeason(seasons);
  const league = leagues.find((el) => el.competition?.short_name === "nnl");
  const standings = standing.filter(
    (el) => league && el.league_id === league.id
  );
  const nnl_standing = standings.map((el) => {
    const team = teams.find((team_el) => team_el.id === el.team_id);
    return {
      ...el,
      team,
    };
  });

  return (
    <>
      <Slider />
      <main className="main">
        <Container as="section" size="lg">
          <div className={clsx("matchcards")}>
            <Grid col="2fr" gap="md">
              <>
                {upcoming_match && previous_match && (
                  <>
                    <MatchCard
                      match={previous_match}
                      theme="light"
                      iconSize={"md"}
                    />
                    <MatchCard
                      match={upcoming_match}
                      theme="light"
                      iconSize={"md"}
                    />
                  </>
                )}
              </>
            </Grid>
            {league && (
              <Standing
                showFull={false}
                standings={nnl_standing}
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
          <ArticleList articles={articles.slice(0, 4)} />
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
          <PlayerList players={players.slice(0, 3)} />
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
              {upcoming_match && (
                <>
                  <MatchCard
                    match={upcoming_match}
                    theme="dark"
                    iconSize={"md"}
                  />
                  <MatchCard
                    match={upcoming_match}
                    theme="light"
                    iconSize={"md"}
                  />
                  <MatchCard
                    match={upcoming_match}
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
              url={`/fixtures?season=${encodeURIComponent(
                currentSeason.toString()
              )}`}
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
        </Container>
      </main>
    </>
  );
}
