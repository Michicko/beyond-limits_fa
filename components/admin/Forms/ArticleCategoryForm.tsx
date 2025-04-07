"use client";
import { Field, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useTransition } from "react";
import FormLabel from "./FormLabel";
import { Schema } from "@/amplify/data/resource";
import FormBtn from "./FormBtn";
import { getButtonStatus } from "@/lib/helpers";
import useToast from "@/hooks/useToast";
import {
  createArticleCategory,
  updateArticleCategory,
} from "@/app/_actions/actions";

type IArticleCategory = Pick<
  Schema["ArticleCategory"]["type"],
  "id" | "category" | "createdAt"
>;

function ArticleCategoryForm({
  articleCategory,
}: {
  articleCategory?: IArticleCategory | null;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const { errorToast, mutationToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (articleCategory) {
      startTransition(async () => {
        const res = await updateArticleCategory(
          articleCategory.id,
          formData,
          articleCategory.category
        );

        if (res.status === "success" && res.data) {
          mutationToast("category", res.data.category, "update");
        }

        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    } else {
      startTransition(async () => {
        const res = await createArticleCategory(formData);
        if (res.status === "success" && res.data) {
          mutationToast("category", res.data.category, "create");
          formRef.current?.reset();
        }
        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Stack gap="4">
        <Field.Root required>
          <FormLabel>Category</FormLabel>
          <Input
            name={"category"}
            type={"text"}
            placeholder="Enter category"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            defaultValue={articleCategory?.category || ""}
          />
          <Field.HelperText
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"text_md"}
          >
            Enter category e.g academy news
          </Field.HelperText>
        </Field.Root>
        <FormBtn disabled={isPending}>
          {getButtonStatus(articleCategory, "category", isPending)}
        </FormBtn>
      </Stack>
    </form>
  );
}

export default ArticleCategoryForm;
