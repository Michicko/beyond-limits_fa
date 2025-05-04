"use client";
import { Button, Field } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import ArticleFilterModal from "./ArticleFilterModal";
import { getArticle } from "@/app/_actions/article-actions";

interface IArticle {
  id: string;
  title: string;
}

function SelectedArticle({
  articleId,
  label,
  title,
  openArticleModal,
  setOpenArticleModal,
  setArticle,
}: {
  label: string;
  title: string;
  openArticleModal: boolean;
  setOpenArticleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setArticle: React.Dispatch<React.SetStateAction<IArticle | null>>;
  articleId?: string;
}) {
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
    if (articleId) {
      fetchArticle(articleId);
    }
  }, [articleId]);

  return (
    <Field.Root position={"relative"}>
      <Field.Label color={"text_lg"}>{label}</Field.Label>
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
        {title || "Search Articles"}
      </Button>
      {openArticleModal && (
        <ArticleFilterModal
          setOpenArticleModal={setOpenArticleModal}
          setArticle={setArticle}
        />
      )}
    </Field.Root>
  );
}

export default SelectedArticle;
