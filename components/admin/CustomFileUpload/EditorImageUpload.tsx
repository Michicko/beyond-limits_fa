"use client";
import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import slugify from "slugify";
import toast from "react-hot-toast";

function EditorImageUpload({
  filename,
  onUploaded,
  setIsModalShown,
}: {
  filename: string;
  onUploaded: (path: string) => void;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isUploading) return;
    if (!event.target.files || event.target.files.length === 0) return;
    setIsUploading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await fetch("/api/image-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_id: slugify(filename, { lower: true }),
        }),
      });

      const res = await result.json();
      if (!res) throw new Error("Failed to get upload signature");

      formData.append("api_key", res.API_KEY);
      formData.append("timestamp", res.timestamp);
      formData.append("signature", res.signature);
      formData.append("folder", "beyondlimitsfa");
      formData.append("public_id", slugify(filename, { lower: true }));

      const url = `https://api.cloudinary.com/v1_1/${res.CLOUD_NAME}/auto/upload`;

      await toast
        .promise(
          fetch(url, { method: "POST", body: formData }).then(async (res) => {
            const data = await res.json();
            if (!res.ok)
              throw new Error(data.error?.message || "Upload failed");
            return data;
          }),
          {
            loading: `Uploading ${filename}...`,
            success: `${filename} uploaded successfully!`,
            error: (err) => err.message || "Upload failed",
          }
        )
        .then((data) => {
          setIsUploading(false);
          onUploaded(data);
        });
    } catch (error) {
      setIsUploading(false);

      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      position={"fixed"}
      top="0"
      left="0"
      bottom="0"
      right="0"
      height={"full"}
      w={"full"}
    >
      <Box
        w={"full"}
        maxW={"30rem"}
        h={"10rem"}
        position={"relative"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        bg={"white"}
        padding={"5"}
      >
        <Heading size="xl" mb="5">
          Upload Image
        </Heading>
        <FileUpload.Root
          accept={["image/png", "image/jpeg", "image/webp"]}
          w={"full"}
          maxW={"20rem"}
          maxFiles={1}
          p={"2px"}
          mt={"5px"}
          id={"editor-img"}
          onChange={handleFileUpload}
          border={"1px solid gray"}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Trigger asChild>
            <Button
              variant="outline"
              size="sm"
              px={"20px"}
              type="button"
              disabled={isUploading}
            >
              <Icon size="md" color="fg.muted">
                {getIcon("upload")}
              </Icon>
              Select image
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List />
        </FileUpload.Root>
        <Icon
          size="md"
          position={"absolute"}
          top={"1rem"}
          right={"1rem"}
          color="fg.muted"
          onClick={() => setIsModalShown(false)}
        >
          {getIcon("close")}
        </Icon>
      </Box>
    </Box>
  );
}

export default EditorImageUpload;
