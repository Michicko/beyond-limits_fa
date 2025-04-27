import CustomAlert from "@/components/admin/Alert/CustomAlert";
import HighlightCard from "@/components/admin/Card/HighlightCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import CreateButton from "@/components/Buttons/CreateButton";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, Grid, GridItem, HStack } from "@chakra-ui/react";
import React from "react";

async function Highlight() {
  const { data: highlights, errors } =
    await cookiesClient.models.Highlight.list({
      selectionSet: ["id", "title", "coverImage", "createdAt", "url", "tags"],
      authMode: "userPool",
    });

  return (
    <>
      <PageTitle pageTitle="Highlights" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <HStack justify={"flex-end"} mb={6}>
          <CreateButton link="/cp/highlights/create" text="Create Highlight" />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : highlights.length < 1 ? (
          <CustomAlert
            status="info"
            title="No highlights."
            message={"No highlight available, create some to get started."}
          />
        ) : (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap={"20px"}
            mb={"100px"}
          >
            {highlights.map((highlight) => {
              return (
                <GridItem key={highlight.id}>
                  <HighlightCard highlight={highlight} />
                </GridItem>
              );
            })}
          </Grid>
        )}

        {/* <HStack justify={"center"} w={"full"}>
            <Pagination />
          </HStack> */}
      </Box>
    </>
  );
}

export default Highlight;
