import { Card, Stack } from "@chakra-ui/react";
import React from "react";
import Info from "@/components/admin/Info/Info";

function CompetitionSeasonCard({
  competitionName,
  competitionType,
  season,
  status,
}: {
  competitionName: string;
  competitionType?: string | null;
  season: string;
  status: string | null;
}) {
  return (
    <Card.Root size="md" p={"5"} border={"1px solid"} borderColor={"gray.200"}>
      <Card.Body color="fg.muted">
        <Stack>
          <Info name="Competition" value={competitionName} />
          {competitionType && (
            <Info
              name="Competition Type"
              value={competitionType.toLowerCase()}
            />
          )}
          <Info name="Season" value={season} />
          {status && <Info name="Status" value={status.toLowerCase()} />}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}

export default CompetitionSeasonCard;
