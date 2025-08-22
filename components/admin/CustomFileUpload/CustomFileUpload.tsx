import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import slugify from "slugify";
import toast from "react-hot-toast";

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
          w={"100%"}
          h={"100%"}
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
