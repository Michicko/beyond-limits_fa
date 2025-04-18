import { Schema } from "@/amplify/data/resource";
import {
  Avatar,
  AvatarGroup,
  Card,
  Flex,
  HStack,
  List,
  Text,
  Heading,
} from "@chakra-ui/react";
import React from "react";

interface IScorer {
  goals: number;
  playerId: string;
  player: Pick<
    Schema["Player"]["type"],
    "id" | "firstname" | "lastname" | "homeKit"
  >;
}

function Scorers({ ranking }: { ranking: IScorer[] }) {
  const headingStyles = {
    color: "text_lg",
    mb: "10px",
    fontWeight: "semibold",
  };
  return (
    <Card.Root border={"1px solid"} borderColor={"neutral"} py={"10px"}>
      <Card.Header py={"10px"} px={"10px"}>
        <Heading as={"h3"} css={headingStyles}>
          Top Scorers
        </Heading>{" "}
      </Card.Header>
      <Card.Body>
        <List.Root>
          {ranking.map((scorer, i) => {
            return (
              <List.Item key={scorer.playerId}>
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  h={"45px"}
                  px={"10px"}
                  borderBottom={"1px solid"}
                  borderColor={
                    i === ranking.length - 1 ? "transparent" : "neutral"
                  }
                >
                  <HStack>
                    <AvatarGroup>
                      <Avatar.Root size={"sm"}>
                        <Avatar.Fallback name="M" />
                        <Avatar.Image src={"/images/avatar.webp"} />
                      </Avatar.Root>
                    </AvatarGroup>
                    <Text
                      mb={0}
                      textTransform={"capitalize"}
                      fontWeight={"medium"}
                      color={"text_lg"}
                      fontSize={"md"}
                    >{`${scorer.player.firstname} ${scorer.player.lastname}`}</Text>
                  </HStack>
                  <Text
                    mb={0}
                    textTransform={"capitalize"}
                    fontWeight={"normal"}
                    color={"text_md"}
                    fontSize={"sm"}
                  >
                    {scorer.goals} goals
                  </Text>
                </Flex>
              </List.Item>
            );
          })}
        </List.Root>
      </Card.Body>
    </Card.Root>
  );
}

export default Scorers;
