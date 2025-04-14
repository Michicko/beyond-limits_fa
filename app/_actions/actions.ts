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
type CompetitionSeason = Schema["CompetitionSeason"]["type"];
type Cup = Schema["Cup"]["type"];
type League = Schema["League"]["type"];
type Standing = Schema["Standing"]["type"];
type Match = Schema["Match"]["type"];

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

const checkUniqueSeason = async (season: string) => {
  const { data: existing } =
    await cookiesClient.models.Season.listSeasonBySeason({
      season,
    });

  return existing;
};

const checkUniqueCompetitionName = async (longName: string) => {
  const { data: existing } =
    await cookiesClient.models.Competition.listCompetitionByLongName({
      longName,
    });

  return existing;
};

const checkUniqueCup = async (competitionNameSeason: string) => {
  const { data: existing } =
    await cookiesClient.models.Cup.listCupByCompetitionNameSeason({
      competitionNameSeason,
    });

  return existing;
};

const checkUniqueLeague = async (competitionNameSeason: string) => {
  const { data: existing } =
    await cookiesClient.models.League.listLeagueByCompetitionNameSeason({
      competitionNameSeason,
    });

  return existing;
};

const checkUniqueTeamName = async (longName: string) => {
  const { data: existing } = await cookiesClient.models.Team.listTeamByLongName(
    {
      longName,
    }
  );

  return existing;
};

const checkUniqueCategory = async (category: string) => {
  const { data: existing } =
    await cookiesClient.models.ArticleCategory.listArticleCategoryByCategory({
      category,
    });

  return existing;
};

const checkUniqueTrophyName = async (trophyName: string) => {
  const { data: existing } =
    await cookiesClient.models.Trophy.listTrophyByTrophyName({
      trophyName,
    });

  return existing;
};

const checkUniqueCompetitionSeason = async (season: string) => {
  const { data: existing } =
    await cookiesClient.models.CompetitionSeason.listCompetitionSeasonBySeason({
      season,
    });

  return existing;
};

const checkUniqueArticleTitle = async (title: string) => {
  const { data: existing } =
    await cookiesClient.models.Article.listArticleByTitle({
      title,
    });

  return existing;
};

export async function createPosition(formData: FormData) {
  const body = formDataToObject<PlayerPosition>(formData);
  body.attributes = JSON.parse(formData.get("attributes") as string);

  try {
    const uniqueShortName = await checkPositionUniqueShortName(body.shortName);

    if (uniqueShortName && uniqueShortName.length > 0) {
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
      console.log(errors);
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    // revalidatePath("/cp/positions");
    return {
      status: "success",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
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
    { ...body, id },
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

export async function createSeason(formData: FormData) {
  const body = formDataToObject<Season>(formData);

  if ((await checkUniqueSeason(body.season)).length > 0) {
    return {
      status: "error",
      message: `season "${body.season}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.Season.create(body, {
    selectionSet: ["id", "season", "createdAt"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/seasons");
  return {
    status: "success",
    data,
  };
}

export async function updateSeason(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<Season>(formData);

  if (body.season !== currentUniqueValue) {
    if ((await checkUniqueSeason(body.season)).length > 0) {
      return {
        status: "error",
        message: `season "${body.season}" already exists.`,
      };
    }
  }

  const { data, errors } = await cookiesClient.models.Season.create(
    { ...body, id },
    {
      selectionSet: ["id", "season", "createdAt"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/seasons");
  return {
    status: "success",
    data,
  };
}

export async function deleteSeason(id: string) {
  return await deleteEntity({
    id,
    modelName: "Season",
    pathToRevalidate: "/cp/seasons",
  });
}

export async function createCompetition(formData: FormData) {
  const body = formDataToObject<Competition>(formData);

  if ((await checkUniqueCompetitionName(body.longName)).length > 0) {
    return {
      status: "error",
      message: `longName "${body.longName}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.Competition.create(body, {
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/competitions");
  return {
    status: "success",
    data,
  };
}

export async function updateCompetition(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<Competition>(formData);

  if (body.longName !== currentUniqueValue) {
    if ((await checkUniqueCompetitionName(body.longName)).length > 0) {
      return {
        status: "error",
        message: `longName "${body.longName}" already exists.`,
      };
    }
  }
  const { data, errors } = await cookiesClient.models.Competition.update(
    { ...body, id },
    {
      selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/competitions");
  return {
    status: "success",
    data,
  };
}

export async function deleteCompetition(id: string) {
  return await deleteEntity({
    id,
    modelName: "Competition",
    pathToRevalidate: "/cp/competitions",
  });
}

export async function createTeam(formData: FormData) {
  const body = formDataToObject<Team>(formData);

  if ((await checkUniqueTeamName(body.longName)).length > 0) {
    return {
      status: "error",
      message: `longName "${body.longName}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.Team.create(body, {
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/teams");
  return {
    status: "success",
    data,
  };
}

export async function updateTeam(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<Team>(formData);

  if (body.longName !== currentUniqueValue) {
    if ((await checkUniqueTeamName(body.longName)).length > 0) {
      return {
        status: "error",
        message: `longName "${body.longName}" already exists.`,
      };
    }
  }

  const { data, errors } = await cookiesClient.models.Team.update(
    { ...body, id },
    {
      selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/teams");
  return {
    status: "success",
    data,
  };
}

export async function deleteTeam(id: string) {
  return await deleteEntity({
    id,
    modelName: "Team",
    pathToRevalidate: "/cp/teams",
  });
}

export async function createPlayer(formData: FormData) {
  const body = formDataToObject<Player>(formData);

  const { data, errors } = await cookiesClient.models.Player.create(body, {
    selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/players");
  return {
    status: "success",
    data,
  };
}

export async function updatePlayer(id: string, formData: FormData) {
  const body = formDataToObject<Player>(formData);

  const { data, errors } = await cookiesClient.models.Player.update(
    { ...body, id },
    {
      selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/players");
  return {
    status: "success",
    data,
  };
}

export async function deletePlayer(id: string) {
  return await deleteEntity({
    id,
    modelName: "Player",
    pathToRevalidate: "/cp/players",
  });
}

export async function createArticle(formData: FormData) {
  const body = formDataToObject<Article>(formData);

  if ((await checkUniqueArticleTitle(body.title)).length > 0) {
    return {
      status: "error",
      message: `title "${body.title}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.Article.create(body, {
    selectionSet: ["id", "title", "content", "coverImage"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/articles");
  return {
    status: "success",
    data,
  };
}

export async function updateArticle(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<Article>(formData);

  if (body.title !== currentUniqueValue) {
    if ((await checkUniqueArticleTitle(body.title)).length > 0) {
      return {
        status: "error",
        message: `title "${body.title}" already exists.`,
      };
    }
  }

  const { data, errors } = await cookiesClient.models.Article.update(
    { ...body, id },
    {
      selectionSet: ["id", "title", "content", "coverImage"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/articles");
  return {
    status: "success",
    data,
  };
}

export async function deleteArticle(id: string) {
  return await deleteEntity({
    id,
    modelName: "Article",
    pathToRevalidate: "/cp/articles",
  });
}

export async function createTrophy(formData: FormData) {
  const body = formDataToObject<Trophy>(formData);

  if ((await checkUniqueTrophyName(body.trophyName)).length > 0) {
    return {
      status: "error",
      message: `trophyName "${body.trophyName}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.Trophy.create(body, {
    selectionSet: ["id", "image", "trophyName"],
  });

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/trophies");
  return {
    status: "success",
    data,
  };
}

export async function deleteTrophy(id: string) {
  return await deleteEntity({
    id,
    modelName: "Trophy",
    pathToRevalidate: "/cp/trophies",
  });
}

export async function createArticleCategory(formData: FormData) {
  const body = formDataToObject<ArticleCategory>(formData);

  if ((await checkUniqueCategory(body.category)).length > 0) {
    return {
      status: "error",
      message: `category "${body.category}" already exists.`,
    };
  }

  const { data, errors } = await cookiesClient.models.ArticleCategory.create(
    body,
    {
      selectionSet: ["id", "category"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/article-categories");
  return {
    status: "success",
    data,
  };
}

export async function updateArticleCategory(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<ArticleCategory>(formData);

  if (body.category !== currentUniqueValue) {
    if ((await checkUniqueCategory(body.category)).length > 0) {
      return {
        status: "error",
        message: `category "${body.category}" already exists.`,
      };
    }
  }

  const { data, errors } = await cookiesClient.models.ArticleCategory.update(
    { ...body, id },
    {
      selectionSet: ["id", "category"],
    }
  );

  if (errors) {
    return {
      status: "error",
      message: errors[0].message || "An unknown error occurred",
    };
  }

  revalidatePath("/cp/article-categories");
  return {
    status: "success",
    data,
  };
}

export async function deleteArticleCategory(id: string) {
  return await deleteEntity({
    id,
    modelName: "ArticleCategory",
    pathToRevalidate: "/cp/article-categories",
  });
}

export async function createCup(formData: FormData) {
  const body = formDataToObject<Cup>(formData);
  try {
    const uniqueCup = await checkUniqueCup(body.competitionNameSeason);
    if (uniqueCup && uniqueCup.length > 0) {
      return {
        status: "error",
        message: `name "${body.competitionNameSeason}" already exists.`,
      };
    }

    const { data, errors } = await cookiesClient.models.Cup.create(body, {
      selectionSet: ["id", "competitionNameSeason"],
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    return {
      status: "success",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export async function createLeague(formData: FormData) {
  const body = formDataToObject<League>(formData);
  body.teams = JSON.parse(formData.get("teams") as string);
  try {
    const uniqueCup = await checkUniqueLeague(body.competitionNameSeason);
    if (uniqueCup && uniqueCup.length > 0) {
      return {
        status: "error",
        message: `name "${body.competitionNameSeason}" already exists.`,
      };
    }

    const { data, errors } = await cookiesClient.models.League.create(body, {
      selectionSet: ["id", "competitionNameSeason"],
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    return {
      status: "success",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export async function createCompetitionSeason(formData: FormData) {
  const body = formDataToObject<CompetitionSeason>(formData);
  try {
    const uniqueSeason = await checkUniqueCompetitionSeason(body.season);
    if (uniqueSeason && uniqueSeason.length > 0) {
      return {
        status: "error",
        message: `name "${body.season}" already exists.`,
      };
    }

    const { data, errors } =
      await cookiesClient.models.CompetitionSeason.create(body, {
        selectionSet: ["id", "name", "season", "createdAt"],
      });

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
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export async function updateCompetitionSeason(
  id: string,
  formData: FormData,
  currentUniqueValue: string
) {
  const body = formDataToObject<CompetitionSeason>(formData);

  try {
    if (body.name !== currentUniqueValue) {
      if ((await checkUniqueCompetitionSeason(body.name)).length > 0) {
        return {
          status: "error",
          message: `name "${body.name}" already exists.`,
        };
      }
    }

    const { data, errors } =
      await cookiesClient.models.CompetitionSeason.create(body, {
        selectionSet: ["id", "name", "season", "createdAt"],
      });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    revalidatePath("/cp/competitions/[competitionId]/competition-seasons/");
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

export async function deleteCompetitionSeason(id: string) {
  return await deleteEntity({
    id,
    modelName: "CompetitionSeason",
    pathToRevalidate: "/cp/competitions/[competitionId]/competition-seasons/",
  });
}

export async function createStandingRow(formData: FormData) {
  const body = formDataToObject<Standing>(formData);
  try {
    const { data, errors } = await cookiesClient.models.Standing.create(body, {
      selectionSet: [
        "id",
        "teamId",
        "position",
        "pts",
        "p",
        "w",
        "d",
        "l",
        "g",
        "gd",
        "leagueId",
      ],
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

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

export async function createMatch(formData: FormData) {
  const body = formDataToObject<Match>(formData);
  body.lineup = JSON.parse(formData.get("lineup") as string);
  body.coach = JSON.parse(formData.get("coach") as string);
  body.substitutes = JSON.parse(formData.get("substitutes") as string);
  body.homeTeam = JSON.parse(formData.get("homeTeam") as string);
  body.awayTeam = JSON.parse(formData.get("awayTeam") as string);

  try {
    const { data, errors } = await cookiesClient.models.Match.create(body, {
      selectionSet: ["id", "homeTeam.*", "awayTeam.*"],
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    revalidatePath("/cp/matches");
    return {
      status: "success",
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}
