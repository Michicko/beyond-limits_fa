"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory } from "@/lib/factoryFunctions";
import { filterGroupedSeasonsByCurrent, formDataToObject } from "@/lib/helpers";
import { cookiesClient, getRole } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

type Nullable<T> = T | null;

type Standing = Schema["Standing"]["type"];
type LeagueRound = Schema["LeagueRound"]["type"];
type PlayOff = Schema["PlayOff"]["type"];

interface ICompetitionSeason {
  id: string;
  logo: string;
  name: string;
  season?: string;
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
  review: string | number | boolean | object | any[] | null;
}

interface IMatchScorer {
  id: string;
  name: string;
  playerId?: string;
  time: string;
  goalType: string;
  isOpponent: boolean;
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
      message: `${(error as Error).message}`,
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
      "name",
      "logo",
      "isBeyondLimits",
      "position",
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
        "name",
        "logo",
        "isBeyondLimits",
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
      message: `${(error as Error).message}`,
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

export async function endLeague(id: string) {
  try {
    const { data, errors } = await cookiesClient.models.League.update({
      id,
      status: "COMPLETED",
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

export async function isLoggedIn() {
  const { tokens } = await getRole();
  return tokens && tokens.accessToken && tokens.idToken;
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
      selectionSet: [
        "id",
        "logo",
        "name",
        "seasonStartMonth",
        "season",
        "cup.playOffs.*",
        "cupId",
        "leagueId",
        "league.leagueRounds.*",
        "status",
        "matches.id",
        "matches.date",
        "matches.time",
        "matches.venue",
        "matches.status",
        "matches.homeTeam.id",
        "matches.homeTeam.logo",
        "matches.homeTeam.shortName",
        "matches.homeTeam.longName",
        "matches.homeTeam.goals",
        "matches.awayTeam.id",
        "matches.awayTeam.logo",
        "matches.awayTeam.shortName",
        "matches.awayTeam.longName",
        "matches.awayTeam.goals",
        "matches.scorers",
        "matches.review",
        "matches.competitionSeason.id",
        "matches.result",
        "matches.competitionSeasonId",
        "matches.competitionSeason.season",
        "matches.competitionSeason.shortName",
        "matches.competitionSeason.name",
        "matches.competitionSeason.logo",
      ],
    });

  // Group competitionSeasons by name
  return filterGroupedSeasonsByCurrent(competitionSeasons);
}

export async function getCurrentCompetitionSeasonsMatches(
  client: "guest" | "auth"
) {
  const competitionSeasons = await getCurrentCompetitionSeasons(client);
  let matches: IMatch[] = [];

  for (const season of competitionSeasons) {
    matches = [...matches, ...season.matches];
  }

  return matches;
}

export async function getCounts(rounds: IMatch[]) {
  const roundStatusCounts = rounds.reduce(
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

  return roundStatusCounts;
}

async function getPrevNextMatch(client: "guest" | "auth") {
  const matches = await getCurrentCompetitionSeasonsMatches(client);
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

  const upcomingMatch = (fixtures && fixtures[0]) || null;
  const lastMatch = results[results.length - 1] || null;

  return {
    upcomingMatch,
    lastMatch,
    fixtures,
    matches,
  };
}

export async function getCurrentSeasonMatches(
  client: "guest" | "auth",
  month: number
) {
  const matches = await getCurrentCompetitionSeasonsMatches(client);

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

  // Filter both results and fixtures by month
  const filterByMonth = (list: typeof matches) =>
    list.filter((match) => {
      const matchDate = new Date(match.date);
      return matchDate.getMonth() === month; // JS months are 0-based
    });

  const filteredResults = filterByMonth(results);
  const filteredFixtures = filterByMonth(fixtures);

  // Sort by date ascending
  filteredResults.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  filteredFixtures.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return {
    fixtures: filteredFixtures,
    results: filteredResults,
  };
}

export async function getSeasonMatches(
  client: "guest" | "auth",
  month: number,
  season: string
) {
  const { fixtures, results } = await getCurrentSeasonMatches(client, month);

  const filteredFixtures: IMatch[] | [] = fixtures.filter(
    (el) => el.competitionSeason?.season === season
  );
  const filteredResults: IMatch[] | [] = results.filter(
    (el) => el.competitionSeason?.season === season
  );

  return {
    fixtures: filteredFixtures,
    results: filteredResults,
  };
}

export async function getCurrentNnlStanding(client: "guest" | "auth") {
  const year = new Date().getUTCFullYear();

  // current nigerian national league competition
  const currentNNlSeasons = (
    await cookiesClient.models.CompetitionSeason.list({
      filter: {
        name: {
          contains: "nigerian national league",
        },
        season: {
          contains: `${year}`,
        },
      },
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: [
        "id",
        "shortName",
        "name",
        "status",
        "logo",
        "type",
        "league.standings.*",
      ],
    })
  ).data;

  if (currentNNlSeasons.length > 1) {
    const curr = currentNNlSeasons.find((el) => el.status === "PENDING");
    return curr?.league.standings;
  }

  return currentNNlSeasons[0] ? currentNNlSeasons[0].league.standings : [];
}

export async function fetchDashboardData() {
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
    let allRounds: any[] = [];
    // initialize matches
    let matches: any[] = [];

    for (const season of competitionSeasons) {
      // playoff rounds for competition season
      if (season.cupId) {
        const playOffs = season.cup.playOffs;
        allRounds = [...allRounds, ...playOffs];
      }

      // league rounds for each competition season
      if (season.leagueId) {
        const leagueRounds = season.league.leagueRounds;
        allRounds = [...allRounds, ...leagueRounds];
      }

      matches = [...matches, ...season.matches];
    }

    // find the counts for completed rounds
    const resultCounts = allRounds.reduce(
      (acc, round) => {
        if (round.status !== "COMPLETED") return acc;

        const result = round.result?.toLowerCase();

        if (result === "win") acc.wins += 1;
        else if (result === "lose") acc.losses += 1;
        else if (result === "draw") acc.draws += 1;

        return acc;
      },
      { wins: 0, losses: 0, draws: 0 }
    );

    const nnlStanding = await getCurrentNnlStanding("auth");
    const { upcomingMatch, lastMatch } = await getPrevNextMatch("auth");

    const upcomingCompetitionSeasonRounds = upcomingMatch
      ? matches.filter(
          (el) => el.competitionSeasonId == upcomingMatch.competitionSeasonId
        )
      : [];

    // result for previous rounds of upcoming match
    const roundStatusCounts = await getCounts(upcomingCompetitionSeasonRounds);

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
    return {
      status: "error",
      message: `${(error as Error).message}`,
    };
  }
}

export async function fetchHomepageData() {
  const auth = await isLoggedIn();

  try {
    const { lastMatch, fixtures, matches } = await getPrevNextMatch(
      auth ? "auth" : "guest"
    );

    const nnlStanding = await getCurrentNnlStanding(auth ? "auth" : "guest");
    const { data: articles } = await cookiesClient.models.Article.list({
      limit: 4,
      authMode: auth ? "userPool" : "iam",
      filter: {
        status: {
          eq: "PUBLISHED",
        },
      },
      sortDirection: "ASC",
      selectionSet: [
        "id",
        "category",
        "content",
        "tags",
        "title",
        "coverImage",
        "status",
        "createdAt",
        "matchId",
        "matchHomeTeamLogo",
        "matchAwayTeamLogo",
      ],
    });

    const { data: players } = await cookiesClient.models.Player.list({
      filter: {
        status: {
          ne: "INACTIVE",
        },
      },
      limit: 3,
      authMode: auth ? "userPool" : "iam",
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

    const { data: highlights } = await cookiesClient.models.Highlight.list({
      authMode: auth ? "userPool" : "iam",
      selectionSet: ["id", "coverImage", "title", "createdAt"],
      limit: 3,
    });

    const homepageContent = {
      lastMatch,
      nnlStanding,
      articles,
      players,
      fixtures: fixtures.slice(0, 4),
      highlights,
      matches,
    };

    return {
      status: "success",
      data: homepageContent,
    };
  } catch (error) {
    return {
      status: "error",
      message: `${(error as Error).message}`,
    };
  }
}

export async function fetchPlayOffs(cupId: string, seasonId: string) {
  const auth = await isLoggedIn();
  const { data: playOffs = [] } = await cookiesClient.models.PlayOff.list({
    filter: {
      cupId: {
        eq: cupId,
      },
    },
    authMode: auth ? "userPool" : "iam",
    selectionSet: ["id", "round", "matchId", "cupId"],
  });

  const { data: matches = [] } = await cookiesClient.models.Match.list({
    filter: {
      competitionSeasonId: {
        eq: seasonId,
      },
    },
    authMode: auth ? "userPool" : "iam",
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
  const auth = await isLoggedIn();
  const { data: standing = [] } = await cookiesClient.models.Standing.list({
    filter: {
      leagueId: {
        eq: leagueId,
      },
    },
    authMode: auth ? "userPool" : "iam",
  });

  return standing;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteCloudinaryImage = async (publicId: string) => {
  if (!publicId) throw new Error("Missing publicId");
  return await cloudinary.uploader.destroy(publicId, { invalidate: true });
};

// fetchers
export async function fetchCompetitions(
  keyword: string,
  client: "guest" | "auth"
) {
  try {
    const result = await cookiesClient.models.Competition.list({
      filter: {
        or: [
          { longName: { contains: keyword } },
          { shortName: { contains: keyword } },
        ],
      },
      limit: 15,
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: ["id", "logo", "shortName", "longName"],
    });
    return result.data;
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
}

export async function fetchPlayers(keyword: string, client: "guest" | "auth") {
  try {
    const result = await cookiesClient.models.Player.list({
      filter: {
        or: [
          { firstname: { contains: keyword } },
          { lastname: { contains: keyword } },
        ],
      },
      limit: 15,
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: [
        "id",
        "firstname",
        "lastname",
        "ageGroup",
        "playerPosition.longName",
        "playerPosition.shortName",
        "height",
        "weight",
        "squadNo",
        "awayKit",
        "homeKit",
        "dob",
        "dominantFoot",
      ],
    });
    return result.data;
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
}

export async function fetchArticles(keyword: string, client: "guest" | "auth") {
  try {
    const result = await cookiesClient.models.Article.list({
      filter: {
        or: [
          { title: { contains: keyword } },
          {
            category: { contains: keyword },
            description: { contains: keyword },
          },
        ],
      },
      limit: 15,
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: [
        "id",
        "title",
        "category",
        "createdAt",
        "articleCategoryId",
        "coverImage",
        "matchId",
        "tags",
        "category",
        "matchHomeTeamLogo",
        "matchAwayTeamLogo",
        "createdAt",
      ],
    });
    return result.data;
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
}

export async function fetchHighlights(
  keyword: string,
  client: "guest" | "auth"
) {
  try {
    const result = await cookiesClient.models.Highlight.list({
      filter: {
        or: [
          { title: { contains: keyword } },
          { videoId: { contains: keyword } },
        ],
      },
      limit: 15,
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: [
        "id",
        "title",
        "videoId",
        "coverImage",
        "tags",
        "createdAt",
      ],
    });
    return result.data;
  } catch (error) {
    throw new Error("Failed to fetch teams");
  }
}

export async function globalSearch(keyword: string, client: "guest" | "auth") {
  try {
    if (!keyword) {
      return {
        error: "Keyword is required",
        status: 400,
      };
    }

    const keywordLower = keyword.toLowerCase();

    // Assuming each fetch function is fetching from the respective data sources
    const [competitions, players, articles, highlights] = await Promise.all([
      fetchCompetitions(keywordLower, client),
      fetchPlayers(keywordLower, client),
      fetchArticles(keywordLower, client),
      fetchHighlights(keywordLower, client),
    ]);

    return {
      status: 200,
      data: {
        competitions,
        players,
        articles,
        highlights,
      },
    };
  } catch (error) {
    return {
      error: "Failed to search",
      status: 500,
    };
  }
}

export async function fetchArticlesServer(
  auth: boolean,
  category?: string,
  token?: string | null
) {
  const filter = {
    status: { eq: "PUBLISHED" },
    ...(category && {
      category: {
        eq: category.toLowerCase(),
      },
    }),
  };

  try {
    const { data: articles, nextToken } =
      await cookiesClient.models.Article.list({
        limit: 15,
        authMode: auth ? "userPool" : "iam",
        filter,
        nextToken: token,
        sortDirection: "DESC",
        selectionSet: [
          "id",
          "category",
          "content",
          "tags",
          "title",
          "coverImage",
          "status",
          "createdAt",
          "matchId",
          "matchHomeTeamLogo",
          "matchAwayTeamLogo",
        ],
      });

    return {
      status: "success",
      data: {
        articles: articles ?? [],
        nextToken: nextToken ?? null,
      },
    };
  } catch (error) {
    return {
      status: "error",
      data: null,
      error: (error as Error).message,
    };
  }
}

export async function fetchHighlightsServer(
  auth: boolean,
  token?: string | null
) {
  try {
    const { data: highlights, nextToken } =
      await cookiesClient.models.Highlight.list({
        limit: 15,
        authMode: auth ? "userPool" : "iam",
        nextToken: token,
        sortDirection: "DESC",
        selectionSet: ["id", "coverImage", "title", "createdAt"],
      });

    return {
      status: "success",
      data: {
        highlights: highlights ?? [],
        nextToken: nextToken ?? null,
      },
    };
  } catch (error) {
    return {
      status: "error",
      data: null,
      error: (error as Error).message,
    };
  }
}

export async function fetchVisualsServer(auth: boolean, token?: string | null) {
  try {
    const { data: visuals, nextToken } = await cookiesClient.models.Visual.list(
      {
        limit: 15,
        authMode: auth ? "userPool" : "iam",
        nextToken: token,
        sortDirection: "DESC",
        selectionSet: ["id", "url", "alt", "createdAt"],
      }
    );

    return {
      status: "success",
      data: {
        visuals: visuals ?? [],
        nextToken: nextToken ?? null,
      },
    };
  } catch (error) {
    return {
      status: "error",
      data: null,
      error: (error as Error).message,
    };
  }
}
