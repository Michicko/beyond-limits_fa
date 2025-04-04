"use client";
import { getIcon } from "@/lib/icons";
import {
  Box,
  Button,
  Field,
  FileUpload,
  HStack,
  Icon,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { JSONContent } from "@tiptap/react";
import TextEditor from "../TextEditor/TextEditor";

interface IArticle {
  title: string;
  coverImage: string;
  content: JSONContent;
}

function ArticleForm({ article }: { article?: IArticle }) {
  const btnStyles = {
    p: "4px 20px",
    fontSize: "sm",
    fontWeight: "500",
    borderRadius: "2xl",
    cursor: "pointer",
  };
  const [formData, setFormData] = useState<IArticle>({
    title: article?.title || "",
    coverImage: article?.coverImage || "",
    content: article?.content || {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleArticleContent = (json: JSONContent) => {
    setFormData({ ...formData, content: json });
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack justifyContent={"flex-end"} gap={4} flexWrap={"wrap"} mb={"6"}>
        <Button
          size={"sm"}
          css={btnStyles}
          variant={"subtle"}
          bg={"gray.200"}
          color={"primary_variant"}
          _hover={{ bg: "primary_variant", color: "gray.100" }}
        >
          Save
        </Button>
        <Button
          size={"sm"}
          css={btnStyles}
          variant={"solid"}
          bg={"primary"}
          _hover={{ bg: "primary_variant", color: "gray.100" }}
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
        />
      </Field.Root>

      <FileUpload.Root
        alignItems="stretch"
        maxFiles={1}
        border={"2px dashed gray"}
        borderRadius={"sm"}
        accept={["image/jpeg", "image/webp", "image/png"]}
        mb={"5"}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Dropzone>
          <Icon size="md" color="fg.muted">
            {getIcon("upload")}
          </Icon>
          <FileUpload.DropzoneContent>
            <Box>Drag and drop a cover image here</Box>
            <Box color="fg.muted">.png, .webp, .jpg up to 5MB</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.List />
      </FileUpload.Root>
      <TextEditor
        content={formData.content}
        handleOnUpdate={handleArticleContent}
      />
    </form>
  );
}

export default ArticleForm;
