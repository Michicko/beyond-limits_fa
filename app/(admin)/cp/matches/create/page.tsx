"use client";
import BackButton from "@/components/admin/BackButton";
import MatchForm from "@/components/admin/Forms/MatchForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { getDefaultSeason } from "@/lib/helper";
import { seasons } from "@/lib/placeholder-data";
import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

function page() {
  const seasonOptions = seasons.map((season) => {
    return {
      label: season.season,
      value: season.season,
    };
  });

  const defaultSeason = getDefaultSeason(seasons);
  const [season, setSeason] = useState(defaultSeason);

  const handleSeason = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setSeason(value);
  };

  return (
    <>
      <PageTitle pageTitle="Create Match" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack mb={"3"} justifyContent={"space-between"} gap={"4"} w={"full"}>
          <BackButton />
          <Box minW={"150px"}>
            <Text
              color={"text_md"}
              textTransform={"capitalize"}
              fontSize={"sm"}
              mb={"1"}
            >
              Select season
            </Text>
            <CustomSelect
              name="season"
              description="season"
              options={seasonOptions}
              selectedValue={season}
              handleOnChange={handleSeason}
              fixedWidth={true}
            />
          </Box>
        </HStack>
        <MatchForm />
      </Box>
    </>
  );
}

export default page;
