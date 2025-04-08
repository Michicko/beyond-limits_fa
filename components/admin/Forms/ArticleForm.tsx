"use client";
import { getIcon } from "@/lib/icons";
import {
  Button,
  Field,
  HStack,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useRef, useState, useTransition } from "react";
import { JSONContent } from "@tiptap/react";
import TextEditor from "@/components/TextEditor/TextEditor";
import FormLabel from "./FormLabel";
import { CldImage } from "next-cloudinary";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import slugify from "slugify";
import useToast from "@/hooks/useToast";
import { createArticle, updateArticle } from "@/app/_actions/actions";
import { Schema } from "@/amplify/data/resource";
import { getButtonStatus } from "@/lib/helpers";
import CustomSelect from "../CustomSelect/CustomSelect";
import CreateButton from "@/components/Buttons/CreateButton";
import Link from "next/link";
import ArticleCategory from "@/components/Article/ArticleCategory";

type IArticle = Pick<
  Schema["Article"]["type"],
  "id" | "title" | "coverImage" | "content" | "status" | "articleCategoryId"
>;

type IArticleCategory = Pick<
  Schema["ArticleCategory"]["type"],
  "id" | "category" | "createdAt"
>;

function ArticleForm({
  article,
  articleCategories,
}: {
  article?: IArticle | null;
  articleCategories: IArticleCategory[];
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

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    Object.entries(tempData).forEach(([Key, value]) => {
      formData.append(Key, value.toString());
    });
    formData.delete("content");
    formData.append("content", JSON.stringify(tempData.content));

    if (article) {
      startTransition(async () => {
        const res = await updateArticle(article.id, formData, article.title);

        if (res.status === "success" && res.data) {
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
          formRef.current?.reset();
          setTempData({
            title: "",
            coverImage: "",
            content: {},
            status: "UNPUBLISHED",
            articleCategoryId: "",
          });
          handleArticleContent({});
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <>
      <Stack mb={"10"}>
        <HStack justify={"flex-end"} mb={4}>
          <CreateButton
            link="/cp/article-categories/create"
            text={"Create Category"}
          />
        </HStack>
        <HStack flexWrap={"wrap"} columnGap={"3"} rowGap={"2"}>
          {articleCategories.map((category) => {
            return (
              <ArticleCategory
                key={category.id}
                category={category.category}
                link={`/cp/article-categories/${category.id}/edit`}
              />
            );
          })}
        </HStack>
      </Stack>
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
            disabled={isPending}
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
            disabled={!article || article.status === "PUBLISHED"}
            type="button"
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
            disabled={!article}
            type="button"
          >
            {getIcon("trash")} Trash
          </Button>
        </HStack>

        <Field.Root required mb={"5"}>
          <Input
            placeholder="Add Title"
            border={"transparent"}
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
        <Field.Root required mb={"5"}>
          <FormLabel>Cover Image</FormLabel>
          {tempData.coverImage && (
            <HStack gap={4}>
              <CldImage
                src={tempData.coverImage}
                width="400"
                height="400"
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
              onUploaded={(path: string) => {
                setTempData({ ...tempData, coverImage: path });
              }}
              id="cover-image"
              filename={slugify(tempData.title, { lower: true })}
              type="drag-drop"
            />
          )}
        </Field.Root>
        <TextEditor
          content={tempData.content}
          handleOnUpdate={handleArticleContent}
        />
      </form>
    </>
  );
}

export default ArticleForm;
