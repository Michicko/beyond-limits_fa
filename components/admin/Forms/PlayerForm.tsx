"use client";
import { Field, Image, Input, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import FormLabel from "./FormLabel";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import CheckBox from "@/components/admin/CheckBox/CheckBox";
import FormBtn from "./FormBtn";
import { IPlayer } from "@/lib/definitions";
import slugify from "slugify";
import useToast from "@/hooks/useToast";
import { createPlayer, updatePlayer } from "@/app/_actions/player-actions";
import { getButtonStatus } from "@/lib/helpers";
import { Schema } from "@/amplify/data/resource";

function PlayerForm({
  player,
  positions,
  statuses,
  ageGroups,
  dominantFoots,
}: {
  player?: IPlayer | null;
  positions: Pick<
    Schema["PlayerPosition"]["type"],
    "id" | "longName" | "shortName"
  >[];
  statuses: string[];
  ageGroups: string[];
  dominantFoots: string[];
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [tempData, setTempData] = useState({
    firstname: player?.firstname || "",
    lastname: player?.lastname || "",
    homeKit: player?.homeKit || "",
    awayKit: player?.awayKit || "",
    isTwoFooted: player?.isTwoFooted || false,
    status: player?.status || "",
    ageGroup: player?.ageGroup || "",
    dominantFoot: player?.dominantFoot || "",
    playerPositionId: player?.playerPosition?.id || "",
  });

  const positionOptions = positions.map((el) => {
    return {
      label: el.longName,
      value: el.id,
    };
  });

  const handleOnChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };
  const [isPending, startTransition] = useTransition();
  const { errorToast, mutationToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("homeKit", tempData.homeKit);
    formData.append("awayKit", tempData.awayKit);
    formData.append("isTwoFooted", String(tempData.isTwoFooted));
    formData.delete("scorers[0]");
    formData.delete("scorers[1]");
    formData.delete("scorers[2]");
    formData.delete("scorers[3]");
    formData.delete("scorers[4]");

    if (player) {
      startTransition(async () => {
        const res = await updatePlayer(player.id, formData);
        if (res.status === "success" && res.data) {
          mutationToast(
            "player",
            `${res.data.firstname} ${res.data.lastname}`,
            "update"
          );
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      startTransition(async () => {
        const res = await createPlayer(formData);

        if (res.status === "success" && res.data) {
          mutationToast(
            "player",
            `${res.data.firstname} ${res.data.lastname}`,
            "create"
          );
          formRef.current?.reset();
          setTempData({
            firstname: "",
            lastname: "",
            homeKit: "",
            awayKit: "",
            isTwoFooted: false,
            status: "",
            ageGroup: "",
            dominantFoot: "",
            playerPositionId: "",
          });
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Stack gap="4">
          <Field.Root required>
            <FormLabel>Position</FormLabel>
            <CustomSelect
              options={positionOptions}
              name="playerPositionId"
              description="player position"
              selectedValue={tempData.playerPositionId}
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
              value={tempData.firstname}
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
              value={tempData.lastname}
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
              {tempData.homeKit && (
                <Image src={tempData.homeKit} width="600" height="600" alt="" />
              )}
              {!tempData.homeKit && tempData.firstname && tempData.lastname && (
                <CustomFileUpload
                  type="select"
                  description="home kit"
                  id="home_kit"
                  filename={slugify(
                    `${tempData.firstname} ${tempData.lastname} homekit`,
                    {
                      lower: true,
                    }
                  )}
                  onUploaded={(res: any) => {
                    const url = res.secure_url.replace(
                      "/upload/",
                      "/upload/e_background_removal,f_auto,q_auto/"
                    );
                    setTempData({ ...tempData, homeKit: url });
                  }}
                />
              )}
            </Field.Root>
            <Field.Root required>
              <FormLabel>Away kit</FormLabel>
              {tempData.awayKit && (
                <Image src={tempData.awayKit} width="600" height="600" alt="" />
              )}
              {!tempData.awayKit && tempData.firstname && tempData.lastname && (
                <CustomFileUpload
                  description="away kit"
                  type="select"
                  id="away_kit"
                  filename={slugify(
                    `${tempData.firstname} ${tempData.lastname} awaykit`,
                    {
                      lower: true,
                    }
                  )}
                  onUploaded={(res: any) => {
                    const url = res.secure_url.replace(
                      "/upload/",
                      "/upload/e_background_removal,f_auto,q_auto/"
                    );
                    setTempData({ ...tempData, awayKit: url });
                  }}
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
              defaultValue={player?.dob || ""}
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
              name={"squadNo"}
              type={"number"}
              placeholder="Enter squad number"
              px={"2"}
              color={"text_lg"}
              fontSize={"sm"}
              fontWeight={"medium"}
              mb={"5px"}
              defaultValue={player?.squadNo || ""}
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
              defaultValue={player?.weight || ""}
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
              defaultValue={player?.height || ""}
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
              options={ageGroups.map((el) => {
                return {
                  label: el,
                  value: el.toUpperCase(),
                };
              })}
              name="ageGroup"
              description="age group"
              selectedValue={tempData.ageGroup}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>Player status</FormLabel>
            <CustomSelect
              options={statuses.map((el) => {
                return {
                  label: el,
                  value: el.toUpperCase(),
                };
              })}
              name="status"
              description="player status"
              selectedValue={tempData.status}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <Field.Root required>
            <FormLabel>Dominant Foot</FormLabel>
            <CustomSelect
              options={dominantFoots.map((el) => {
                return {
                  label: el,
                  value: el,
                };
              })}
              name="dominantFoot"
              description="dominant foot"
              selectedValue={tempData.dominantFoot}
              handleOnChange={handleOnChange}
            />
          </Field.Root>
          <CheckBox
            name={"isTwoFooted"}
            checked={tempData.isTwoFooted}
            size="xs"
            label="Is Two Footed"
            onCheckedChange={(e) => {
              setTempData({ ...tempData, isTwoFooted: e.checked });
            }}
            showLabel={true}
          />
          <FormBtn>{getButtonStatus(player, "Player", isPending)}</FormBtn>
        </Stack>
      </form>
    </>
  );
}

export default PlayerForm;
