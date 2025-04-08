import { Card, Heading } from "@chakra-ui/react";
import React from "react";

function CompetitionSeasonCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card.Root w={"full"} maxW={"500px"} display={"block"} m={"0 auto"}>
      <Card.Header bg={"primary"} p={"4"}>
        <Heading as={"h2"} color={"white"}>
          {title}
        </Heading>
      </Card.Header>
      <Card.Body
        p={"4"}
        border={"1px solid"}
        borderColor={"gray.200"}
        // bgColor={"card_bg"}
        minH={"150px"}
      >
        {children}
      </Card.Body>
    </Card.Root>
  );
}

export default CompetitionSeasonCard;
