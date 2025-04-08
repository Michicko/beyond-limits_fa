import { HStack, Stack, Steps } from "@chakra-ui/react";
import React from "react";
import CompetitionSeasonCard from "./CompetitionSeasonCard";
import CompetitionSeasonInfo from "./CompetitionSeasonInfo";
import FormBtn from "../Forms/FormBtn";

function CupContent({
  competitionName,
  season,
  index,
  setCupId,
  goToNextStep,
}: {
  competitionName: string;
  season: string;
  index: number;
  setCupId: React.Dispatch<React.SetStateAction<string>>;
  goToNextStep: () => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("competitionNameSeason", competitionName + season);
    formData.append("status", "PENDING");
    formData.append("winnerId", "");

    const data = Array.from(formData.entries(), ([key, val]) => [key, val]);
    goToNextStep();
    console.log(data);
  };

  return (
    <Steps.Content index={index}>
      <form onSubmit={handleSubmit}>
        <CompetitionSeasonCard title={`Create Cup`}>
          <Stack gap={2} mb={"5"}>
            <CompetitionSeasonInfo label={"Name"} value={competitionName} />
            <CompetitionSeasonInfo label={"Season"} value={season} />
          </Stack>
          <HStack justifyContent={"flex-end"}>
            <FormBtn type="submit">Create Cup</FormBtn>
          </HStack>
        </CompetitionSeasonCard>
      </form>
    </Steps.Content>
  );
}

export default CupContent;
