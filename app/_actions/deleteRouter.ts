"use server";

import { getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { deleteCloudinaryImage } from "./actions";
import { deleteEntity } from "@/lib/factoryFunctions";

async function retryDeleteCloudinaryImage(
  publicId: string,
  retries = 3,
  delay = 1000,
  logs?: string[]
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await deleteCloudinaryImage(publicId);
      const successMsg = `Successfully deleted Cloudinary image: ${publicId}`;
      logs?.push(successMsg);
      return;
    } catch (err) {
      const msg = `Failed to delete Cloudinary image ${publicId} (attempt ${attempt}): ${
        (err as Error)?.message || JSON.stringify(err)
      }`;
      logs?.push(msg);

      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        const giveUpMsg = `Giving up on deleting image ${publicId}`;
        logs?.push(giveUpMsg);
        return; // do not throw
      }
    }
  }
}

export type DeleteModule =
  | "Article"
  | "Team"
  | "Competition"
  | "Match"
  | "Player"
  | "Highlight"
  | "LeagueRound"
  | "Banner"
  | "Visual"
  | "CompetitionSeason"
  | "PlayerPosition"
  | "PlayOff"
  | "ArticleCategory";

const deleteConfig: Record<
  DeleteModule,
  {
    modelName: keyof typeof cookiesClient.models;
    pathToRevalidate: string;
    extraPostDelete?: (id: string, logs?: string[]) => Promise<void>;
    checkBeforeDelete?: (id: string) => Promise<{
      canDelete: boolean;
      reason?: string;
    }>;
  }
> = {
  Article: {
    modelName: "Article",
    pathToRevalidate: "/cp/articles",
  },
  ArticleCategory: {
    modelName: "ArticleCategory",
    pathToRevalidate: "/cp/article-categories",
  },
  Player: {
    modelName: "Player",
    pathToRevalidate: "/cp/players",
  },
  Banner: {
    modelName: "Banner",
    pathToRevalidate: "/cp/banners",
  },
  Visual: {
    modelName: "Visual",
    pathToRevalidate: "/cp/visuals",
  },
  LeagueRound: {
    modelName: "LeagueRound",
    pathToRevalidate:
      "/cp/competitions/[competitionId]/competition-seasons/[competitionSeasonId]",
  },
  PlayOff: {
    modelName: "PlayOff",
    pathToRevalidate:
      "/cp/competitions/[competitionId]/competition-seasons/[competitionSeasonId]",
  },
  PlayerPosition: {
    modelName: "PlayerPosition",
    pathToRevalidate: "/cp/positions",
    checkBeforeDelete: async (id: string) => {
      const players = await cookiesClient.models.Player.list({
        filter: {
          playerPositionId: { eq: id },
        },
      });

      const hasPlayers = players.data.length > 0;

      return {
        canDelete: !hasPlayers,
        reason: hasPlayers
          ? "Please delete all related Players first."
          : undefined,
      };
    },
  },
  Team: {
    modelName: "Team",
    pathToRevalidate: "/cp/teams",
  },
  Match: {
    modelName: "Match",
    pathToRevalidate: "/cp/matches",
    checkBeforeDelete: async (id: string) => {
      const leagueRounds = await cookiesClient.models.LeagueRound.list({
        filter: {
          matchId: { eq: id },
        },
      });
      const playOffRounds = await cookiesClient.models.PlayOff.list({
        filter: {
          matchId: { eq: id },
        },
      });

      const hasLeagueRounds = leagueRounds.data?.length > 0;
      const hasPlayOffRounds = playOffRounds.data?.length > 0;

      return {
        canDelete: !hasLeagueRounds || !hasPlayOffRounds,
        reason:
          hasLeagueRounds || hasPlayOffRounds
            ? "Please delete all related league or playoff rounds first."
            : undefined,
      };
    },
  },
  Competition: {
    modelName: "Competition",
    pathToRevalidate: "/cp/competitions",
    checkBeforeDelete: async (id: string) => {
      const seasons = await cookiesClient.models.CompetitionSeason.list({
        filter: {
          competitionId: { eq: id },
        },
      });

      const hasSeasons = seasons.data.length > 0;

      return {
        canDelete: !hasSeasons,
        reason: hasSeasons
          ? "Please delete all related competition seasons first."
          : undefined,
      };
    },
  },
  CompetitionSeason: {
    modelName: "CompetitionSeason",
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons",
    extraPostDelete: async (id: string, logs?: string[]) => {
      const relatedModels = [
        "League",
        "LeagueRound",
        "Cup",
        "Match",
        "PlayOff",
        "Standing",
      ] as const;

      for (const modelName of relatedModels) {
        const model = cookiesClient.models[modelName] as {
          list: (options: {
            filter: Record<string, { eq: string }>;
          }) => Promise<{ data: { id: string }[] }>;
          delete: (
            input: { id: string },
            options: { authMode: "userPool" }
          ) => Promise<any>;
        };

        if (!model) {
          const msg = `Model ${modelName} not found in cookiesClient.`;
          logs?.push(msg);
          continue;
        }

        try {
          const response = await model.list({
            filter: { competitionSeasonId: { eq: id } },
          });

          const records = response.data || [];

          if (records.length > 0) {
            await Promise.all(
              records.map((item) =>
                model.delete({ id: item.id }, { authMode: "userPool" })
              )
            );
            const msg = `Deleted ${records.length} ${modelName} records for CompetitionSeason ${id}`;
            logs?.push(msg);
          }
        } catch (err) {
          const errorMsg = `Failed to delete ${modelName} for CompetitionSeason ${id}: ${err}`;
          logs?.push(errorMsg);
        }
      }
    },
  },
  Highlight: {
    modelName: "Highlight",
    pathToRevalidate: "/cp/highlights",
  },
};

export async function deleteRouter({
  id,
  module,
  images,
}: {
  id: string;
  module: DeleteModule;
  images?: string[];
}): Promise<{ message: string }> {
  const logs: string[] = [];

  const config = deleteConfig[module];
  if (!config) throw new Error(`Unknown module: ${module}`);

  if (config.checkBeforeDelete) {
    const check = await config.checkBeforeDelete(id);
    if (!check.canDelete) {
      throw new Error(check.reason || "Delete check failed.");
    }
  }

  const publicIds =
    images
      ?.map((img) => getCloudinaryPublicId(img))
      .filter((pid): pid is string => Boolean(pid)) ?? [];

  const postDelete = async (id: string) => {
    if (publicIds.length > 0) {
      await Promise.all(
        publicIds.map((pid) => retryDeleteCloudinaryImage(pid, 3, 1000, logs))
      );
    }

    if (config.extraPostDelete) {
      await config.extraPostDelete(id, logs);
    }
  };

  try {
    await deleteEntity({
      id,
      modelName: config.modelName,
      pathToRevalidate: config.pathToRevalidate,
      postDelete: postDelete,
    });
  } catch (err: any) {
    const errorString =
      err?.message || (typeof err === "string" ? err : JSON.stringify(err));
    const fallbackMsg = `Delete failed for ${module}: ${errorString}`;
    logs.push(fallbackMsg);
    throw new Error(fallbackMsg);
  }

  return {
    message:
      `${module} deleted successfully.` +
      (logs.length ? `\n\nLogs:\n${logs.join("\n")}` : ""),
  };
}
