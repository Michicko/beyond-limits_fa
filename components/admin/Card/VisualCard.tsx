import { Box } from "@chakra-ui/react";
import React from "react";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import ImageComp from "@/components/ImageComp/ImageComp";
import { Nullable } from "@/lib/definitions";

function VisualCard({
  visual,
  moduleName,
}: {
  visual: { url: string; id: string; alt?: Nullable<string> };
  moduleName: "Visual" | "Banner";
}) {
  return (
    <Box position={"relative"} h={"200px"} title={visual.alt ?? ""}>
      <DeleteBtn
        type="iconBtn"
        id={visual.id}
        module={moduleName}
        name={moduleName}
        images={[visual.url]}
      />
      <ImageComp
        alt={visual.alt ?? ""}
        image={visual.url}
        placeholder={""}
        priority={false}
      />
    </Box>
  );
}

export default VisualCard;
