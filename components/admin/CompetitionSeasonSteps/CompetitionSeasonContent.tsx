import { Heading, Steps, Stack, HStack, Text } from "@chakra-ui/react";
import React from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import FormBtn from "../Forms/FormBtn";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";

function CompetitionSeasonContent({
  competitionName,
  season,
  entity,
  index,
}: {
  competitionName: string;
  season: string;
  entity: string;
  index: number;
}) {
  return (
    <Steps.Content index={index}>
      <CompetitionSeasonCard title={`Create ${entity}`}>
        <Stack gap={2} mb={"5"}>
          <CompetitionSeasonInfo label={"Name"} value={competitionName} />
          <CompetitionSeasonInfo label={"Season"} value={season} />
        </Stack>
        <HStack justifyContent={"flex-end"}>
          <FormBtn type="button">Create {entity}</FormBtn>
        </HStack>
      </CompetitionSeasonCard>
    </Steps.Content>
  );
}

export default CompetitionSeasonContent;
