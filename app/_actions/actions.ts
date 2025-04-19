"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory, deleteEntity } from "@/lib/factoryFunctions";
import { cookiesClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
type LeagueRound = Schema["LeagueRound"]["type"];
type PlayOff = Schema["PlayOff"]["type"];

interface ICompetitionSeason {
  id: string;
  logo: string;
  name: string;
  // season: string;
}

interface IMatch {
  id?: string;
  competitionSeasonId?: Nullable<string>;
  competitionSeason?: ICompetitionSeason;
  date: string;
  time: string;
  venue: string;
  status: "UPCOMING" | "COMPLETED" | "CANCELED" | "ABANDONED" | null;
  result?: "WIN" | "DRAW" | "LOSE" | null;
  homeTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  awayTeam: {
    id: string;
    logo: string;
    shortName: string;
    longName: string;
    goals: Nullable<string>;
  } | null;
  scorers: any;
}

interface IMatchScorer {
  id: string;
  name: string;
  playerId?: string;
  time: string;
  goalType: string;
  isOpponent: boolean;
}

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

export const createPosition = async (formData: FormData) => {
  const base = formDataToObject<PlayerPosition>(formData);
  const positionCreator = createEntityFactory<PlayerPosition, PlayerPosition>();

  return await positionCreator({
    modelName: "PlayerPosition",
    input: base,
    selectionSet: ["id", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/positions",
    preprocess: (input) => ({
      ...input,
      attributes: JSON.parse(formData.get("attributes") as string),
    }),
    validate: async (input) => {
      const uniqueShortName = await checkPositionUniqueShortName(
        input.shortName
      );
      if (uniqueShortName && uniqueShortName.length > 0) {
        return {
          status: "error",
          valid: false,
          message: `shortName "${input.shortName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

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

export const createSeason = async (formData: FormData) => {
  const base = formDataToObject<Season>(formData);
  const seasonCreator = createEntityFactory<Season, Season>();

  return await seasonCreator({
    modelName: "Season",
    input: base,
    selectionSet: ["id", "season", "createdAt"],
    pathToRevalidate: "/cp/seasons",
    validate: async (input) => {
      if ((await checkUniqueSeason(input.season)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `season "${input.season}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

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

  const { data, errors } = await cookiesClient.models.Season.update(
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

export const createCompetition = async (formData: FormData) => {
  const base = formDataToObject<Competition>(formData);
  const competitionCreator = createEntityFactory<Competition, Competition>();

  return await competitionCreator({
    modelName: "Competition",
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/competitions",
    validate: async (input) => {
      if ((await checkUniqueCompetitionName(input.longName)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `longName "${input.longName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

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
  try {
    const { data: competition, errors } =
      await cookiesClient.models.Competition.get({ id });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    if (!competition) {
      return {
        status: "error",
        message: "No competition with that id" + id,
      };
    }

    //  find competition season
    const { data: competitionSeasons } =
      await cookiesClient.models.CompetitionSeason.list({
        filter: {
          competitionId: {
            eq: id,
          },
        },
      });

    if (competitionSeasons && competitionSeasons.length > 0) {
      return {
        status: "error",
        message:
          "Please delete competition seasons associated with this competition",
      };
    }

    await cookiesClient.models.Competition.delete({ id });

    revalidatePath("/cp/competitions");
    return {
      status: "success",
      data: null,
      message: "Competition deleted successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export const createTeam = async (formData: FormData) => {
  const base = formDataToObject<Team>(formData);
  const teamCreator = createEntityFactory<Team, Team>();

  return await teamCreator({
    modelName: "Team",
    input: base,
    selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
    pathToRevalidate: "/cp/teams",
    validate: async (input) => {
      if ((await checkUniqueTeamName(input.longName)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `longName "${input.longName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

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

export const createPlayer = async (formData: FormData) => {
  const base = formDataToObject<Player>(formData);
  const playerCreator = createEntityFactory<Player, Player>();

  return await playerCreator({
    modelName: "Player",
    input: base,
    selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
    pathToRevalidate: "/cp/players",
  });
};

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

export const createArticle = async (formData: FormData) => {
  const base = formDataToObject<Article>(formData);
  const articleCreator = createEntityFactory<Article, Article>();

  return await articleCreator({
    modelName: "Team",
    input: base,
    selectionSet: ["id", "title", "content", "coverImage"],
    pathToRevalidate: "/cp/articles",
    validate: async (input) => {
      if ((await checkUniqueArticleTitle(input.title)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `title "${input.title}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

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

export const createTrophy = async (formData: FormData) => {
  const base = formDataToObject<Trophy>(formData);
  const trophyCreator = createEntityFactory<Trophy, Trophy>();

  return await trophyCreator({
    modelName: "Trophy",
    input: base,
    selectionSet: ["id", "image", "trophyName", "competition.longName"],
    pathToRevalidate: "/cp/trophies",
    validate: async (input) => {
      if ((await checkUniqueTrophyName(input.trophyName)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `trophyName "${input.trophyName}" already exists.`,
        };
      }
      return { valid: true };
    },
  });
};

export async function deleteTrophy(id: string) {
  return await deleteEntity({
    id,
    modelName: "Trophy",
    pathToRevalidate: "/cp/trophies",
  });
}

export const createArticleCategory = async (formData: FormData) => {
  const base = formDataToObject<ArticleCategory>(formData);
  const articleCategoryCreator = createEntityFactory<
    ArticleCategory,
    ArticleCategory
  >();

  return await articleCategoryCreator({
    modelName: "ArticleCategory",
    input: base,
    selectionSet: ["id", "category"],
    pathToRevalidate: "/cp/article-categories",
    validate: async (input) => {
      if ((await checkUniqueCategory(input.category)).length > 0) {
        return {
          status: "error",
          valid: false,
          message: `category "${input.category}" already exists.`,
        };
      }

      return { valid: true };
    },
  });
};

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

export const createCup = async (formData: FormData) => {
  const base = formDataToObject<Cup>(formData);
  const cupCreator = createEntityFactory<Cup, Cup>();

  return await cupCreator({
    modelName: "Cup",
    input: base,
    selectionSet: ["id", "competitionNameSeason"],
    validate: async (input) => {
      const uniqueCup = await checkUniqueCup(input.competitionNameSeason);
      if (uniqueCup && uniqueCup.length > 0) {
        return {
          status: "error",
          valid: false,
          message: `name "${input.competitionNameSeason}" already exists.`,
        };
      }

      return { valid: true };
    },
  });
};

export const createLeague = async (formData: FormData) => {
  const base = formDataToObject<League>(formData);
  const leagueCreator = createEntityFactory<League, League>();

  return await leagueCreator({
    modelName: "League",
    input: base,
    selectionSet: ["id", "competitionNameSeason"],
    validate: async (input) => {
      const uniqueLeague = await checkUniqueLeague(input.competitionNameSeason);
      if (uniqueLeague && uniqueLeague.length > 0) {
        return {
          status: "error",
          valid: false,
          message: `name "${input.competitionNameSeason}" already exists.`,
        };
      }
      return { valid: true };
    },
    preprocess: (input) => ({
      ...input,
      teams: JSON.parse(formData.get("teams") as string),
    }),
  });
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

export async function updateLeagueRound(id: string, formData: FormData) {
  const body = formDataToObject<LeagueRound>(formData);

  try {
    const { data, errors } = await cookiesClient.models.LeagueRound.update(
      body,
      {
        selectionSet: ["id", "round"],
      }
    );

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    revalidatePath(
      "/cp/competitions/[competitionId]/competition-seasons/[competitionSeasonId]"
    );
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

    const { data: trophies } = await cookiesClient.models.Trophy.list({
      filter: {
        competitionId: {
          eq: id,
        },
      },
    });

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

    for (const trophy of trophies) {
      await cookiesClient.models.Trophy.delete({ id: trophy.id });
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

export const createStandingRow = async (formData: FormData) => {
  const base = formDataToObject<Standing>(formData);
  const standingRowCreator = createEntityFactory<Standing, Standing>();

  return await standingRowCreator({
    modelName: "Standing",
    input: base,
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
};

export const updateStandingRow = async (id: string, formData: FormData) => {
  const base = formDataToObject<Standing>(formData);

  try {
    const { data, errors } = await cookiesClient.models.Standing.update(base, {
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
      console.log(errors);
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
};

export const createLeagueRound = async (formData: FormData) => {
  const base = formDataToObject<LeagueRound>(formData);
  const leagueRoundCreator = createEntityFactory<LeagueRound, LeagueRound>();

  return await leagueRoundCreator({
    modelName: "LeagueRound",
    input: base,
    selectionSet: ["id", "round"],
    pathToRevalidate:
      "/cp/competitions/[competitionId]/competition-seasons/[competitionSeasonId]",
    preprocess: (input) => ({
      ...input,
      standing: JSON.parse(formData.get("standing") as string),
    }),
  });
};

export const createPlayOff = async (formData: FormData) => {
  const base = formDataToObject<PlayOff>(formData);
  const playOffCreator = createEntityFactory<PlayOff, PlayOff>();

  return await playOffCreator({
    modelName: "PlayOff",
    input: base,
    selectionSet: ["id", "round"],
    pathToRevalidate:
      "/cp/competitions/[competitionId]/competition-seasons/[competitionSeasonId]",
  });
};

export async function updatePlayOff(id: string, formData: FormData) {
  const body = formDataToObject<PlayOff>(formData);

  try {
    const { data, errors } = await cookiesClient.models.PlayOff.update(body, {
      selectionSet: ["id", "round"],
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }

    revalidatePath(
      "/cp/competitions/[competitionId]/competition-seasons/[competitionSeasonId]"
    );
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

export const createMatch = async (formData: FormData) => {
  const base = formDataToObject<Match>(formData);
  const matchCreator = createEntityFactory<Match, Match>();

  return await matchCreator({
    modelName: "Match",
    input: base,
    selectionSet: ["id", "homeTeam.*", "awayTeam.*"],
    pathToRevalidate: "/cp/matches",
    preprocess: (input) => ({
      ...input,
      lineup: JSON.parse(formData.get("lineup") as string),
      coach: JSON.parse(formData.get("coach") as string),
      substitutes: JSON.parse(formData.get("substitutes") as string),
      homeTeam: JSON.parse(formData.get("homeTeam") as string),
      awayTeam: JSON.parse(formData.get("awayTeam") as string),
    }),
  });
};

export async function updateMatch(id: string, formData: FormData) {
  const body = formDataToObject<Match>(formData);
  body.lineup = JSON.parse(formData.get("lineup") as string);
  body.coach = JSON.parse(formData.get("coach") as string);
  body.substitutes = JSON.parse(formData.get("substitutes") as string);
  body.homeTeam = JSON.parse(formData.get("homeTeam") as string);
  body.awayTeam = JSON.parse(formData.get("awayTeam") as string);

  try {
    const { data, errors } = await cookiesClient.models.Match.update(body, {
      selectionSet: ["id", "homeTeam.*", "awayTeam.*"],
    });

    if (errors) {
      console.log(errors);
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

export async function deleteMatch(id: string) {
  return await deleteEntity({
    id,
    modelName: "Match",
    pathToRevalidate: "/cp/trophies",
  });
}

function getPlayerGoalCounts(matches: IMatch[]) {
  const goalCounts: Record<string, number> = {};

  for (const match of matches) {
    let scorers: IMatchScorer[] = [];

    try {
      if (match.scorers) {
        scorers = JSON.parse(match.scorers as string);
      }
    } catch (e) {
      console.error("Invalid scorers JSON in match:", match, e);
      continue;
    }

    for (const scorer of scorers) {
      if (!scorer.isOpponent && scorer.playerId) {
        if (!goalCounts[scorer.playerId]) {
          goalCounts[scorer.playerId] = 1;
        } else {
          goalCounts[scorer.playerId]++;
        }
      }
    }
  }

  // Convert the record to an array of objects
  const result = Object.entries(goalCounts).map(([playerId, goals]) => ({
    playerId,
    goals,
  }));

  return result;
}

async function getCurrentCompetitionSeasons(client: "guest" | "auth") {
  const year = new Date().getFullYear();
  const { data: competitionSeasons } =
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        season: {
          contains: `${year}`,
        },
      },
      authMode: client === "guest" ? "iam" : "userPool",
    });

  return competitionSeasons;
}

async function getCurrentCompetitionSeasonsMatches(client: "guest" | "auth") {
  const competitionSeasons = await getCurrentCompetitionSeasons(client);
  let matches: IMatch[] = [];

  for (const season of competitionSeasons) {
    // matches for each competition season
    const { data: matchList } = await cookiesClient.models.Match.list({
      filter: {
        competitionSeasonId: {
          eq: season.id,
        },
      },
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: [
        "id",
        "date",
        "time",
        "status",
        "result",
        "venue",
        "awayTeam.*",
        "keyPlayerId",
        "homeTeam.*",
        "competitionSeason.logo",
        "competitionSeason.name",
        "competitionSeason.id",
        "scorers",
      ],
    });
    matches = [...matches, ...matchList];
  }
  return matches;
}

async function getPrevNextMatch(client: "guest" | "auth") {
  const matches = await getCurrentCompetitionSeasonsMatches(client);
  // result and fixtures from matches for the current year
  const { results, fixtures } = matches.reduce(
    (acc, match) => {
      if (match.status === "COMPLETED") {
        acc.results.push(match);
      } else {
        acc.fixtures.push(match);
      }
      return acc;
    },
    { results: [], fixtures: [] } as {
      results: typeof matches;
      fixtures: typeof matches;
    }
  );

  results.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  fixtures.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingMatch = fixtures[0] || null;
  const lastMatch = results[results.length - 1] || null;

  return {
    upcomingMatch,
    lastMatch,
  };
}

export async function getCurrentNnlStanding(client: "guest" | "auth") {
  const year = new Date().getFullYear();
  // current nigerian national league competition
  const currentNNlSeasons = (
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        name: {
          eq: "nigerian national league",
        },
        season: {
          contains: `${year}`,
        },
        status: { eq: "PENDING" },
      },
      authMode: client === "guest" ? "iam" : "userPool",
    })
  ).data;

  const currentNNlSeason = currentNNlSeasons[0];

  // league belonging to the nigerian national league
  const currentLeague =
    currentNNlSeason &&
    currentNNlSeason.leagueId &&
    (
      await cookiesClient.models.League.get(
        {
          id: currentNNlSeason.leagueId,
        },
        {
          authMode: client === "guest" ? "iam" : "userPool",
        }
      )
    ).data;

  // nigerian natonal league table
  const nnlStanding = currentLeague
    ? (
        await cookiesClient.models.Standing.list({
          filter: {
            leagueId: {
              eq: currentLeague.id,
            },
          },
          authMode: client === "guest" ? "iam" : "userPool",
        })
      ).data
    : [];

  const teams = (
    await cookiesClient.models.Team.list({
      authMode: client === "guest" ? "iam" : "userPool",
    })
  ).data;

  const mappedStanding = nnlStanding
    .map((el) => {
      const team = teams.find((team) => team.id === el.teamId);
      return { ...el, team };
    })
    .filter((el) => el !== undefined);

  return mappedStanding;
}

export async function fetchDashboardData() {
  const year = new Date().getFullYear();
  try {
    const competitionSeasons = await getCurrentCompetitionSeasons("auth");

    if (!competitionSeasons || competitionSeasons.length < 1) {
      return {
        totalCompetitions: 0,
        activeCompetitions: 0,
        matchSummary: { wins: 0, losses: 0, draws: 0 },
        goalRanking: null,
        nnlStanding: null,
        lastMatch: null,
        upcomingMatch: null,
        upcomingCompetition: {
          win: 0,
          draw: 0,
          lose: 0,
          played: 0,
        },
        status: "success",
      };
    }

    // initialize rounds for cup or league
    let allRounds: (LeagueRound | PlayOff)[] = [];
    for (const season of competitionSeasons) {
      // playoff rounds for competition season
      if (season.cupId) {
        const { data: playOffs = [] } = await cookiesClient.models.PlayOff.list(
          {
            filter: {
              cupId: {
                eq: season.cupId,
              },
            },
          }
        );

        allRounds = [...allRounds, ...playOffs];
      }

      // league rounds for each competition season
      if (season.leagueId) {
        const { data: leagueRounds = [] } =
          await cookiesClient.models.LeagueRound.list({
            filter: {
              leagueId: {
                eq: season.leagueId,
              },
            },
          });
        allRounds = [...allRounds, ...leagueRounds];
      }
    }

    // find the counts for completed rounds
    const resultCounts = allRounds.reduce(
      (acc, round) => {
        if (round.status !== "COMPLETED") return acc;

        const result = round.result?.toLowerCase();

        if (result === "win") acc.wins += 1;
        else if (result === "loss") acc.losses += 1;
        else if (result === "draw") acc.draws += 1;

        return acc;
      },
      { wins: 0, losses: 0, draws: 0 }
    );

    const nnlStanding = await getCurrentNnlStanding("auth");

    const { upcomingMatch, lastMatch } = await getPrevNextMatch("auth");
    const matches = await getCurrentCompetitionSeasonsMatches("auth");

    const upcomingCompetitionSeasonRounds = upcomingMatch
      ? matches.filter(
          (el) => el.competitionSeasonId === upcomingMatch.competitionSeasonId
        )
      : [];

    // result for previous rounds of upcoming match
    const roundStatusCounts = upcomingCompetitionSeasonRounds.reduce(
      (acc, round) => {
        const outcome = round.result?.toString().trim().toUpperCase();

        if (round.status === "COMPLETED") {
          acc.played++;

          switch (outcome) {
            case "WIN":
              acc.wins++;
              break;
            case "DRAW":
              acc.draws++;
              break;
            case "LOSE":
              acc.losses++;
              break;
          }
        }

        return acc;
      },
      { wins: 0, draws: 0, losses: 0, played: 0 }
    );

    const players = (
      await cookiesClient.models.Player.list({
        selectionSet: ["id", "firstname", "lastname", "homeKit"],
      })
    ).data;

    // map player to goal ranking
    const mappedGoalRanking = getPlayerGoalCounts(matches)
      .map((el) => {
        const player = players.find((play) => play.id === el.playerId);
        if (!player) return;
        return { ...el, player };
      })
      .filter((el) => el !== undefined);

    const dashboardContent = {
      totalCompetitions: competitionSeasons.length,
      activeCompetitions: competitionSeasons.filter(
        (el) => el.status === "PENDING"
      ).length,
      matchSummary: {
        wins: resultCounts.wins,
        losses: resultCounts.losses,
        draws: resultCounts.draws,
      },
      goalRanking: mappedGoalRanking,
      nnlStanding,
      lastMatch,
      upcomingMatch,
      upcomingCompetition: {
        win: roundStatusCounts.wins,
        draw: roundStatusCounts.draws,
        lose: roundStatusCounts.losses,
        played: roundStatusCounts.played,
      },
    };
    return {
      status: "success",
      data: dashboardContent,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

// end season route for competition season

export async function fetchHomepageData() {
  try {
    const { upcomingMatch, lastMatch } = await getPrevNextMatch("guest");
    const nnlStanding = await getCurrentNnlStanding("guest");
    const { data: articles } = await cookiesClient.models.Article.list({
      limit: 4,
      authMode: "iam",
      selectionSet: [
        "id",
        "articleCategory.category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
      ],
    });
    const { data: players } = await cookiesClient.models.Player.list({
      filter: {
        ageGroup: {
          eq: "UNDER_19",
        },
      },
      limit: 3,
      authMode: "iam",
      selectionSet: [
        "id",
        "firstname",
        "lastname",
        "awayKit",
        "homeKit",
        "dob",
        "dominantFoot",
        "squadNo",
        "height",
        "weight",
        "isTwoFooted",
        "playerPosition.shortName",
        "playerPosition.longName",
      ],
    });

    const homepageContent = {
      upcomingMatch,
      lastMatch,
      nnlStanding,
      articles,
      players,
    };

    return {
      status: "success",
      data: homepageContent,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export async function fetchPlayOffs(cupId: string, seasonId: string) {
  const { data: playOffs = [] } = await cookiesClient.models.PlayOff.list({
    filter: {
      cupId: {
        eq: cupId,
      },
    },
    authMode: "iam",
    selectionSet: ["id", "round", "matchId", "cupId"],
  });

  const { data: matches = [] } = await cookiesClient.models.Match.list({
    filter: {
      competitionSeasonId: {
        eq: seasonId,
      },
    },
    authMode: "iam",
    selectionSet: [
      "id",
      "date",
      "time",
      "status",
      "result",
      "awayTeam.*",
      "homeTeam.*",
      "competitionSeason.logo",
      "competitionSeason.name",
      "competitionSeason.id",
    ],
  });

  const mappedPlayOffs = playOffs
    .map((el) => {
      const match = matches.find((match) => match.id === el.matchId);
      if (!match) return;
      return {
        ...el,
        match,
      };
    })
    .filter((el) => el !== undefined);

  return mappedPlayOffs;
}

export async function fetchStanding(leagueId: string) {
  const { data: standing = [] } = await cookiesClient.models.Standing.list({
    filter: {
      leagueId: {
        eq: leagueId,
      },
    },
    authMode: "iam",
  });

  const teams = (
    await cookiesClient.models.Team.list({
      authMode: "iam",
    })
  ).data;

  const mappedStanding = standing
    .map((el) => {
      const team = teams.find((team) => team.id === el.teamId);
      return { ...el, team };
    })
    .filter((el) => el !== undefined);

  return mappedStanding;
}
