"use client";
import useToast from "@/hooks/useToast";
import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import slugify from "slugify";

function EditorImageUpload({
  filename,
  onUploaded,
  setIsModalShown,
}: {
  filename: string;
  onUploaded: (path: string) => void;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutationPromiseToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const success = {
    title: "image Uploaded",
    desc: `${filename} uploaded successfully!`,
  };
  const err = {
    title: "Error uploading image",
    desc: `Failed to upload image`,
  };
  const loading = {
    title: "uploading image",
    desc: `uploading ${filename}, please wait...`,
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (!target.files) return;

    const formData = new FormData();
    formData.append("file", target.files[0]);

    // sign upload
    const result = await fetch("/api/image-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: slugify(filename, { lower: true }),
      }),
    });

    const res = await result.json();

    // upload file
    if (res) {
      formData.append("api_key", res.API_KEY);
      formData.append("timestamp", res.timestamp);
      formData.append("signature", res.signature);
      formData.append("folder", "beyondlimitsfa");
      formData.append("public_id", slugify(filename, { lower: true }));
      const url = `https://api.cloudinary.com/v1_1/${res.CLOUD_NAME}/auto/upload`;

      const promise = fetch(url, {
        method: "POST",
        body: formData,
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error?.message || "Upload failed");
        }
        return data;
      });

      mutationPromiseToast(
        promise,
        success,
        err,
        loading,
        setIsUploading,
        onUploaded
      );
    }
  };

  return (
    <Box position={"relative"} height={"10rem"} w={"100%"} bg={"#fff"}>
      <Box display={"flex"} alignItems={"center"} gap={"6"} w={"full"}>
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
        <Icon size="md" color="fg.muted" onClick={() => setIsModalShown(false)}>
          {getIcon("close")}
        </Icon>
      </Box>
    </Box>
  );
}

export default EditorImageUpload;
