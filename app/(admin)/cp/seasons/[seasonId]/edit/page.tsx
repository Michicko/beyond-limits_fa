import CustomAlert from "@/components/admin/Alert/CustomAlert";
import SeasonForm from "@/components/admin/Forms/SeasonForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";

async function EditSeason({ params }: { params: { seasonId: string } }) {
  const season = await cookiesClient.models.Season.get(
    {
      id: params.seasonId,
    },
    {
      selectionSet: ["id", "season", "createdAt"],
    }
  );
  return (
    <>
      <PageTitle pageTitle="Edit Season" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        {!season ? (
          <CustomAlert
            title={`No season with id ${params.seasonId}`}
            status="error"
          />
        ) : (
          <Suspense fallback={null}>
            <SeasonForm season={season.data} />
          </Suspense>
        )}
      </Box>
    </>
  );
}

export default EditSeason;
