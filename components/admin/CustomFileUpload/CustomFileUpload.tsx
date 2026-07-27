import { getIcon } from "@/lib/icons";
import { Box, Button, FileUpload, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import slugify from "slugify";
import toast from "react-hot-toast";
import { uploadData } from "aws-amplify/storage";

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
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME;
    const region = process.env.NEXT_PUBLIC_REGION;

    if (isUploading) return;
    if (!event.target.files || event.target.files.length === 0) return;
    if (!bucketName || !region) return;

    const file = event.target.files[0];

    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const key = `images/${crypto.randomUUID()}.${ext}`;

    setIsUploading(true);

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
