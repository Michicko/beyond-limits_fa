"use client";
import React, { useState, useTransition } from "react";
import FormDialog from "../FormDialog/FormDialog";
import { Button, Field, Input } from "@chakra-ui/react";
import UploadImage from "../CustomFileUpload/UploadImage";
import FormBtn from "./FormBtn";
import FormLabel from "./FormLabel";
import RequiredLabel from "./RequiredLabel";
import useToast from "@/hooks/useToast";
import { objectToFormData } from "@/lib/helpers";
import { createVisual } from "@/app/_actions/gallery-actions";

function VisualForm() {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    alt: "",
  });
  const { mutationToast, errorToast } = useToast();
  const [isPending, startTransition] = useTransition();

  const resetForm = () => {
    setFormData({ url: "", alt: "" });
  };

  const onUploaded = (res: any) => {
    setFormData({ ...formData, url: res.secure_url });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = objectToFormData(formData);

    startTransition(async () => {
      const res = await createVisual(data);
      if (res.status === "success" && res.data) {
        mutationToast("visual", res.data.id, "create");
        resetForm();
      }
      if (res.status === "error") {
        errorToast(res.message);
      }
    });
  };

  return (
    <FormDialog
      name="Visual"
      btn={
        <Button
          onClick={() => setOpenForm(true)}
          variant={"solid"}
          colorPalette={"blue"}
          size={"md"}
          px={"10px"}
        >
          Add Visual
        </Button>
      }
      openForm={openForm}
      setOpenForm={setOpenForm}
      scrollable={false}
    >
      <form onSubmit={handleOnSubmit}>
        <Field.Root required>
          <FormLabel>
            Alt Text <RequiredLabel />
          </FormLabel>
          <Input
            name={"alt"}
            type={"text"}
            placeholder="Enter image description"
            px={"2"}
            color={"text_lg"}
            fontSize={"sm"}
            fontWeight={"medium"}
            mb={"5px"}
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          />
        </Field.Root>
        <UploadImage
          id="visual"
          image={formData.url}
          imageSize={200}
          desc="image"
          label="visual"
          onClearImage={() => setFormData({ ...formData, url: "" })}
          onUploaded={onUploaded}
          filename="Visual"
          type="drag-drop"
        />
        <FormBtn loading={isPending} loadingText="Uploading visual...">
          {isPending ? "Uploading visual..." : "Upload Visual"}
        </FormBtn>
      </form>
    </FormDialog>
  );
}

export default VisualForm;
