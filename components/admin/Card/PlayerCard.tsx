"use client";
import {
  Box,
  Card,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Separator,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenu/CustomMenuItem";
import Link from "next/link";
import { IPlayer } from "../../../lib/definitions";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import { deletePlayer } from "@/app/_actions/player-actions";

function PlayerCard({ player }: { player: IPlayer }) {
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

  const infoTitle = {
    fontSize: { base: "xs", sm: "sm" },
    color: "text_base",
    fontWeight: "medium",
    textTransform: "uppercase",
    mb: "2.5",
  };

  const infoValue = {
    fontSize: { base: "sm", sm: "md" },
    color: "text_md",
    fontWeight: "medium",
    textTransform: "uppercase",
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
          {player.homeKit && (
            <GridItem
              css={gridStyles}
              order={{ base: 1, lg: 1 }}
              position={"relative"}
              colSpan={1}
            >
              <Image
                src={player.homeKit}
                width="300"
                height="300"
                alt={player.firstname}
                loading="lazy"
              />
            </GridItem>
          )}
          <GridItem
            order={{ base: 3, lg: 2 }}
            alignSelf={"center"}
            colSpan={{ base: 2, lg: 1 }}
          >
            <Box mb={"15px"}>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                color={"text_md"}
                fontWeight={"medium"}
                textTransform={"capitalize"}
                mb={"1"}
              >
                {player.firstname}
              </Text>
              <Text
                fontSize={{ base: "md", sm: "lg" }}
                color={"text_lg"}
                fontWeight={"semibold"}
                textTransform={"capitalize"}
              >
                {player.lastname}
              </Text>
            </Box>
            <Separator
              variant={"solid"}
              bg={"rgba(255, 255, 255, .25)"}
              w={"full"}
              h={"1px"}
              mb={"15px"}
            />
            <HStack gap={"6"}>
              <Box mb={"sm"}>
                <Text css={infoTitle}>Position</Text>
                <Text css={infoValue}>{player.playerPosition?.shortName}</Text>
              </Box>
              <Box mb={"sm"}>
                <Text css={infoTitle}>Foot</Text>
                <Text css={infoValue}>{player.dominantFoot}</Text>
              </Box>
              <Box mb={"sm"}>
                <Text css={infoTitle}>Dob</Text>
                <Text css={infoValue}>{player.dob}</Text>
              </Box>
            </HStack>
          </GridItem>
          <GridItem order={{ base: 2, lg: 3 }} justifySelf={"center"}>
            <Heading
              as={"h3"}
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight={"bold"}
              color={"gray.300"}
            >
              {player.squadNo}
            </Heading>
          </GridItem>
        </Grid>
      </Card.Body>
      <CustomMenu position="absolute">
        <>
          <CustomMenuItem label="Edit" showBorder={true}>
            <Link href={`/cp/players/${player.id}/edit`}>Edit</Link>
          </CustomMenuItem>
          <DeleteBtn
            name={`${player.firstname} ${player.lastname}`}
            id={player.id}
            onDelete={deletePlayer}
          />
        </>
      </CustomMenu>
    </Card.Root>
  );
}

export default PlayerCard;
