import TrophyCard from "@/components/admin/Card/TrophyCard";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import TrophyFormDialog from "@/components/admin/Forms/TrophyFormDialog";
import { cookiesClient } from "@/utils/amplify-utils";
import CustomAlert from "@/components/admin/Alert/CustomAlert";

async function Trophies() {
  const [trophiesResult, articlesResult, competitionsResult] =
    await Promise.all([
      cookiesClient.models.Trophy.list({
        selectionSet: ["id", "image", "competition.longName", "trophyName"],
        authMode: "userPool",
      }),
      cookiesClient.models.Article.list({
        selectionSet: ["title", "id"],
        authMode: "userPool",
      }),
      cookiesClient.models.Competition.list({
        selectionSet: ["id", "longName"],
        authMode: "userPool",
      }),
    ]);

  const { data: trophies, errors: trophiesErrors } = trophiesResult;
  const { data: articles, errors: articleErrors } = articlesResult;
  const { data: competitions, errors: competitionsErrors } = competitionsResult;

  return (
    <>
      <PageTitle pageTitle="Trophies" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        {articleErrors || competitionsErrors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={
              (articleErrors && articleErrors[0].message) ||
              (competitionsErrors && competitionsErrors[0].message)
            }
          />
        ) : (
          competitions &&
          articles && (
            <HStack justify={"flex-end"} mb={"20px"} gap="2">
              <TrophyFormDialog
                competitions={competitions}
                articles={articles}
              />
            </HStack>
          )
        )}
        {trophiesErrors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={trophiesErrors[0].message}
          />
        ) : trophies.length < 1 ? (
          <CustomAlert
            status="info"
            title="No Trophy."
            message={"No trophy available, create some to get started."}
          />
        ) : (
          <Flex my={"20px"} direction={"column"} gap={"4"}>
            {trophies.map((trophy) => {
              return <TrophyCard key={trophy.id} trophy={trophy} />;
            })}
          </Flex>
        )}
      </Box>
    </>
  );
}

export default Trophies;
