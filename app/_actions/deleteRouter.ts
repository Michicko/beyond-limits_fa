"use server";

import { getCloudinaryPublicId } from "@/lib/helpers";
import { cookiesClient } from "@/utils/amplify-utils";
import { deleteCloudinaryImage } from "./actions";
import { deleteEntity } from "@/lib/factoryFunctions";

async function retryDeleteCloudinaryImage(
  publicId: string,
  retries = 3,
  delay = 1000, // in milliseconds
): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await deleteCloudinaryImage(publicId);
      return; // success, exit loop
    } catch (err) {
      console.error(
        `Failed to delete Cloudinary image ${publicId} (attempt ${attempt}):`,
        err,
      );
      if (attempt < retries) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(`Giving up on deleting image ${publicId}`);
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
  | "Trophy"
  | "Highlight"
  | "CompetitionSeason"
  | "PlayerPosition"
  | "ArticleCategory";

const deleteConfig: Record<
  DeleteModule,
  {
    modelName: keyof typeof cookiesClient.models;
    pathToRevalidate: string;
    extraPostDelete?: (id: string) => Promise<void>;
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
    pathToRevalidate: "/cp/articles",
  },
  Player: {
    modelName: "Player",
    pathToRevalidate: "/cp/players",
  },
  PlayerPosition: {
    modelName: "PlayerPosition",
    pathToRevalidate: "/cp/positions",
  },
  Team: {
    modelName: "Team",
    pathToRevalidate: "/cp/teams",
  },
  Match: {
    modelName: "Match",
    pathToRevalidate: "/cp/matches",
  },
  Competition: {
    modelName: "Competition",
    pathToRevalidate: "/cp/competitions",
  },
  CompetitionSeason: {
    modelName: "CompetitionSeason",
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons",
  },
  Highlight: {
    modelName: "Highlight",
    pathToRevalidate: "/cp/highlights",
  },
  Trophy: {
    modelName: "Trophy",
    pathToRevalidate: "/cp/trophies",
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
}) {
  const config = deleteConfig[module];
  if (!config) throw new Error(`Unknown module: ${module}`);

  const publicIds =
    images
      ?.map((img) => getCloudinaryPublicId(img))
      .filter((pid): pid is string => Boolean(pid)) ?? [];

  const postDelete = async (id: string) => {
    try {
      if (publicIds.length > 0) {
        await Promise.all(
          publicIds.map((pid) => retryDeleteCloudinaryImage(pid)),
        );
      }
    } catch (err) {
      console.error("Cloudinary image deletion failed:", err);
    }

    if (config.extraPostDelete) {
      await config.extraPostDelete(id);
    }
  };
  return await deleteEntity({
    id,
    modelName: config.modelName,
    pathToRevalidate: config.pathToRevalidate,
    postDelete: publicIds.length ? postDelete : config.extraPostDelete,
  });
}
