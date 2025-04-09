import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { cookiesClient } from "@/utils/amplify-utils";
import { Box, HStack } from "@chakra-ui/react";

async function CompetitionSeason({
  params,
}: {
  params: { competitionId: string; competitionSeasonId: string };
}) {
  const { data: competitionSeason, errors } =
    await cookiesClient.models.CompetitionSeason.get({
      id: params.competitionSeasonId,
    });

  const cup = await competitionSeason?.cup();

  const leaue = await competitionSeason?.league();

  return (
    <>
      <PageTitle pageTitle={`${competitionSeason?.season} season`} />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <HStack mb={8}>
          <BackButton />
        </HStack>
        {errors ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={errors[0].message}
          />
        ) : !competitionSeason ? (
          <CustomAlert
            status="error"
            title={`No season with id ${params.competitionSeasonId}`}
          />
        ) : (
          <Box>
            <h1>competition season</h1>
          </Box>
        )}
      </Box>
    </>
  );
}

export default CompetitionSeason;
