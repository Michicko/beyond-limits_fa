"use client";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
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
import { createTrophy, updateTrophy } from "@/app/_actions/tropy-actions";
import ArticleFilterModal from "../ArticleFIlterModal/ArticleFilterModal";
import { getArticle } from "@/app/_actions/article-actions";

type ICompetition = Pick<Schema["Competition"]["type"], "id" | "longName">;
interface ITrophy {
  id: string;
  image: string;
  competitionId: string;
  articleId: string;
  trophyName: string;
}

function TrophyFormDialog({
  competitions,
  trophy,
  openForm,
  setOpenForm,
  setTrophy,
}: {
  competitions: ICompetition[];
  trophy?: ITrophy;
  openForm?: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  setTrophy: React.Dispatch<React.SetStateAction<ITrophy>>;
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

  const resetOpenForm = () => {
    setTempData({
      image: "",
      competitionId: "",
      articleId: "",
      trophyName: "",
    });
    setTrophy({
      id: "",
      image: "",
      competitionId: "",
      articleId: "",
      trophyName: "",
    });
    setOpenForm(true);
    setArticle(null);
  };

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
    if (article) {
      formData.append("articleId", article.id);
    }

    if (trophy) {
      startTransition(async () => {
        const res = await updateTrophy(trophy.id, formData, trophy.trophyName);

        if (res.status === "success" && res.data) {
          mutationToast(
            "trophy",
            competiton?.longName || "competition",
            "update"
          );
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
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
          setArticle(null);
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  const [article, setArticle] = useState<{ id: string; title: string } | null>(
    null
  );
  const [openArticleModal, setOpenArticleModal] = useState(false);

  const fetchArticle = useCallback(async (articleId: string) => {
    try {
      const response = (await getArticle(articleId)).data;
      if (response && response.title) {
        setArticle({ id: articleId, title: response.title });
      }
    } catch (error) {
      console.error("Failed to fetch article:", error);
    }
  }, []);

  useEffect(() => {
    if (trophy) {
      setTempData({
        image: trophy.image || "",
        competitionId: trophy.competitionId || "",
        articleId: trophy.articleId || "",
        trophyName: trophy.trophyName || "",
      });
      fetchArticle(trophy.articleId);
    }
  }, [trophy]);

  return (
    <HStack justify={"flex-end"} mb={"20px"} gap="2">
      <FormDialog
        btn={
          <Button
            colorPalette={"blue"}
            variant={"solid"}
            css={btnStyles}
            size={"md"}
            onClick={resetOpenForm}
          >
            Create Trophy
          </Button>
        }
        scrollable={true}
        name="Trophy"
        openForm={openForm}
        setOpenForm={setOpenForm}
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
                <HStack gap={4} position={"relative"}>
                  <Image
                    src={tempData.image}
                    width="75"
                    height="75"
                    alt={"trophy image"}
                  />
                  <IconButton
                    position={"absolute"}
                    top={"10px"}
                    right={"10px"}
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
            <Field.Root position={"relative"}>
              <Field.Label color={"text_lg"}>Article</Field.Label>
              <Button
                type="button"
                variant={"outline"}
                colorPalette={"gray"}
                w={"full"}
                py={"2"}
                onClick={() => setOpenArticleModal(true)}
                textAlign={"left"}
                justifyContent={"flex-start"}
                pl={"10px"}
              >
                {article ? article.title : "Search Articles"}
              </Button>
              {openArticleModal && (
                <ArticleFilterModal
                  setOpenArticleModal={setOpenArticleModal}
                  setArticle={setArticle}
                />
              )}
            </Field.Root>
            <FormBtn disabled={isPending}>
              {getButtonStatus(trophy, "Trophy", isPending)}
            </FormBtn>
          </Stack>
        </form>
      </FormDialog>
    </HStack>
  );
}

export default TrophyFormDialog;
