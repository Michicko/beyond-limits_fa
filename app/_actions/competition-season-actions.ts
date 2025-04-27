"use server";
import { Schema } from "@/amplify/data/resource";
import { Nullable } from "@/lib/definitions";
import {
  createEntityFactory,
  updateEntityFactory,
} from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type CompetitionSeason = Schema["CompetitionSeason"]["type"];
type Standing = Schema["Standing"]["type"];
type LeagueRound = Schema["LeagueRound"]["type"];
type PlayOff = Schema["PlayOff"]["type"];

const checkUniqueCompetitionSeason = async (season: string) => {
  const { data: existing } =
    await cookiesClient.models.CompetitionSeason.listCompetitionSeasonBySeason({
      season,
    });

  return existing;
};

export const createCompetitionSeason = async (formData: FormData) => {
  const base = formDataToObject<CompetitionSeason>(formData);
  const competitionSeasonCreator = createEntityFactory<
    CompetitionSeason,
    CompetitionSeason
  >();

  return await competitionSeasonCreator({
    modelName: "CompetitionSeason",
    input: base,
    selectionSet: ["id", "name", "season", "createdAt"],
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons",
    validate: async (base) => {
      const uniqueSeason = await checkUniqueCompetitionSeason(base.season);
      const existing = uniqueSeason.find(
        (el) => el.name === base.name && el.season === base.season
      );
      if (existing) {
        return {
          status: "error",
          valid: false,
          message: `season "${base.season}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export const updateCompetitionSeason = async (
  id: string,
  formData: FormData,
  currentUniqueValue: string
) => {
  const base = formDataToObject<CompetitionSeason>(formData);
  const competitionSeasonUpdater = updateEntityFactory<
    CompetitionSeason,
    CompetitionSeason
  >();

  return await competitionSeasonUpdater({
    modelName: "CompetitionSeason",
    id,
    input: base,
    selectionSet: ["id", "name", "season", "createdAt"],
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons/",
    validate: async (input) => {
      if (input.name !== currentUniqueValue) {
        if ((await checkUniqueCompetitionSeason(input.name)).length > 0) {
          return {
            status: "error",
            valid: false,
            message: `name "${input.name}" already exists.`,
          };
        }
      }
      return { valid: true };
    },
  });
};

export async function deleteCompetitionSeason(id: string) {
  try {
    const { data: competitionSeason, errors } =
      await cookiesClient.models.CompetitionSeason.get({ id });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    if (!competitionSeason) {
      return {
        status: "error",
        message: "No competition season with that id" + id,
      };
    }

    // find all competition season resources
    const { data: leagues = [] } =
      await cookiesClient.models.League.listLeagueByCompetitionNameSeason({
        competitionNameSeason:
          competitionSeason.name + " " + competitionSeason.season,
      });

    const { data: cups = [] } =
      await cookiesClient.models.Cup.listCupByCompetitionNameSeason({
        competitionNameSeason:
          competitionSeason.name + " " + competitionSeason.season,
      });

    const { data: matches = [] } = await cookiesClient.models.Match.list({
      filter: {
        competitionSeasonId: { eq: id },
      },
    });

    // 2. Conditionally fetch dependent models if leagues/cups exist
    let playOffs: PlayOff[] = [];
    if (cups.length > 0) {
      const res = await cookiesClient.models.PlayOff.list({
        filter: {
          cupId: { eq: cups[0].id },
        },
      });
      playOffs = res.data || [];
    }

    let standingRows: Standing[] = [];
    let leagueRounds: LeagueRound[] = [];

    if (leagues.length > 0) {
      const res1 = await cookiesClient.models.Standing.list({
        filter: {
          leagueId: { eq: leagues[0].id },
        },
      });
      standingRows = res1.data || [];

      const res2 = await cookiesClient.models.LeagueRound.list({
        filter: {
          leagueId: { eq: leagues[0].id },
        },
      });
      leagueRounds = res2.data || [];
    }

    // 3. Delete related records in safe order
    for (const row of standingRows) {
      await cookiesClient.models.Standing.delete({ id: row.id });
    }

    for (const round of leagueRounds) {
      await cookiesClient.models.LeagueRound.delete({ id: round.id });
    }

    for (const playOff of playOffs) {
      await cookiesClient.models.PlayOff.delete({ id: playOff.id });
    }

    for (const match of matches) {
      await cookiesClient.models.Match.delete({ id: match.id });
    }

    for (const cup of cups) {
      await cookiesClient.models.Cup.delete({ id: cup.id });
    }

    for (const league of leagues) {
      await cookiesClient.models.League.delete({ id: league.id });
    }

    // Delete the CompetitionSeason itself
    await cookiesClient.models.CompetitionSeason.delete({ id });

    revalidatePath("/cp/competitions/[competitionId]/competition-seasons/");
    return {
      status: "success",
      data: null,
      message: "Competition season and all related data deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export async function endCompetitionSeason(
  seasonId: string,
  resources: { cupId?: Nullable<string>; leagueId?: Nullable<string> }
) {
  try {
    const { data, errors } =
      await cookiesClient.models.CompetitionSeason.update(
        { id: seasonId, status: "COMPLETED" },
        {
          selectionSet: ["id", "name", "season"],
        }
      );

    if (resources.cupId) {
      await cookiesClient.models.Cup.update({
        id: resources.cupId,
        status: "COMPLETED",
      });
    }

    if (resources.leagueId) {
      await cookiesClient.models.League.update({
        id: resources.leagueId,
        status: "COMPLETED",
      });
    }

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    revalidatePath("/cp/competitions/[competitionId]/competition-seasons");
    return {
      status: "success",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}
