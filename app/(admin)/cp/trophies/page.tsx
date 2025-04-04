"use client";
import TrophyCard from "@/components/admin/Card/TrophyCard";
import CustomFileUpload from "@/components/admin/CustomFileUpload/CustomFileUpload";
import FormDialog from "@/components/admin/FormDialog/FormDialog";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import { competitions, honors } from "@/lib/placeholder-data";
import {
  Box,
  Button,
  Field,
  Flex,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Trophies() {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

  const [competition, setCompetition] = useState("");

  const handleOnChange = (e: { target: { name: string; value: string } }) => {
    const { value } = e.target;
    setCompetition(value);
  };

  return (
    <>
      <PageTitle pageTitle="Trophies" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-end"} mb={"20px"} gap="2">
          <FormDialog
            btn={
              <Button
                colorPalette={"blue"}
                variant={"solid"}
                css={btnStyles}
                size={"md"}
              >
                Create Trophy
              </Button>
            }
            scrollable={true}
            name="Player"
          >
            <form>
              <Stack gap="2">
                <Field.Root required>
                  <Field.Label color={"text_lg"}>Trophy</Field.Label>
                  <CustomFileUpload
                    description="trophy"
                    filename="trophy"
                    onUploaded={() => console.log("upload")}
                  />
                </Field.Root>
                <Field.Root required>
                  <Field.Label color={"text_lg"}>Competition</Field.Label>
                  <CustomSelect
                    options={competitions.map((el) => {
                      return {
                        label: el.longName,
                        value: el.longName,
                      };
                    })}
                    name="Competition"
                    description="competition"
                    selectedValue={competition}
                    handleOnChange={handleOnChange}
                  />
                </Field.Root>
                <Button type="submit" css={btnStyles} colorPalette={"blue"}>
                  Save
                </Button>
              </Stack>
            </form>
          </FormDialog>
        </HStack>
        <Flex my={"20px"} direction={"column"} gap={"4"}>
          {honors.map((trophy) => {
            return <TrophyCard key={trophy.id} trophy={trophy} />;
          })}
        </Flex>
      </Box>
    </>
  );
}

export default Trophies;
