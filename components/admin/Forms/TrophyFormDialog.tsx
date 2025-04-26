"use client";
import React, { useRef, useState, useTransition } from "react";
import FormDialog from "../FormDialog/FormDialog";
import {
  Button,
  Field,
  HStack,
  IconButton,
  Image,
  Stack,
} from "@chakra-ui/react";
import CustomSelect from "../CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { getButtonStatus } from "@/lib/helpers";
import FormLabel from "./FormLabel";
import { getIcon } from "@/lib/icons";
import slugify from "slugify";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import { Schema } from "@/amplify/data/resource";
import useToast from "@/hooks/useToast";
import { createTrophy } from "@/app/_actions/tropy-actions";

type ICompetition = Pick<Schema["Competition"]["type"], "id" | "longName">;
type IArticle = Pick<Schema["Article"]["type"], "id" | "title">;

function TrophyFormDialog({
  competitions,
  articles,
}: {
  competitions: ICompetition[];
  articles: IArticle[];
}) {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };
  const formRef = useRef<HTMLFormElement | null>(null);
  const [tempData, setTempData] = useState({
    image: "",
    competitionId: "",
    articleId: "",
    trophyName: "",
  });

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();
  const competiton = competitions.find(
    (el) => el.id === tempData.competitionId
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    Object.entries(tempData).forEach(([Key, value]) => {
      formData.append(Key, value.toString());
    });
    formData.delete("articleId");
    formData.append(
      "trophyName",
      `${competiton?.longName.toString()} trophy` || ""
    );

    startTransition(async () => {
      const res = await createTrophy(formData);

      if (res.status === "success" && res.data) {
        mutationToast(
          "trophy",
          competiton?.longName || "competition",
          "create"
        );
        formRef.current?.reset();
        setTempData({
          image: "",
          competitionId: "",
          articleId: "",
          trophyName: "",
        });
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
  };

  return (
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
        <form ref={formRef} onSubmit={handleSubmit}>
          <Stack gap="2">
            <Field.Root required>
              <Field.Label color={"text_lg"}>Competition</Field.Label>
              <CustomSelect
                options={competitions.map((el) => {
                  return {
                    label: el.longName,
                    value: el.id,
                  };
                })}
                name="competitionId"
                description="competition"
                selectedValue={tempData.competitionId}
                handleOnChange={(e) =>
                  setTempData({ ...tempData, competitionId: e.target.value })
                }
              />
            </Field.Root>
            <Field.Root required>
              <FormLabel>Trophy image</FormLabel>
              {tempData.image && (
                <HStack gap={4}>
                  <Image
                    src={tempData.image}
                    width="75"
                    height="75"
                    alt={"trophy image"}
                  />
                  <IconButton
                    size={"2xs"}
                    title="delete"
                    colorPalette={"red"}
                    onClick={() => setTempData({ ...tempData, image: "" })}
                  >
                    {getIcon("close")}
                  </IconButton>
                </HStack>
              )}
              {!tempData.image && competiton?.longName && (
                <CustomFileUpload
                  description="trophy image"
                  onUploaded={(res: any) => {
                    setTempData({ ...tempData, image: res.secure_url });
                  }}
                  id="trophy-image"
                  filename={slugify(`${competiton?.longName} trophy`, {
                    lower: true,
                  })}
                />
              )}
            </Field.Root>
            <Field.Root>
              <Field.Label color={"text_lg"}>Article</Field.Label>
              <CustomSelect
                options={articles.map((el) => {
                  return {
                    label: el.title,
                    value: el.id,
                  };
                })}
                name="articleId"
                description="article"
                selectedValue={tempData.articleId}
                handleOnChange={(e) =>
                  setTempData({ ...tempData, articleId: e.target.value })
                }
              />
            </Field.Root>
            <FormBtn disabled={isPending}>
              {getButtonStatus(false, "Trophy", isPending)}
            </FormBtn>
          </Stack>
        </form>
      </FormDialog>
    </HStack>
  );
}

export default TrophyFormDialog;
