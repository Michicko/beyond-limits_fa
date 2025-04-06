import { Box, Card, Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import React from "react";
import CustomMenu from "../CustomMenu/CustomMenu";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import { deleteTrophy } from "@/app/_actions/actions";

type TrophyWithCompetition = {
  id: string;
  image: string;
  competition: {
    longName: string;
  };
};

function TrophyCard({ trophy }: { trophy: TrophyWithCompetition }) {
  const cardStyles = {
    bg: `linear-gradient(217deg, rgba(50, 123, 192, 0.8), rgba(26, 65, 101, 0) 70.71%), linear-gradient(127deg, rgba(50, 123, 192, 0.8), rgba(0, 255, 0, 0) 70.71%),
  linear-gradient(336deg, rgba(50, 123, 192, 0.8), rgba(255, 255, 255, 0) 70.71%)`,
    position: "relative",
    cursor: "pointer",
  };

  const gridStyles = {
    position: "relative",
    "& img": {
      objectPosition: "top center",
    },
  };
  return (
    <Card.Root
      css={cardStyles}
      size={"lg"}
      maxW={{ base: "443px", sm: "576px", md: "678px" }}
      position={"relative"}
    >
      <Card.Body p={{ base: "10px", md: "20px" }} overflow={"hidden"}>
        <Grid
          w={"full"}
          mt={"10px"}
          gridTemplateColumns={{
            base: "1fr 4rem",
            lg: "1fr 1fr 6rem",
          }}
          gap={"4"}
          rowGap={"6"}
        >
          <GridItem
            css={gridStyles}
            order={{ base: 1, lg: 1 }}
            position={"relative"}
            colSpan={1}
          >
            <Image
              rounded="md"
              src={trophy.image}
              alt={trophy.competition.longName}
              aspectRatio={4 / 3}
              width="300px"
              objectFit={"contain"}
            />
          </GridItem>
          <GridItem
            order={{ base: 3, lg: 2 }}
            alignSelf={"center"}
            colSpan={{ base: 2, lg: 1 }}
          >
            <Box mb={"15px"}>
              <Heading
                color={"text_lg"}
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={"bold"}
                textTransform={"capitalize"}
              >
                {trophy.competition.longName}
              </Heading>
            </Box>
          </GridItem>
          <GridItem order={{ base: 2, lg: 3 }} justifySelf={"center"}>
            <Heading
              as={"h3"}
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight={"bold"}
              color={"gray.300"}
            >
              {1}
            </Heading>
          </GridItem>
        </Grid>
      </Card.Body>
      <CustomMenu position="absolute">
        <DeleteBtn
          name={trophy.competition.longName}
          id={trophy.id}
          onDelete={deleteTrophy}
        />
      </CustomMenu>
    </Card.Root>
  );
}

export default TrophyCard;
