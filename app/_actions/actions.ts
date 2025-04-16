"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory, deleteEntity } from "@/lib/factoryFunctions";
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
type LeagueRound = Schema["LeagueRound"]["type"];
type PlayOff = Schema["PlayOff"]["type"];

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

// export async function createCompetition(formData: FormData) {
//   const body = formDataToObject<Competition>(formData);

//   if ((await checkUniqueCompetitionName(body.longName)).length > 0) {
//     return {
//       status: "error",
//       message: `longName "${body.longName}" already exists.`,
//     };
//   }

//   const { data, errors } = await cookiesClient.models.Competition.create(body, {
//     selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
//   });

//   if (errors) {
//     return {
//       status: "error",
//       message: errors[0].message || "An unknown error occurred",
//     };
//   }

//   revalidatePath("/cp/competitions");
//   return {
//     status: "success",
//     data,
//   };
// }

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

// export async function createTeam(formData: FormData) {
//   const body = formDataToObject<Team>(formData);

//   if ((await checkUniqueTeamName(body.longName)).length > 0) {
//     return {
//       status: "error",
//       message: `longName "${body.longName}" already exists.`,
//     };
//   }

//   const { data, errors } = await cookiesClient.models.Team.create(body, {
//     selectionSet: ["id", "logo", "shortName", "longName", "createdAt"],
//   });

//   if (errors) {
//     return {
//       status: "error",
//       message: errors[0].message || "An unknown error occurred",
//     };
//   }

//   revalidatePath("/cp/teams");
//   return {
//     status: "success",
//     data,
//   };
// }

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

// export async function createPlayer(formData: FormData) {
//   const body = formDataToObject<Player>(formData);

//   const { data, errors } = await cookiesClient.models.Player.create(body, {
//     selectionSet: ["id", "firstname", "lastname", "ageGroup", "dob"],
//   });

//   if (errors) {
//     return {
//       status: "error",
//       message: errors[0].message || "An unknown error occurred",
//     };
//   }

//   revalidatePath("/cp/players");
//   return {
//     status: "success",
//     data,
//   };
// }

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

// export async function createArticle(formData: FormData) {
//   const body = formDataToObject<Article>(formData);

//   if ((await checkUniqueArticleTitle(body.title)).length > 0) {
//     return {
//       status: "error",
//       message: `title "${body.title}" already exists.`,
//     };
//   }

//   const { data, errors } = await cookiesClient.models.Article.create(body, {
//     selectionSet: ["id", "title", "content", "coverImage"],
//   });

//   if (errors) {
//     return {
//       status: "error",
//       message: errors[0].message || "An unknown error occurred",
//     };
//   }

//   revalidatePath("/cp/articles");
//   return {
//     status: "success",
//     data,
//   };
// }

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
    selectionSet: ["id", "image", "trophyName"],
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

// export async function createTrophy(formData: FormData) {
//   const body = formDataToObject<Trophy>(formData);

//   if ((await checkUniqueTrophyName(body.trophyName)).length > 0) {
//     return {
//       status: "error",
//       message: `trophyName "${body.trophyName}" already exists.`,
//     };
//   }

//   const { data, errors } = await cookiesClient.models.Trophy.create(body, {
//     selectionSet: ["id", "image", "trophyName"],
//   });

//   if (errors) {
//     return {
//       status: "error",
//       message: errors[0].message || "An unknown error occurred",
//     };
//   }

//   revalidatePath("/cp/trophies");
//   return {
//     status: "success",
//     data,
//   };
// }

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

// export async function createArticleCategory(formData: FormData) {
//   const body = formDataToObject<ArticleCategory>(formData);

//   if ((await checkUniqueCategory(body.category)).length > 0) {
//     return {
//       status: "error",
//       message: `category "${body.category}" already exists.`,
//     };
//   }

//   const { data, errors } = await cookiesClient.models.ArticleCategory.create(
//     body,
//     {
//       selectionSet: ["id", "category"],
//     }
//   );

//   if (errors) {
//     return {
//       status: "error",
//       message: errors[0].message || "An unknown error occurred",
//     };
//   }

//   revalidatePath("/cp/article-categories");
//   return {
//     status: "success",
//     data,
//   };
// }

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

// export async function createCup(formData: FormData) {
//   const body = formDataToObject<Cup>(formData);
//   try {
//     const uniqueCup = await checkUniqueCup(body.competitionNameSeason);
//     if (uniqueCup && uniqueCup.length > 0) {
//       return {
//         status: "error",
//         message: `name "${body.competitionNameSeason}" already exists.`,
//       };
//     }

//     const { data, errors } = await cookiesClient.models.Cup.create(body, {
//       selectionSet: ["id", "competitionNameSeason"],
//     });

//     if (errors) {
//       return {
//         status: "error",
//         message: errors[0].message || "An unknown error occurred",
//       };
//     }

//     return {
//       status: "success",
//       data,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: "error",
//       message: "An unknown error occurred",
//     };
//   }
// }

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
  });
};

// export async function createLeague(formData: FormData) {
//   const body = formDataToObject<League>(formData);
//   body.teams = JSON.parse(formData.get("teams") as string);
//   try {
//     const uniqueCup = await checkUniqueLeague(body.competitionNameSeason);
//     if (uniqueCup && uniqueCup.length > 0) {
//       return {
//         status: "error",
//         message: `name "${body.competitionNameSeason}" already exists.`,
//       };
//     }

//     const { data, errors } = await cookiesClient.models.League.create(body, {
//       selectionSet: ["id", "competitionNameSeason"],
//     });

//     if (errors) {
//       return {
//         status: "error",
//         message: errors[0].message || "An unknown error occurred",
//       };
//     }

//     return {
//       status: "success",
//       data,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: "error",
//       message: "An unknown error occurred",
//     };
//   }
// }

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

// export async function createCompetitionSeason(formData: FormData) {
//   const body = formDataToObject<CompetitionSeason>(formData);
//   try {
//     const uniqueSeason = await checkUniqueCompetitionSeason(body.season);
//     if (uniqueSeason && uniqueSeason.length > 0) {
//       return {
//         status: "error",
//         message: `name "${body.season}" already exists.`,
//       };
//     }

//     const { data, errors } =
//       await cookiesClient.models.CompetitionSeason.create(body, {
//         selectionSet: ["id", "name", "season", "createdAt"],
//       });

//     if (errors) {
//       return {
//         status: "error",
//         message: errors[0].message || "An unknown error occurred",
//       };
//     }

//     revalidatePath("/cp/competitions/[competitionId]/competition-seasons");
//     return {
//       status: "success",
//       data,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: "error",
//       message: "An unknown error occurred",
//     };
//   }
// }

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

// export async function createStandingRow(formData: FormData) {
//   const body = formDataToObject<Standing>(formData);
//   try {
//     const { data, errors } = await cookiesClient.models.Standing.create(body, {
//       selectionSet: [
//         "id",
//         "teamId",
//         "position",
//         "pts",
//         "p",
//         "w",
//         "d",
//         "l",
//         "g",
//         "gd",
//         "leagueId",
//       ],
//     });

//     if (errors) {
//       return {
//         status: "error",
//         message: errors[0].message || "An unknown error occurred",
//       };
//     }

//     return {
//       status: "success",
//       data,
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message: "An unknown error occurred",
//     };
//   }
// }

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
