"use client";
import React, { useState, useTransition } from "react";
import FormDialog from "../FormDialog/FormDialog";
import { Button } from "@chakra-ui/react";
import FormBtn from "./FormBtn";
import UploadImage from "../CustomFileUpload/UploadImage";
import useToast from "@/hooks/useToast";
import { createBanner } from "@/app/_actions/banner-actions";

function BannerForm() {
  const [openForm, setOpenForm] = useState(false);
  const [url, setUrl] = useState("");
  const { mutationToast, errorToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onUploaded = (res: any) => {
    setUrl(res.secure_url);
  };

  const resetForm = () => {
    setUrl("");
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("url", url);

    startTransition(async () => {
      const res = await createBanner(formData);
      if (res.status === "success" && res.data) {
        mutationToast("banner", res.data.id, "create");
        resetForm();
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
  };

  return (
    <FormDialog
      name="Banner"
      btn={
        <Button
          onClick={() => setOpenForm(true)}
          variant={"solid"}
          colorPalette={"blue"}
          size={"md"}
          px={"10px"}
        >
          Add Banner
        </Button>
      }
      openForm={openForm}
      setOpenForm={setOpenForm}
      scrollable={false}
    >
      <form onSubmit={handleOnSubmit}>
        <UploadImage
          id="banner"
          image={url}
          imageSize={200}
          desc="image"
          label="Banner"
          onClearImage={() => setUrl("")}
          onUploaded={onUploaded}
          filename="Banner"
          type="drag-drop"
        />
        <FormBtn loading={isPending} loadingText="Uploading banner...">
          {isPending ? "Uploading banner..." : "Upload Banner"}
        </FormBtn>
      </form>
    </FormDialog>
  );
}

export default BannerForm;
