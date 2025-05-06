"use client";
import { getIcon } from "@/lib/icons";
import {
  Button,
  Field,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import { JSONContent } from "@tiptap/react";
import TextEditor from "@/components/TextEditor/TextEditor";
import FormLabel from "./FormLabel";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import slugify from "slugify";
import useToast from "@/hooks/useToast";
import {
  createArticle,
  deleteArticle,
  updateArticle,
  publishArticle,
} from "@/app/_actions/article-actions";
import { Schema } from "@/amplify/data/resource";
import { getButtonStatus } from "@/lib/helpers";
import CustomSelect from "../CustomSelect/CustomSelect";

type IArticle = Pick<
  Schema["Article"]["type"],
  | "id"
  | "title"
  | "coverImage"
  | "content"
  | "status"
  | "articleCategoryId"
  | "matchId"
  | "matchHomeTeamLogo"
  | "matchAwayTeamLogo"
>;

type IArticleCategory = Pick<
  Schema["ArticleCategory"]["type"],
  "id" | "category" | "createdAt"
>;

type IMatch = Pick<
  Schema["Match"]["type"],
  "id" | "homeTeam" | "awayTeam" | "date"
>;

function ArticleForm({
  article,
  articleCategories,
  matches,
}: {
  article?: IArticle | null;
  articleCategories: IArticleCategory[];
  matches: IMatch[];
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const btnStyles = {
    p: "4px 20px",
    fontSize: "sm",
    fontWeight: "500",
    borderRadius: "2xl",
    cursor: "pointer",
  };

  const [tempData, setTempData] = useState({
    title: article?.title || "",
    coverImage: article?.coverImage || "",
    content: article
      ? JSON.parse(article.content as string)
      : ({} as JSONContent),
    status: article?.status || "UNPUBLISHED",
    articleCategoryId: article?.articleCategoryId || "",
  });

  const handleArticleContent = (json: JSONContent) => {
    setTempData({ ...tempData, content: json });
  };
  const [editorKey, setEditorKey] = useState(12);

  const resetForm = () => {
    setTempData({
      title: "",
      coverImage: "",
      content: {} as JSONContent, // force cast to ensure shape
      status: "UNPUBLISHED",
      articleCategoryId: "",
    });
    setMatchId("");
    setEditorKey((prev) => prev + 1); // force TextEditor re-mount
  };

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast, mutationPromiseToast } = useToast();
  const [matchId, setMatchId] = useState(article?.matchId || "");

  const match = matches.find((match) => match.id === matchId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    Object.entries(tempData).forEach(([Key, value]) => {
      formData.append(Key, value.toString());
    });
    formData.delete("content");
    formData.delete("matchId");
    formData.append("content", JSON.stringify(tempData.content));

    if (matchId && match && match.homeTeam && match.awayTeam) {
      formData.append("matchId", matchId);
      formData.append("matchHomeTeamLogo", match.homeTeam.logo);
      formData.append("matchAwayTeamLogo", match.awayTeam.logo);
    }

    if (article) {
      startTransition(async () => {
        const res = await updateArticle(article.id, formData, article.title);
        if (res.status === "success" && res.data) {
          if (matchId) {
            formData.append("matchId", matchId);
          }
          mutationToast("article", res.data.title, "update");
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      startTransition(async () => {
        const res = await createArticle(formData);
        if (res.status === "success" && res.data) {
          mutationToast("article", res.data.title, "create");
          resetForm();
          formRef.current?.reset();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  const [isTrashing, setIsTrashing] = useState(false);

  const trashArticle = async () => {
    if (confirm("Are you sure?")) {
      const success = {
        title: "Article Deleted",
        desc: `${article?.title} deleted successfully!`,
      };
      const err = {
        title: "Error trashing article",
        desc: `Failed to delete article`,
      };
      const loading = {
        title: "Trashing Article",
        desc: `Deleting ${article?.title}, please wait...`,
      };
      setIsTrashing(true);
      if (article) {
        mutationPromiseToast(
          deleteArticle(article.id),
          success,
          err,
          loading,
          setIsTrashing,
        );
      }
    }
  };

  const [isPublishing, setIsPublishing] = useState(false);

  const publishArticleFn = async () => {
    const success = {
      title: "Article Published",
      desc: `${article?.title} published successfully!`,
    };
    const err = {
      title: "Error publishing article",
      desc: `Failed to publish article`,
    };
    const loading = {
      title: "Publishing Article",
      desc: `Publishing ${article?.title}, please wait...`,
    };
    setIsPublishing(true);
    if (article) {
      const formData = new FormData();
      formData.append("id", article.id);
      formData.append("status", "PUBLISHED");

      mutationPromiseToast(
        publishArticle(formData),
        success,
        err,
        loading,
        setIsPublishing,
      );
    }
  };

  return (
    <>
      {articleCategories.length < 1 && (
        <Text my={5}>Add Category before creating an article.</Text>
      )}
      <form onSubmit={handleSubmit} ref={formRef}>
        <HStack justifyContent={"flex-end"} gap={4} flexWrap={"wrap"} mb={"6"}>
          <Button
            size={"sm"}
            css={btnStyles}
            variant={"subtle"}
            bg={"gray.200"}
            color={"primary_variant"}
            _hover={{ bg: "primary_variant", color: "gray.100" }}
            _disabled={{ bg: "primary_variant", color: "gray.100" }}
            disabled={isPending || articleCategories.length < 1}
            type="submit"
          >
            {getButtonStatus(article, "Article", isPending)}
          </Button>
          <Button
            size={"sm"}
            css={btnStyles}
            variant={"solid"}
            bg={"primary"}
            _hover={{ bg: "primary_variant", color: "gray.100" }}
            disabled={
              !article || article.status === "PUBLISHED" || isPublishing
            }
            type="button"
            onClick={async () => {
              await publishArticleFn();
            }}
          >
            Publish
          </Button>
          <Button
            size={"sm"}
            css={btnStyles}
            variant={"plain"}
            bg={"red.100"}
            color={"error"}
            _hover={{ bg: "red.600", color: "red.100" }}
            disabled={!article || isTrashing}
            type="button"
            onClick={async () => {
              await trashArticle();
            }}
          >
            {getIcon("trash")} Trash
          </Button>
        </HStack>

        <Field.Root required mb={"5"}>
          <Input
            placeholder="Add Title"
            p={"0 10px"}
            _placeholder={{
              fontSize: "lg",
              fontWeight: "700",
            }}
            value={tempData.title}
            onChange={(e) =>
              setTempData({ ...tempData, title: e.target.value })
            }
          />
        </Field.Root>
        <Field.Root required mb={"5"}>
          <FormLabel>Category</FormLabel>
          <CustomSelect
            options={articleCategories.map((el) => {
              return {
                label: el.category,
                value: el.id,
              };
            })}
            name="articleCategoryId"
            description="article category"
            selectedValue={tempData.articleCategoryId}
            handleOnChange={(e) =>
              setTempData({ ...tempData, articleCategoryId: e.target.value })
            }
          />
        </Field.Root>
        <Field.Root mb={5}>
          <Field.Label>Match</Field.Label>
          <CustomSelect
            name={"matchId"}
            description={"Match"}
            selectedValue={matchId}
            options={matches.map((match) => {
              return {
                label:
                  match.homeTeam?.longName +
                  " vs " +
                  match.awayTeam?.longName +
                  ` (${match.date})`,
                value: match.id,
              };
            })}
            handleOnChange={(e) => {
              setMatchId(e.target.value);
            }}
            id={"match"}
          />
        </Field.Root>
        {!matchId && (
          <Field.Root required mb={"5"}>
            <FormLabel>Cover Image</FormLabel>
            {tempData.coverImage && (
              <HStack gap={4}>
                <Image
                  src={tempData.coverImage}
                  width="200"
                  height="200"
                  alt={tempData.title}
                />
                <IconButton
                  size={"2xs"}
                  title="delete"
                  colorPalette={"red"}
                  alignSelf={"flex-start"}
                  onClick={() => setTempData({ ...tempData, coverImage: "" })}
                >
                  {getIcon("close")}
                </IconButton>
              </HStack>
            )}
            {!tempData.coverImage && tempData.title && (
              <CustomFileUpload
                description="cover image"
                onUploaded={(res: any) => {
                  setTempData({ ...tempData, coverImage: res.secure_url });
                }}
                id="cover-image"
                filename={slugify(tempData.title, { lower: true })}
                type="drag-drop"
              />
            )}
          </Field.Root>
        )}

        <TextEditor
          editorKey={editorKey}
          content={tempData.content}
          handleOnUpdate={handleArticleContent}
        />
      </form>
    </>
  );
}

export default ArticleForm;
