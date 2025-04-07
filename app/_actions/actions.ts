"use server";
import { Schema } from "@/amplify/data/resource";
import { deleteEntity } from "@/lib/factoryFunctions";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type Nullable<T> = T | null;
type PlayerPosition = Schema["PlayerPosition"]["type"];
type Season = Schema["Season"]["type"];
type Competition = Schema["Competition"]["type"];
type Team = Schema["Team"]["type"];
type Player = Schema["Player"]["type"];
type Article = Schema["Article"]["type"];
type Trophy = Schema["Trophy"]["type"];
type ArticleCategory = Schema["ArticleCategory"]["type"];

function formDataToObject<T = Record<string, any>>(formData: FormData): T {
  const obj: Record<string, any> = {};

  Array.from(formData.entries()).forEach(([key, value]) => {
    obj[key] = typeof value === "string" ? value : value.name ?? value;
  });

  return obj as T;
}

const checkPositionUniqueShortName = async (shortName: string) => {
  const { data: existing } =
    await cookiesClient.models.PlayerPosition.listPlayerPositionByShortName({
      shortName,
    });

  return existing;
};

export async function createPosition(formData: FormData) {
  const body = formDataToObject<PlayerPosition>(formData);
  body.attributes = JSON.parse(formData.get("attributes") as string);

  if ((await checkPositionUniqueShortName(body.shortName)).length > 0) {
    return {
      status: "error",
      message: `shortName "${body.shortName}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.PlayerPosition.create(
    body,
    {
      selectionSet: ["id", "shortName", "longName", "createdAt"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/positions");
  return {
    status: "success",
    data,
  };
}

export async function updatePosition(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<PlayerPosition>(formData);
  body.attributes = JSON.parse(formData.get("attributes") as string);

  if (body.shortName !== currentUniqueValue) {
    if ((await checkPositionUniqueShortName(body.shortName)).length > 0) {
      return {
        status: "error",
        message: `shortName "${body.shortName}" already exists.`,
      };
    }
  }

  const { data, errors } = await cookiesClient.models.PlayerPosition.update(
    body,
    {
      selectionSet: ["id", "shortName", "longName", "createdAt"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/positions");
  return {
    status: "success",
    data,
  };
}

export async function deletePosition(id: string) {
  return await deleteEntity({
    id,
    modelName: "PlayerPosition",
    pathToRevalidate: "/cp/positions",
  });
}

// type ISeasonsBody = {
//   season: string;
// };

// export async function createSeason(formData: FormData) {
//   const body = Object.fromEntries(
//     formData.entries()
//   ) as unknown as ISeasonsBody;
//   return await createEntity(cookiesClient, "Season", body, {
//     uniqueFieldName: "season",
//     uniqueCheckFn: (season) =>
//       cookiesClient.models.Season.listSeasonBySeason({
//         season,
//       }),
//   });
// }

// export async function updateSeason(
//   id: string,
//   formData: FormData,
//   currentUniqueValue: string
// ) {
//   const updates = Object.fromEntries(formData.entries());
//   return await updateEntity(cookiesClient, "Season", id, updates, {
//     uniqueFieldName: "season",
//     currentUniqueValue,
//     uniqueCheckFn: async (season) =>
//       cookiesClient.models.Season.listSeasonBySeason({
//         season,
//       }),
//   });
// }

// export async function deleteSeason(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "Season",
//     pathToRevalidate: "/cp/seasons",
//   });
// }

// export async function createCompetition(formData: FormData) {
//   const raw = Object.fromEntries(formData.entries()) as Record<string, any>;
//   const body = raw as Parameters<
//     (typeof cookiesClient.models.Competition)["create"]
//   >[0];

//   return await createEntity<typeof cookiesClient, "Competition">(
//     cookiesClient,
//     "Competition",
//     body,
//     {
//       uniqueFieldName: "longName",
//       uniqueCheckFn: (longName) =>
//         cookiesClient.models.Competition.listCompetitionByLongName(
//           { longName },
//           { selectionSet: ["longName"] }
//         ),
//       selectionSet: ["id", "shortName", "longName", "logo", "competitionType"],
//     }
//   );
// }

// export async function updateCompetition(
//   id: string,
//   formData: FormData,
//   currentUniqueValue: string
// ) {
//   const body = Object.fromEntries(
//     formData.entries()
//   ) as unknown as ICompetitionBody;
//   return await updateEntity(cookiesClient, "Competition", id, body, {
//     uniqueFieldName: "longName",
//     currentUniqueValue,
//     uniqueCheckFn: (longName) =>
//       cookiesClient.models.Competition.listCompetitionByLongName(
//         {
//           longName,
//         },
//         {
//           selectionSet: ["longName"],
//         }
//       ),
//     selectionSet: ["id", "shortName", "longName", "logo", "competitionType"],
//   });
// }

// export async function deleteCompetition(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "Competition",
//     pathToRevalidate: "/cp/competitions",
//   });
// }

// export async function createTeam(formData: FormData) {
//   const selectionSet = [
//     "id",
//     "logo",
//     "shortName",
//     "longName",
//     "isBeyondLimits",
//     "stadium",
//   ];
//   const body = Object.fromEntries(formData.entries()) as unknown as Team;
//   return await createEntity(cookiesClient, "Team", body, {
//     uniqueFieldName: "longName",
//     uniqueCheckFn: (longName) =>
//       cookiesClient.models.Team.listTeamByLongName(
//         {
//           longName,
//         },
//         {
//           selectionSet,
//         }
//       ),
//     selectionSet,
//   });
// }

// export async function updateTeam(
//   id: string,
//   formData: FormData,
//   currentUniqueValue: string
// ) {
//   const selectionSet = [
//     "id",
//     "logo",
//     "shortName",
//     "longName",
//     "isBeyondLimits",
//     "stadium",
//   ];
//   const body = Object.fromEntries(formData.entries()) as unknown as Team;
//   return await updateEntity(cookiesClient, "Team", id, body, {
//     uniqueFieldName: "longName",
//     currentUniqueValue,
//     uniqueCheckFn: (longName) =>
//       cookiesClient.models.Team.listTeamByLongName(
//         {
//           longName,
//         },
//         {
//           selectionSet,
//         }
//       ),
//     selectionSet,
//   });
// }

// export async function deleteTeam(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "Team",
//     pathToRevalidate: "/cp/teams",
//   });
// }

// export async function createPlayer(formData: FormData) {
//   return await createEntity<Player>({
//     modelName: "Player",
//     formData,
//     selectionSet: [
//       "id",
//       "firstname",
//       "lastname",
//       "ageGroup",
//       "homeKit",
//       "squadNo",
//       "dob",
//       "dominantFoot",
//       "status",
//       "isTwoFooted",
//       "awayKit",
//     ],
//     revalidatePath: "/cp/players",
//   });
// }

// export async function updatePlayer(id: string, formData: FormData) {
//   return await updateEntity<Player>({
//     modelName: "Player",
//     id,
//     formData,
//     selectionSet: [
//       "id",
//       "firstname",
//       "lastname",
//       "ageGroup",
//       "homeKit",
//       "squadNo",
//       "dob",
//       "dominantFoot",
//       "status",
//       "isTwoFooted",
//       "awayKit",
//     ],
//     revalidatePath: "/cp/players",
//   });
// }

// export async function deletePlayer(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "Player",
//     pathToRevalidate: "/cp/players",
//   });
// }

// export async function createArticle(formData: FormData) {
//   return await createEntity<Article>({
//     modelName: "Article",
//     formData,
//     uniqueFieldName: "title",
//     uniqueCheckFn: (title) =>
//       cookiesClient.models.Article.listArticleByTitle({
//         title,
//       }),
//     selectionSet: [
//       "id",
//       "title",
//       "coverImage",
//       "content",
//       "createdAt",
//       "status",
//     ],
//     revalidatePath: "/cp/articles",
//   });
// }

// export async function updateArticle(
//   id: string,
//   formData: FormData,
//   currentUniqueValue: string
// ) {
//   return await updateEntity<Article>({
//     modelName: "Article",
//     id,
//     formData,
//     uniqueFieldName: "title",
//     uniqueCheckFn: (title) =>
//       cookiesClient.models.Article.listArticleByTitle({
//         title,
//       }),
//     currentUniqueValue,
//     selectionSet: [
//       "id",
//       "title",
//       "coverImage",
//       "content",
//       "createdAt",
//       "status",
//     ],
//     revalidatePath: "/cp/articles",
//   });
// }

// export async function deleteArticle(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "Article",
//     pathToRevalidate: "/cp/articles",
//   });
// }

// export async function createTrophy(formData: FormData) {
//   return await createEntity<Trophy>({
//     modelName: "Trophy",
//     formData,
//     uniqueFieldName: "trophyName",
//     uniqueCheckFn: (trophyName) =>
//       cookiesClient.models.Trophy.listTrophyByTrophyName({
//         trophyName,
//       }),
//     selectionSet: ["id", "image"],
//     revalidatePath: "/cp/trophies",
//   });
// }

// export async function deleteTrophy(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "Trophy",
//     pathToRevalidate: "/cp/trophies",
//   });
// }

// export async function createArticleCategory(formData: FormData) {
//   return await createEntity<ArticleCategory>({
//     modelName: "ArticleCategory",
//     formData,
//     uniqueFieldName: "category",
//     uniqueCheckFn: (category) =>
//       cookiesClient.models.ArticleCategory.listArticleCategoryByCategory({
//         category,
//       }),
//     selectionSet: ["id", "category", "createdAt"],
//     revalidatePath: "/cp/article-categories",
//   });
// }

// export async function updateArticleCategory(
//   id: string,
//   formData: FormData,
//   currentUniqueValue: string
// ) {
//   return await updateEntity<ArticleCategory>({
//     modelName: "ArticleCategory",
//     id,
//     formData,
//     uniqueFieldName: "category",
//     uniqueCheckFn: (category) =>
//       cookiesClient.models.ArticleCategory.listArticleCategoryByCategory({
//         category,
//       }),
//     currentUniqueValue,
//     selectionSet: ["id", "category", "createdAt"],
//     revalidatePath: "/cp/article-categories",
//   });
// }

// export async function deleteArticleCategory(id: string) {
//   return await deleteEntity({
//     id,
//     modelName: "ArticleCategory",
//     pathToRevalidate: "/cp/article-categories",
//   });
// }
