"use client";
import React, { useRef, useState } from "react";
import {
  Field,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import FormBtn from "./FormBtn";
import { getButtonStatus } from "@/lib/helpers";
import FormLabel from "./FormLabel";
import { getIcon } from "@/lib/icons";
import slugify from "slugify";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import { Schema } from "@/amplify/data/resource";
import TextEditor from "@/components/TextEditor/TextEditor";
import { JSONContent } from "@tiptap/react";
import ListItemAdd from "../ListItemAdd/ListItemAdd";
import { toast } from "react-hot-toast";
import {
  createHighlight,
  updateHighlight,
} from "@/app/_actions/highlight-actions";
import { Nullable } from "@/lib/definitions";

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
  const [tags, setTags] = useState<Nullable<string>[]>(highlight?.tags || []);
  const [isLoading, setIsLoading] = useState(false);
  const [editorKey, setEditorKey] = useState(101);

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
    const formData = new FormData();
    formData.append("title", tempData.title);
    formData.append("coverImage", tempData.coverImage);
    formData.append("videoId", tempData.videoId);
    formData.append("tags", JSON.stringify(tags));
    formData.append("description", JSON.stringify(tempData.description));

    if (method === "CREATE") {
      setIsLoading(true);
      try {
        const res = await createHighlight(formData);
        if (res.status === "success" && res.data) {
          toast.success(`Successfully created "${res.data.title}" highlight`, {
            duration: 8000,
          });
        }
        setIsLoading(false);
        resetForm();
      } catch (error) {
        setIsLoading(false);
        const message = (error as Error).message;
        toast.error(`Failed to create, ${message}`, {
          duration: 8000,
        });
      }
    }

    if (method === "UPDATE" && highlight) {
      formData.append("id", highlight.id);
      try {
        setIsLoading(true);
        const res = await updateHighlight(
          highlight.id,
          formData,
          highlight.title,
        );
        if (res.status === "success" && res.data) {
          toast.success(`Successfully updated "${res.data.title}" highlight`, {
            duration: 8000,
          });
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const message = (error as Error).message;
        toast.error(`Failed to create, ${message}`, {
          duration: 8000,
        });
      }
    }
  };

  return (
    <Stack mb={"20px"}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack gap="2">
          <Field.Root required mb={"5"}>
            <Input
              name="title"
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
            <Input
              name="videoId"
              placeholder="Youtube video id"
              p={"0 10px"}
              value={tempData.videoId}
              onChange={(e) =>
                setTempData({ ...tempData, videoId: e.target.value })
              }
            />
            <Field.HelperText>Enter url e.g: k-SvlnHFA6c</Field.HelperText>
          </Field.Root>
          <Field.Root>
            <FormLabel>Cover image</FormLabel>
            {tempData.coverImage && (
              <HStack gap={4} position={"relative"}>
                <Image
                  src={tempData.coverImage}
                  width="75"
                  height="75"
                  alt={"cover image"}
                />
                <IconButton
                  size={"2xs"}
                  title="delete"
                  colorPalette={"red"}
                  onClick={() => setTempData({ ...tempData, coverImage: "" })}
                  position={"absolute"}
                  top={"10px"}
                  right={"10px"}
                >
                  {getIcon("close")}
                </IconButton>
              </HStack>
            )}
            {!tempData.coverImage && tempData.title && (
              <CustomFileUpload
                description="cover image"
                type="drag-drop"
                onUploaded={(res: any) => {
                  setTempData({ ...tempData, coverImage: res.secure_url });
                }}
                id="highlight-cover-image"
                filename={slugify(`${tempData.title}`, {
                  lower: true,
                })}
              />
            )}
          </Field.Root>
          <Field.Root required mb={"5"} border={"transparent"}>
            <FormLabel>Description</FormLabel>
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
          <FormBtn disabled={isLoading}>
            {getButtonStatus(highlight, "Highlight", isLoading)}
          </FormBtn>
        </Stack>
      </form>
    </Stack>
  );
}

export default HighlightForm;
