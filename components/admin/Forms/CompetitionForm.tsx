"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import FormLabel from "./FormLabel";
import CustomSelect from "@/components/admin/CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { Schema } from "@/amplify/data/resource";
import slugify from "slugify";
import useToast from "@/hooks/useToast";
import {
  createCompetition,
  updateCompetition,
} from "@/app/_actions/competition-actions";
import { getButtonStatus, objectToFormData } from "@/lib/helpers";
import UploadImage from "../CustomFileUpload/UploadImage";
import SelectedArticle from "@/components/ArticleFilterModal/SelectedArticle";
import FormContainer from "./FormContainer";

type ICompetition = Pick<
  Schema["Competition"]["type"],
  | "id"
  | "logo"
  | "shortName"
  | "longName"
  | "competitionType"
  | "trophyArticleId"
  | "trophyImage"
>;

function CompetitionForm({
  competition,
  competitionTypes,
}: {
  competition?: ICompetition | null;
  competitionTypes: string[];
}) {
  const [competitionData, setCompetitionData] = useState({
    id: competition?.id || "",
    logo: competition?.logo || "",
    shortName: competition?.shortName || "",
    longName: competition?.longName || "",
    competitionType: competition?.competitionType || "",
    trophyImage: competition?.trophyImage || "",
    trophyArticleId: competition?.trophyArticleId || "",
  });

  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setCompetitionData({ ...competitionData, [name]: value });
  };

  const resetForm = () => {
    setCompetitionData({
      id:  "",
      logo: "",
      shortName:  "",
      longName: "",
      competitionType: "",
      trophyImage: "",
      trophyArticleId: "",
    });
    formRef.current?.reset();
  }

  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();
  const [article, setArticle] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [openArticleModal, setOpenArticleModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = objectToFormData(competitionData);
    formData.delete("trophyArticleId");
    if (article) {
      formData.append("trophyArticleId", article.id);
    }

    if (competition) {
      startTransition(async () => {
        const res = await updateCompetition(
          competition.id,
          formData,
          competition.longName
        );
        if (res.status === "success" && res.data) {
          mutationToast("competition", res.data.longName, "update");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      formData.delete("id");

      startTransition(async () => {
        const res = await createCompetition(formData);
        if (res.status === "success" && res.data) {
          mutationToast("competition", res.data.longName, "create");
          resetForm();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
   <FormContainer>
     <form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap="4">
        <Field.Root required>
          <FormLabel>Competition Type</FormLabel>
          <CustomSelect
            options={competitionTypes.map((el) => {
              return {
                label: el,
                value: el,
              };
            })}
            name="competitionType"
            description="competition Type"
            selectedValue={competitionData.competitionType}
            handleOnChange={onChange}
            fixedWidth={true}
          />
        </Field.Root>
        <Field.Root required>
          <FormLabel>short name</FormLabel>
          <Input
            name={"shortName"}
            type={"text"}
            placeholder="Enter Short name"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            value={competitionData.shortName}
            onChange={onChange}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter short e.g nnl
          </Field.HelperText>
        </Field.Root>
        <Field.Root required>
          <FormLabel>long name</FormLabel>
          <Input
            name={"longName"}
            type={"text"}
            placeholder="Enter long name"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            value={competitionData.longName}
            onChange={onChange}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter long e.g nigerian national league
          </Field.HelperText>
        </Field.Root>
        {(competitionData.trophyImage ||
          competitionData.logo ||
          competitionData.longName) && (
          <>
            <UploadImage
              image={competitionData.logo}
              onClearImage={() =>
                setCompetitionData({ ...competitionData, logo: "" })
              }
              imageSize={70}
              filename={slugify(competitionData.longName, { lower: true })}
              id={"logo"}
              onUploaded={(res: any) =>
                setCompetitionData({
                  ...competitionData,
                  logo: res.secure_url,
                })
              }
              label={"Logo"}
            />
            <UploadImage
              image={competitionData.trophyImage}
              onClearImage={() =>
                setCompetitionData({ ...competitionData, trophyImage: "" })
              }
              imageSize={250}
              filename={slugify(`${competitionData.longName} trophy`, {
                lower: true,
              })}
              id={"trophy-image"}
              onUploaded={(res: any) =>
                setCompetitionData({
                  ...competitionData,
                  trophyImage: res.secure_url,
                })
              }
              label={"Trophy Image"}
            />
          </>
        )}
        <SelectedArticle
          articleId={competitionData.trophyArticleId}
          label={"Trophy Article"}
          title={article?.title ?? ""}
          openArticleModal={openArticleModal}
          setOpenArticleModal={setOpenArticleModal}
          setArticle={setArticle}
        />
        <FormBtn disabled={isPending}>
          {getButtonStatus(competition, "Competition", isPending)}
        </FormBtn>
      </Stack>
    </form>
   </FormContainer>
  );
}

export default CompetitionForm;
