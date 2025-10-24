"use server";
import { IHighlightFormData } from "@/lib/definitions";
import { deleteEntity, processPromise } from "@/lib/factoryFunctions";
import { cookiesClient } from "@/utils/amplify-utils";

export const getHighlights = async (nextToken?: string | null) => {
  return cookiesClient.models.Highlight.listHighlightByConstantKeyAndCreatedAt(
    { constantKey: "all" },
    {
      selectionSet: [
        "id",
        "title",
        "coverImage",
        "createdAt",
        "videoId",
        "tags",
      ],
      nextToken,
      limit: 25,
      authMode: "userPool",
      sortDirection: "DESC",
    }
  );
};

export const getHighlightsSwr = async (isAuthenticated: boolean) => {
  return cookiesClient.models.Highlight.list({
    selectionSet: ["id", "coverImage", "title", "createdAt"],
    limit: 3,
    authMode: isAuthenticated ? "userPool" : "iam",
    sortDirection: "DESC",
  });
};

export const createHighlight = async (
  highlightFormData: IHighlightFormData
) => {
  if (
    (
      await cookiesClient.models.Highlight.list({
        filter: {
          videoId: {
            eq: highlightFormData.videoId,
          },
        },
      })
    ).data.length > 0
  ) {
    return {
      status: "error",
      message: `videoId "${highlightFormData.videoId}" already exists.`,
    };
  }

  const createHighlightPromise = cookiesClient.models.Highlight.create(
    {
      ...highlightFormData,
      id: undefined,
      title: highlightFormData.title,
      lowerCaseTitle: highlightFormData.title.toLowerCase(),
      tags: highlightFormData.tags,
      description: JSON.stringify(highlightFormData.description),
    },
    {
      selectionSet: ["title"],
      authMode: "userPool",
    }
  );

  return await processPromise(createHighlightPromise);
};

export const updateHighlight = async (
  highlightFormData: IHighlightFormData
) => {
  if (
    (
      await cookiesClient.models.Highlight.list({
        filter: {
          id: {
            ne: highlightFormData.id,
          },
          videoId: {
            eq: highlightFormData.videoId,
          },
        },
      })
    ).data.length > 0
  ) {
    return {
      status: "error",
      message: `videoId "${highlightFormData.videoId}" already exists.`,
    };
  }

  const updateHighlightPromise = cookiesClient.models.Highlight.update(
    {
      ...highlightFormData,
      id: highlightFormData.id,
      title: highlightFormData.title,
      lowerCaseTitle: highlightFormData.title.toLowerCase(),
      tags: highlightFormData.tags,
      description: JSON.stringify(highlightFormData.description),
    },
    {
      selectionSet: ["title"],
      authMode: "userPool",
    }
  );

  return await processPromise(updateHighlightPromise);
};

export async function deleteHighlight(id: string) {
  return await deleteEntity({
    id,
    modelName: "Highlight",
    pathToRevalidate: "/cp/highlights",
  });
}
