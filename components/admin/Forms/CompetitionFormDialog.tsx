"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import FormDialog from "../FormDialog/FormDialog";
import { Field, HStack, Stack } from "@chakra-ui/react";
import CustomSelect from "../CustomSelect/CustomSelect";
import FormBtn from "./FormBtn";
import { getButtonStatus, objectToFormData } from "@/lib/helpers";
import slugify from "slugify";
import useToast from "@/hooks/useToast";
import UploadImage from "../CustomFileUpload/UploadImage";
import SelectedArticle from "../ArticleFIlterModal/SelectedArticle";
import FormInput from "../FormInput/FormInput";
import CreateButton from "@/components/Buttons/CreateButton";
import {
  createCompetition,
  updateCompetition,
} from "@/app/_actions/competition-actions";
import { Nullable } from "@/lib/definitions";

interface ICompetition {
  id?: string;
  logo: string;
  shortName: string;
  longName: string;
  type?: "LEAGUE" | "CUP" | "MIXED" | null | undefined;
  competitionSeasonIds?: Nullable<string>[] | null;
  trophyImage?: Nullable<string>;
  trophyArticleId?: Nullable<string>;
}

function CompetitionFormDialog({
  dbCompetition,
  openForm,
  setOpenForm,
  isEditing,
  setIsEditing,
}: {
  dbCompetition?: ICompetition | null;
  openForm?: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [competition, setCompetition] = useState({
    id: "",
    logo: "",
    shortName: "",
    longName: "",
    type: "",
    competitionSeasonIds: [],
    trophyImage: "",
    trophyArticleId: "",
  });

  const resetOpenForm = () => {
    setIsEditing(false);
    setCompetition({
      id: "",
      logo: "",
      shortName: "",
      longName: "",
      type: "",
      competitionSeasonIds: [],
      trophyImage: "",
      trophyArticleId: "",
    });
    setArticle(null);
    setOpenArticleModal(false);
    if (!openForm) {
      setOpenForm(true);
    }
  };

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();
  const onChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setCompetition({ ...competition, [name]: value.toLowerCase() });
  };
  const [article, setArticle] = useState<{ id: string; title: string } | null>(
    null
  );
  const [openArticleModal, setOpenArticleModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = objectToFormData(competition);
    formData.delete("trophyArticleId");
    if (article) {
      formData.append("trophyArticleId", article.id);
    }

    if (isEditing) {
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
          resetOpenForm();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  useEffect(() => {
    if (dbCompetition) {
      setCompetition({
        id: dbCompetition.id || "",
        logo: dbCompetition.logo || "",
        shortName: dbCompetition.shortName || "",
        longName: dbCompetition.longName || "",
        type: dbCompetition.type || "",
        competitionSeasonIds: (dbCompetition.competitionSeasonIds as []) || [],
        trophyImage: dbCompetition.trophyImage || "",
        trophyArticleId: dbCompetition.trophyArticleId || "",
      });
    }
  }, [dbCompetition]);

  return (
    <HStack justify={"flex-end"} mb={"20px"} gap="2">
      <FormDialog
        btn={
          <CreateButton
            text="Create Competition"
            onClick={resetOpenForm}
            type="btn"
          />
        }
        scrollable={true}
        name="Trophy"
        openForm={openForm}
        setOpenForm={setOpenForm}
      >
        <form ref={formRef} onSubmit={handleSubmit}>
          <Stack gap="2">
            <FormInput
              label={"shortName"}
              placeholder={"Enter short name"}
              name={"shortName"}
              value={competition.shortName}
              id={"shortName"}
              onChange={onChange}
              description={"Enter short name e.g nnl"}
            />
            <FormInput
              label={"longName"}
              placeholder={"Enter long name"}
              name={"longName"}
              value={competition.longName}
              id={"longName"}
              onChange={onChange}
              description={"Enter long name e.g nigerian national league"}
            />
            <Field.Root required>
              <Field.Label color={"text_lg"}>Competition</Field.Label>
              <CustomSelect
                options={["CUP", "LEAGUE", "MIXED"].map((el) => {
                  return {
                    label: el,
                    value: el,
                  };
                })}
                name="type"
                description="Type"
                selectedValue={competition.type}
                handleOnChange={(e) =>
                  setCompetition({ ...competition, type: e.target.value })
                }
              />
            </Field.Root>
            <UploadImage
              image={competition.logo}
              onClearImage={() => setCompetition({ ...competition, logo: "" })}
              imageSize={70}
              filename={slugify(competition.longName, { lower: true })}
              id={"logo"}
              onUploaded={(res: any) =>
                setCompetition({ ...competition, logo: res.secure_url })
              }
              label={"Logo"}
            />
            <UploadImage
              image={competition.trophyImage}
              onClearImage={() =>
                setCompetition({ ...competition, trophyImage: "" })
              }
              imageSize={300}
              filename={slugify(`${competition.longName} trophy`, {
                lower: true,
              })}
              id={"trophy-image"}
              onUploaded={(res: any) =>
                setCompetition({ ...competition, trophyImage: res.secure_url })
              }
              label={"Trophy Image"}
            />
            <SelectedArticle
              articleId={article?.id}
              label={"Trophy Article"}
              title={article?.title ?? ""}
              openArticleModal={openArticleModal}
              setOpenArticleModal={setOpenArticleModal}
              setArticle={setArticle}
            />
            <FormBtn disabled={isPending}>
              {getButtonStatus(isEditing, "Competition", isPending)}
            </FormBtn>
          </Stack>
        </form>
      </FormDialog>
    </HStack>
  );
}

export default CompetitionFormDialog;
