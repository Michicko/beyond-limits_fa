import { getIcon } from "@/lib/icons";
import { Button, FileUpload, Icon } from "@chakra-ui/react";
import React from "react";
import useToast from "@/hooks/useToast";
import slugify from "slugify";

function CustomFileUpload({
  description,
  id,
  onUploaded,
  filename,
}: {
  description: string;
  id?: string;
  onUploaded: (path: string) => void;
  filename: string;
}) {
  const { toast } = useToast({
    loading: { title: "Uploading Image...", description: "Please wait" },
    success: {
      title: "Successfully uploaded!",
      description: "Looks great",
    },
    error: {
      title: "Upload failed",
      description: "Something wrong with the upload",
    },
  });

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

    toast(promise);

    promise
      .then((res: any) => {
        onUploaded(res.data.url);
      })
      .catch((error) => console.log(error));
  };

  return (
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
  );
}

export default CustomFileUpload;
