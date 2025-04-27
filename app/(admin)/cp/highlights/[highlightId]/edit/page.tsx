import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import HighlightForm from "@/components/admin/Forms/HighlightForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

async function EditHighlight({ params }: { params: { highlightId: string } }) {
  const { data: highlight, errors } = await cookiesClient.models.Highlight.get(
    {
      id: params.highlightId,
    },
    {
      selectionSet: ["id", "title", "coverImage", "description", "tags", "url"],
    }
  );

  return (
    <>
      <PageTitle pageTitle="Edit Highlight" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-start"} mb={"20px"} gap="2">
          <BackButton />
        </HStack>

        {errors ? (
          <CustomAlert status="error" title={`${errors[0].message}`} />
        ) : !highlight ? (
          <CustomAlert
            status="error"
            title={`No highlight with id ${params.highlightId}`}
          />
        ) : (
          <HighlightForm highlight={highlight} method="UPDATE" />
        )}
      </Box>
    </>
  );
}

export default EditHighlight;
