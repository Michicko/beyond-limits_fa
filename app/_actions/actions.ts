"use server";
import { Schema } from "@/amplify/data/resource";
import {
  createEntity,
  deleteEntity,
  updateEntity,
} from "@/lib/factoryFunctions";
import { cookiesClient } from "@/utils/amplify-utils";

type Nullable<T> = T | null;
type PlayerPosition = Schema["PlayerPosition"]["type"];
type Season = Schema["Season"]["type"];
type Competition = Schema["Competition"]["type"];
type Team = Schema["Team"]["type"];
type Player = Schema["Player"]["type"];
type Article = Schema["Article"]["type"];
type Trophy = Schema["Trophy"]["type"];
type ArticleCategory = Schema["ArticleCategory"]["type"];

export async function createPosition(
  formData: FormData,
  attributes: string[] | Nullable<string>[] = []
) {
  return await createEntity<PlayerPosition>({
    modelName: "PlayerPosition",
    formData,
    uniqueFieldName: "shortName",
    uniqueCheckFn: (shortName) =>
      cookiesClient.models.PlayerPosition.listPlayerPositionByShortName({
        shortName,
      }),
    attributes,
    selectionSet: ["id", "shortName", "longName", "attributes", "createdAt"],
    revalidatePath: "/cp/positions",
  });
}

export async function updatePosition(
  id: string,
  formData: FormData,
  attributes: string[] | Nullable<string>[] = [],
  currentUniqueValue: string
) {
  return await updateEntity<PlayerPosition>({
    modelName: "PlayerPosition",
    id,
    formData,
    uniqueFieldName: "shortName",
    uniqueCheckFn: (shortName) =>
      cookiesClient.models.PlayerPosition.listPlayerPositionByShortName({
        shortName,
      }),
    currentUniqueValue,
    attributes,
    selectionSet: ["id", "shortName", "longName", "attributes", "createdAt"],
    revalidatePath: "/cp/positions",
  });
}

export async function deletePosition(id: string) {
  return await deleteEntity({
    id,
    modelName: "PlayerPosition",
    pathToRevalidate: "/cp/positions",
  });
}

export async function createSeason(formData: FormData) {
  return await createEntity<Season>({
    modelName: "Season",
    formData,
    uniqueFieldName: "season",
    uniqueCheckFn: (season) =>
      cookiesClient.models.Season.listSeasonBySeason({
        season,
      }),
    selectionSet: ["id", "season", "createdAt"],
    revalidatePath: "/cp/seasons",
  });
}

export async function updateSeason(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<Season>({
    modelName: "Season",
    id,
    formData,
    uniqueFieldName: "season",
    uniqueCheckFn: (season) =>
      cookiesClient.models.Season.listSeasonBySeason({
        season,
      }),
    currentUniqueValue,
    selectionSet: ["id", "season", "createdAt"],
    revalidatePath: "/cp/seasons",
  });
}

export async function deleteSeason(id: string) {
  return await deleteEntity({
    id,
    modelName: "Season",
    pathToRevalidate: "/cp/seasons",
  });
}

export async function createCompetition(formData: FormData) {
  return await createEntity<Competition>({
    modelName: "Competition",
    formData,
    uniqueFieldName: "longName",
    uniqueCheckFn: (longName) =>
      cookiesClient.models.Competition.listCompetitionByLongName({
        longName,
      }),
    selectionSet: ["id", "logo", "shortName", "longName", "competitionType"],
    revalidatePath: "/cp/competitions",
  });
}

export async function updateCompetition(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<Competition>({
    modelName: "Competition",
    id,
    formData,
    uniqueFieldName: "longName",
    uniqueCheckFn: (longName) =>
      cookiesClient.models.Competition.listCompetitionByLongName({
        longName,
      }),
    currentUniqueValue,
    selectionSet: ["id", "logo", "shortName", "longName", "competitionType"],
    revalidatePath: "/cp/competitions",
  });
}

export async function deleteCompetition(id: string) {
  return await deleteEntity({
    id,
    modelName: "Competition",
    pathToRevalidate: "/cp/competitions",
  });
}

export async function createTeam(formData: FormData) {
  return await createEntity<Team>({
    modelName: "Team",
    formData,
    uniqueFieldName: "longName",
    uniqueCheckFn: (longName) =>
      cookiesClient.models.Team.listTeamByLongName({
        longName,
      }),
    selectionSet: [
      "id",
      "logo",
      "shortName",
      "longName",
      "isBeyondLimits",
      "stadium",
    ],
    revalidatePath: "/cp/teams",
  });
}

export async function updateTeam(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<Team>({
    modelName: "Team",
    id,
    formData,
    uniqueFieldName: "longName",
    uniqueCheckFn: (longName) =>
      cookiesClient.models.Team.listTeamByLongName({
        longName,
      }),
    currentUniqueValue,
    selectionSet: [
      "id",
      "logo",
      "shortName",
      "longName",
      "isBeyondLimits",
      "stadium",
    ],
    revalidatePath: "/cp/teams",
  });
}

export async function deleteTeam(id: string) {
  return await deleteEntity({
    id,
    modelName: "Team",
    pathToRevalidate: "/cp/teams",
  });
}

export async function createPlayer(formData: FormData) {
  return await createEntity<Player>({
    modelName: "Player",
    formData,
    selectionSet: [
      "id",
      "firstname",
      "lastname",
      "ageGroup",
      "homeKit",
      "squadNo",
      "dob",
      "dominantFoot",
      "status",
      "isTwoFooted",
      "awayKit",
    ],
    revalidatePath: "/cp/players",
  });
}

export async function updatePlayer(id: string, formData: FormData) {
  return await updateEntity<Player>({
    modelName: "Player",
    id,
    formData,
    selectionSet: [
      "id",
      "firstname",
      "lastname",
      "ageGroup",
      "homeKit",
      "squadNo",
      "dob",
      "dominantFoot",
      "status",
      "isTwoFooted",
      "awayKit",
    ],
    revalidatePath: "/cp/players",
  });
}

export async function deletePlayer(id: string) {
  return await deleteEntity({
    id,
    modelName: "Player",
    pathToRevalidate: "/cp/players",
  });
}

export async function createArticle(formData: FormData) {
  return await createEntity<Article>({
    modelName: "Article",
    formData,
    uniqueFieldName: "title",
    uniqueCheckFn: (title) =>
      cookiesClient.models.Article.listArticleByTitle({
        title,
      }),
    selectionSet: [
      "id",
      "title",
      "coverImage",
      "content",
      "createdAt",
      "status",
    ],
    revalidatePath: "/cp/articles",
  });
}

export async function updateArticle(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<Article>({
    modelName: "Article",
    id,
    formData,
    uniqueFieldName: "title",
    uniqueCheckFn: (title) =>
      cookiesClient.models.Article.listArticleByTitle({
        title,
      }),
    currentUniqueValue,
    selectionSet: [
      "id",
      "title",
      "coverImage",
      "content",
      "createdAt",
      "status",
    ],
    revalidatePath: "/cp/articles",
  });
}

export async function deleteArticle(id: string) {
  return await deleteEntity({
    id,
    modelName: "Article",
    pathToRevalidate: "/cp/articles",
  });
}

export async function createTrophy(formData: FormData) {
  return await createEntity<Trophy>({
    modelName: "Trophy",
    formData,
    uniqueFieldName: "trophyName",
    uniqueCheckFn: (trophyName) =>
      cookiesClient.models.Trophy.listTrophyByTrophyName({
        trophyName,
      }),
    selectionSet: ["id", "image"],
    revalidatePath: "/cp/trophies",
  });
}

export async function deleteTrophy(id: string) {
  return await deleteEntity({
    id,
    modelName: "Trophy",
    pathToRevalidate: "/cp/trophies",
  });
}

export async function createArticleCategory(formData: FormData) {
  return await createEntity<ArticleCategory>({
    modelName: "ArticleCategory",
    formData,
    uniqueFieldName: "category",
    uniqueCheckFn: (category) =>
      cookiesClient.models.ArticleCategory.listArticleCategoryByCategory({
        category,
      }),
    selectionSet: ["id", "category", "createdAt"],
    revalidatePath: "/cp/article-categories",
  });
}

export async function updateArticleCategory(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  return await updateEntity<ArticleCategory>({
    modelName: "ArticleCategory",
    id,
    formData,
    uniqueFieldName: "category",
    uniqueCheckFn: (category) =>
      cookiesClient.models.ArticleCategory.listArticleCategoryByCategory({
        category,
      }),
    currentUniqueValue,
    selectionSet: ["id", "category", "createdAt"],
    revalidatePath: "/cp/article-categories",
  });
}

export async function deleteArticleCategory(id: string) {
  return await deleteEntity({
    id,
    modelName: "ArticleCategory",
    pathToRevalidate: "/cp/article-categories",
  });
}
