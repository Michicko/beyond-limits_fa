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

const scorers = [
  {
    id: 1,
    img: "",
    firstname: "john",
    lastname: "doe",
    goals: 5,
  },
  {
    id: 2,
    img: "",
    firstname: "john",
    lastname: "Okafor",
    goals: 4,
  },
  {
    id: 3,
    img: "",
    firstname: "OLuseyi",
    lastname: "Ojo",
    goals: 3,
  },
  {
    id: 4,
    img: "",
    firstname: "john",
    lastname: "doe",
    goals: 2,
  },
];

function Scorers() {
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
          {scorers.map((scorer, i) => {
            return (
              <List.Item key={scorer.id}>
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  h={"45px"}
                  px={"10px"}
                  borderBottom={"1px solid"}
                  borderColor={
                    i === scorers.length - 1 ? "transparent" : "neutral"
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
                    >{`${scorer.firstname} ${scorer.lastname}`}</Text>
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
