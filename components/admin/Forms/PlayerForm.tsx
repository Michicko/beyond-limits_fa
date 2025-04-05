"use client";
import { Field, Input, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import CheckBox from "@/components/admin/CheckBox/CheckBox";
import FormBtn from "./FormBtn";
import { player_positions } from "@/lib/placeholder-data";
import { IPlayer } from "@/lib/definitions";
import { CldImage } from "next-cloudinary";

function PlayerForm({ player }: { player?: IPlayer }) {
  const [formData, setFormData] = useState({
    firstname: player?.firstname || "",
    lastname: player?.lastname || "",
    positionId: player?.positionId || "",
    squadNo: player?.squadNo || "",
    dob: player?.dob || "",
    height: player?.height || "",
    weight: player?.weight || "",
    dominantFoot: player?.dominantFoot || "",
    isTwoFooted: player?.isTwoFooted || false,
    homeKit: player?.homeKit || "",
    awayKit: player?.awayKit || "",
    ageGroup: player?.ageGroup || "",
    status: player?.status || "",
  });

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting");
  };

  console.log(formData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack gap="4">
          <Field.Root required>
            <FormLabel>Position</FormLabel>
            <CustomSelect
              options={player_positions.map((el) => {
                return {
                  label: el.longName,
                  value: el.id,
                };
              })}
              name="positionId"
              description="player position"
              selectedValue={formData.positionId}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>firstname</FormLabel>
            <Input
              name={"firstname"}
              type={"text"}
              placeholder="Enter first name"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              value={formData.firstname}
              onChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>lastname</FormLabel>
            <Input
              name={"lastname"}
              type={"text"}
              placeholder="Enter lastname"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              value={formData.lastname}
              onChange={handleOnChange}
            />
            <Field.HelperText
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"text_md"}
            >
              Enter lastname (surname)
            </Field.HelperText>
          </Field.Root>
          <SimpleGrid gap={5} columns={{ base: 1, md: 2 }}>
            <Field.Root required>
              <FormLabel>Home kit</FormLabel>
              {formData.homeKit ? (
                <CldImage
                  src={formData.homeKit}
                  width="600"
                  height="600"
                  alt=""
                />
              ) : (
                <CustomFileUpload
                  description="home kit"
                  id="home_kit"
                  filename={
                    formData.firstname + " " + formData.lastname + " home-kit"
                  }
                  onUploaded={(path) =>
                    setFormData({ ...formData, homeKit: path })
                  }
                />
              )}
            </Field.Root>
            <Field.Root required>
              <FormLabel>Away kit</FormLabel>
              {formData.awayKit ? (
                <CldImage
                  src={formData.awayKit}
                  width="600"
                  height="600"
                  alt=""
                />
              ) : (
                <CustomFileUpload
                  description="away kit"
                  id="away_kit"
                  filename={
                    formData.firstname + " " + formData.lastname + " away-kit"
                  }
                  onUploaded={(path) =>
                    setFormData({ ...formData, awayKit: path })
                  }
                />
              )}
            </Field.Root>
          </SimpleGrid>
          <Field.Root required>
            <FormLabel>Dob</FormLabel>
            <Input
              name={"dob"}
              type={"date"}
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              value={formData.dob}
              onChange={handleOnChange}
            />
            <Field.HelperText
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"text_md"}
            >
              Enter Date of birth
            </Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <FormLabel>squad number</FormLabel>
            <Input
              name={"squad number"}
              type={"number"}
              placeholder="Enter squad number"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              value={formData.squadNo}
              onChange={handleOnChange}
            />
            <Field.HelperText
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"text_md"}
            >
              Enter squad number e.g 7
            </Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <FormLabel>Weight</FormLabel>
            <Input
              name={"weight"}
              type={"number"}
              placeholder="Enter weight"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              value={formData.weight}
              onChange={handleOnChange}
            />
            <Field.HelperText
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"text_md"}
            >
              Enter weight in (kg) e.g 75
            </Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <FormLabel>Height</FormLabel>
            <Input
              name={"height"}
              type={"number"}
              placeholder="Enter height"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              value={formData.height}
              onChange={handleOnChange}
            />
            <Field.HelperText
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"text_md"}
            >
              Enter height in (cm) e.g 156
            </Field.HelperText>
          </Field.Root>
          <Field.Root required>
            <FormLabel>Age Group</FormLabel>
            <CustomSelect
              options={["under-17", "under-19"].map((el) => {
                return {
                  label: el,
                  value: el.toUpperCase(),
                };
              })}
              name="age_group"
              description="age group"
              selectedValue={formData.ageGroup}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>Player status</FormLabel>
            <CustomSelect
              options={["active", "loan", "inactive"].map((el) => {
                return {
                  label: el,
                  value: el.toUpperCase(),
                };
              })}
              name="status"
              description="player status"
              selectedValue={formData.status}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>Dominant Foot</FormLabel>
            <CustomSelect
              options={["Left", "Right"].map((el) => {
                return {
                  label: el,
                  value: el.toUpperCase(),
                };
              })}
              name="dominant_foot"
              description="dominant foot"
              selectedValue={formData.dominantFoot}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <CheckBox
            name={"isTwoFooted"}
            checked={formData.isTwoFooted}
            size="xs"
            label="Is Two Footed"
            onCheckedChange={(e) => {
              setFormData({ ...formData, isTwoFooted: e.checked });
            }}
            showLabel={true}
          />
          <FormBtn>Create Player</FormBtn>
        </Stack>
      </form>
    </>
  );
}

export default PlayerForm;
