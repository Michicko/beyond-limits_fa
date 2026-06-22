"use client";
import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import slugify from "slugify";
import toast from "react-hot-toast";
import { uploadData } from "aws-amplify/storage";

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
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
    const region = process.env.NEXT_PUBLIC_REGION;

    if (isUploading) return;
    if (!event.target.files || event.target.files.length === 0) return;
    if (!bucketName || !region) return;

    const file = event.target.files[0];

    if (!file) return;

    setIsUploading(true);

    const ext = file.name.split(".").pop();
    const key = `images/${slugify(filename, {
      lower: true,
    })}.${ext}`;

    try {
      await toast
        .promise(
          uploadData({
            path: key,
            data: file,
            options: {
              contentType: file.type,
              bucket: {
                bucketName,
                region,
              },
            },
          }).result,
          {
            loading: `Uploading ${filename}...`,
            success: `${filename} uploaded successfully!`,
            error: (err) => err.message || "Upload failed",
          },
        )
        .then((result) => {
          onUploaded(result.path);
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
