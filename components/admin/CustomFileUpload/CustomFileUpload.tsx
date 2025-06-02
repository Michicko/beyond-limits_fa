import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import useToast from "@/hooks/useToast";
import slugify from "slugify";

function CustomFileUpload({
  description,
  id,
  onUploaded,
  filename,
  type,
}: {
  description: string;
  id?: string;
  onUploaded: (path: string) => void;
  filename: string;
  type?: "drag-drop" | "select";
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
    const result = await fetch('/api/image-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: slugify(filename, { lower: true }),
      }),
    });

    const res = await result.json();
    
    // upload file
    if(res){
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
    <>
      {type === "drag-drop" ? (
        <FileUpload.Root
          alignItems="stretch"
          maxFiles={1}
          border={"2px dashed gray"}
          borderRadius={"sm"}
          accept={["image/jpeg", "image/webp", "image/png"]}
          mb={"5"}
          id={id}
          onChange={handleFileUpload}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Dropzone>
            <Icon size="md" color="fg.muted">
              {getIcon("upload")}
            </Icon>
            <FileUpload.DropzoneContent>
              <Box>Drag and drop a {description} here</Box>
              <Box color="fg.muted">.png, .webp, .jpg up to 5MB</Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
          <FileUpload.List />
        </FileUpload.Root>
      ) : (
        <FileUpload.Root
          accept={["image/png", "image/jpeg", "image/webp"]}
          w={"full"}
          maxFiles={1}
          p={"10px"}
          mt={"5px"}
          id={id}
          onChange={handleFileUpload}
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
              Select {description}
            </Button>
          </FileUpload.Trigger>
          <FileUpload.List />
        </FileUpload.Root>
      )}
    </>
  );
}

export default CustomFileUpload;
