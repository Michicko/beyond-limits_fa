"use client";
import React, { useRef, useState, useTransition } from "react";
import { Box, Field, Input, Stack } from "@chakra-ui/react";
import FormBtn from "./FormBtn";
import { getButtonStatus } from "@/lib/helpers";
import FormLabel from "./FormLabel";
import slugify from "slugify";
import { Schema } from "@/amplify/data/resource";
import TextEditor from "@/components/TextEditor/TextEditor";
import { JSONContent } from "@tiptap/react";
import ListItemAdd from "../ListItemAdd/ListItemAdd";
import {
  createHighlight,
  updateHighlight,
} from "@/app/_actions/highlight-actions";
import FormContainer from "./FormContainer";
import useToast from "@/hooks/useToast";
import UploadImage from "../CustomFileUpload/UploadImage";
import RequiredLabel from "./RequiredLabel";

type IHighlight = Pick<
  Schema["Highlight"]["type"],
  "id" | "coverImage" | "description" | "title" | "videoId" | "tags"
>;

function HighlightForm({
  highlight,
  method,
}: {
  highlight?: IHighlight;
  method: "CREATE" | "UPDATE";
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [tempData, setTempData] = useState({
    title: highlight?.title || "",
    coverImage: highlight?.coverImage || "",
    description: highlight
      ? JSON.parse(highlight.description as string)
      : ({} as JSONContent),
    videoId: highlight?.videoId || "",
    tags: highlight?.tags || [],
  });

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>(
    (highlight?.tags as string[]) || []
  );

  const [editorKey, setEditorKey] = useState(101);

  const [isPending, startTransition] = useTransition();
  const { mutationToast, errorToast } = useToast();

  const handleHighlightDescription = (json: JSONContent) => {
    setTempData({ ...tempData, description: json });
  };

  const resetForm = () => {
    setTempData({
      title: "",
      coverImage: "",
      description: {} as JSONContent,
      videoId: "",
      tags: [],
    });
    setTags([]);
    formRef.current?.reset();
    setEditorKey((prev) => prev + 1); // force TextEditor re-mount
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (method === "CREATE") {
      const data = { ...tempData, id: "", tags, constantKey: "all" };
      startTransition(async () => {
        const res = await createHighlight(data);

        if (res.status === "success" && res.data) {
          mutationToast("Highlight", res.data.title, "create");
          formRef.current?.reset();
          resetForm();
        }

        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }

    if (method === "UPDATE" && highlight) {
      const data = { ...tempData, tags, id: highlight.id, constantKey: "all" };
      startTransition(async () => {
        const res = await updateHighlight(data);

        if (res.status === "success" && res.data) {
          mutationToast("Highlight", res.data.title, "update");
        }

        if (res.status === "error") {
          errorToast(res.message);
        }
      });
    }
  };

  return (
    <FormContainer>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack gap="2">
          <Field.Root required mb={"5"}>
            <FormLabel>
              Title
              <RequiredLabel />
            </FormLabel>
            <Input
              name="title"
              placeholder="Title"
              p={"0 10px"}
              value={tempData.title}
              onChange={(e) =>
                setTempData({ ...tempData, title: e.target.value })
              }
            />
          </Field.Root>
          <Field.Root required mb={"5"}>
            <FormLabel>
              Youtube Video ID
              <RequiredLabel />
            </FormLabel>
            <Input
              name="videoId"
              placeholder="Youtube video Id"
              p={"0 10px"}
              value={tempData.videoId}
              onChange={(e) =>
                setTempData({ ...tempData, videoId: e.target.value })
              }
            />
            <Field.HelperText>
              Enter Youtube Id e.g: k-SvlnHFA6c
            </Field.HelperText>
          </Field.Root>

          <Box mb={5} w={"full"}>
            <UploadImage
              image={tempData.coverImage}
              onClearImage={() => setTempData({ ...tempData, coverImage: "" })}
              imageSize={200}
              filename={slugify(`${tempData.title}`, {
                lower: true,
              })}
              id={"highlight-cover-image"}
              onUploaded={(res: any) => {
                setTempData({ ...tempData, coverImage: res.secure_url });
              }}
              label={"Cover Image"}
            />
          </Box>

          <Field.Root required mb={"5"} border={"transparent"}>
            <FormLabel>
              Description
              <RequiredLabel />
            </FormLabel>
            <TextEditor
              content={tempData.description}
              handleOnUpdate={handleHighlightDescription}
              editorKey={editorKey}
            />
          </Field.Root>
          <ListItemAdd
            name={tag}
            names={tags}
            setName={setTag}
            setNames={setTags}
            desc={"Tag"}
          />
          <FormBtn disabled={isPending}>
            {getButtonStatus(highlight, "Highlight", isPending)}
          </FormBtn>
        </Stack>
      </form>
    </FormContainer>
  );
}

export default HighlightForm;
