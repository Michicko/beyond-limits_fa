import CustomAlert from "@/components/admin/Alert/CustomAlert";
import BackButton from "@/components/admin/BackButton";
import MatchForm from "@/components/admin/Forms/MatchForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { matches } from "@/lib/placeholder-data";
import { Box } from "@chakra-ui/react";
import React from "react";

function page({ params }: { params: { matchId: string } }) {
  const match = matches.find((match) => match.id === params.matchId);
  return (
    <>
      <PageTitle pageTitle="Edit Match" />
      <Box w={"full"} h={"full"} mt={"20px"}>
        <BackButton />
        {!match ? (
          <CustomAlert
            status="error"
            title={`No match with id ${params.matchId}`}
          />
        ) : (
          <MatchForm match={match} />
        )}
      </Box>
    </>
  );
}

export default page;
