import { Field, HStack, IconButton, Image } from "@chakra-ui/react";
import React from "react";
import FormLabel from "../Forms/FormLabel";
import CustomFileUpload from "./CustomFileUpload";
import { getIcon } from "@/lib/icons";
import RequiredLabel from "../Forms/RequiredLabel";

function UploadImage({
  image,
  onClearImage,
  imageSize,
  filename,
  id,
  onUploaded,
  label,
}: {
  image: string;
  imageSize: number;
  filename?: string;
  id: string;
  onUploaded: (res: any) => void;
  onClearImage: () => void;
  label: string;
}) {
  return (
    <Field.Root required>
      <FormLabel>{label} <RequiredLabel /></FormLabel>
      {image && (
        <HStack gap={4} position={"relative"}>
          <Image src={image} width={imageSize} height={imageSize} alt={label} />
          <IconButton
            position={"absolute"}
            top={"10px"}
            right={"10px"}
            size={"2xs"}
            title="delete"
            colorPalette={"red"}
            onClick={onClearImage}
          >
            {getIcon("close")}
          </IconButton>
        </HStack>
      )}
      {!image && filename && (
        <CustomFileUpload
          description={label}
          onUploaded={onUploaded}
          id={id}
          filename={filename}
        />
      )}
    </Field.Root>
  );
}

export default UploadImage;
