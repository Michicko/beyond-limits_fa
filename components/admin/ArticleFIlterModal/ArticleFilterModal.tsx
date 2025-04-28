"use client";
import { filterArticle } from "@/app/_actions/article-actions";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  List,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IArticle {
  id: string;
  title: string;
}

function ArticleFilterModal({
  setArticle,
  setOpenArticleModal,
}: {
  setOpenArticleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setArticle: React.Dispatch<React.SetStateAction<IArticle | null>>;
}) {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [resText, setResText] = useState("");

  const handleFilterArticle = useCallback(async (searchText: string) => {
    if (!searchText) {
      setArticles([]);
      return;
    }
    setLoading(true);
    setResText("");
    try {
      const { data: articlesData, errors } = await filterArticle(searchText);
      if (errors) {
        setResText("");
        toast.dismiss();
        toast.error(errors[0].message, {
          duration: 8000,
        });
      }
      if (articlesData) {
        setArticles(articlesData);
        if (articlesData.length < 1) {
          setResText("No article with that keyword.");
        }
      }
    } catch (error) {
      setResText("");
      toast.dismiss();
      toast.error((error as Error).message, {
        duration: 8000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleFilterArticle(text);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [text, handleFilterArticle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSelectArticle = (article: IArticle) => {
    setArticle(article);
    setOpenArticleModal(false);
  };

  return (
    <Box
      position={"fixed"}
      w={"100%"}
      maxW={"500px"}
      h={"350px"}
      p={"4"}
      top={"50%"}
      left={"50%"}
      transform={"translate(-50%, -50%)"}
      zIndex={"500"}
    >
      <Stack
        position={"relative"}
        border={"1px solid"}
        borderColor={"gray.200"}
        bg={"white"}
        h={"full"}
        p={2}
      >
        <Input
          type="search"
          name="article"
          p={"0 10px"}
          placeholder="Search for article"
          variant={"outline"}
          color={"text_lg"}
          value={text}
          onChange={handleChange}
          mb={2}
        />
        <Box h={"200px"} w={"full"} overflowY={"scroll"}>
          {loading && (
            <Flex
              h={"full"}
              w={"full"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <HStack gap={2} alignItems={"center"}>
                <Spinner size="sm" border={"1px solid blue"} />
                <Text as={"span"}>Searching...</Text>
              </HStack>
            </Flex>
          )}
          {resText && <Text>{resText}</Text>}
          {articles && articles.length > 0 && (
            <List.Root>
              {articles.map((article) => {
                return (
                  <List.Item
                    key={article.id}
                    py={"10px"}
                    px={"5px"}
                    borderBottom={"1px solid"}
                    borderColor={"gray.200"}
                    _hover={{ bg: "gray.100" }}
                    _selected={{ bg: "gray.100" }}
                    _active={{ bg: "gray.100" }}
                    onClick={() => handleSelectArticle(article)}
                    cursor={"pointer"}
                  >
                    {article.title}
                  </List.Item>
                );
              })}
            </List.Root>
          )}
        </Box>

        <Button
          type="button"
          variant={"outline"}
          colorPalette={"gray"}
          alignSelf={"flex-start"}
          ml={"auto"}
          px={"10px"}
          mt={"auto"}
          onClick={() => setOpenArticleModal(false)}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}

export default ArticleFilterModal;
