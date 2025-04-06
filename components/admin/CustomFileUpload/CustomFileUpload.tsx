import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon } from "@chakra-ui/react";
import React from "react";
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
  const { uploadPromiseToast } = useToast();

  const handleFileUpload = async (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const formData = new FormData();
    formData.append("file", target.files[0]);
    formData.append("name", slugify(filename, { lower: true }));

    const promise = new Promise(async function (resolve, reject) {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        resolve(result);
      } else {
        reject(response);
      }
    });

    uploadPromiseToast(promise, filename, onUploaded);
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
            <Button variant="outline" size="sm" px={"20px"}>
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
