"use server";
import { Schema } from "@/amplify/data/resource";
import { createEntityFactory } from "@/lib/factoryFunctions";
import { formDataToObject } from "@/lib/helpers";
import { cookiesClient, getRole } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";

type Nullable<T> = T | null;

type Standing = Schema["Standing"]["type"];
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
        "name",
        "cup.playOffs.*",
        "cupId",
        "leagueId",
        "league.leagueRounds.*",
        "status",
        "matches.*",
        "matches.competitionSeason.id",
        "matches.competitionSeason.season",
        "matches.competitionSeason.name",
        "matches.competitionSeason.logo",
      ],
    });

  return competitionSeasons;
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

  const now = new Date().getTime();
  results.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  fixtures.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcomingMatch =
    fixtures.find((fixture) => new Date(fixture.date).getTime() > now) || null;
  const lastMatch = results[results.length - 1] || null;

  return {
    upcomingMatch,
    lastMatch,
    fixtures,
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
        // status: { eq: "PENDING" },
      },
      authMode: client === "guest" ? "iam" : "userPool",
      selectionSet: [
        "id",
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
        else if (result === "loss") acc.losses += 1;
        else if (result === "draw") acc.draws += 1;

        return acc;
      },
      { wins: 0, losses: 0, draws: 0 }
    );

    const nnlStanding = await getCurrentNnlStanding("auth");

    const { upcomingMatch, lastMatch } = await getPrevNextMatch("auth");

    const upcomingCompetitionSeasonRounds = upcomingMatch
      ? matches.filter(
          (el) => el.competitionSeasonId === upcomingMatch.competitionSeasonId
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
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

// end season route for competition season

export async function fetchHomepageData() {
  const auth = await isLoggedIn();
  try {
    const { upcomingMatch, lastMatch, fixtures } = await getPrevNextMatch(
      auth ? "auth" : "guest"
    );
    const nnlStanding = await getCurrentNnlStanding(auth ? "auth" : "guest");
    const { data: articles } = await cookiesClient.models.Article.list({
      limit: 4,
      authMode: auth ? "userPool" : "iam",
      selectionSet: [
        "id",
        "articleCategory.category",
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
        ageGroup: {
          eq: "UNDER_19",
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
      selectionSet: ["id", "coverImage", "title"],
      limit: 3,
    });

    const homepageContent = {
      upcomingMatch,
      lastMatch,
      nnlStanding,
      articles,
      players,
      fixtures,
      highlights,
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

export async function addUserToGroup(userId: string, groupName: string) {
  try {
    const { data, errors } = await cookiesClient.mutations.addUserToGroup({
      userId,
      groupName,
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }
    const res = JSON.parse(data as string);
    revalidatePath("/cp/users");

    return {
      status: "success",
      data: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export async function removeUserFromGroup(userId: string, groupName: string) {
  try {
    const { data, errors } = await cookiesClient.mutations.removeUserFromGroup({
      userId,
      groupName,
    });

    if (errors) {
      return {
        status: "error",
        message: errors[0].message || "An unknown error occurred",
      };
    }
    const res = JSON.parse(data as string);
    revalidatePath("/cp/users");

    return {
      status: "success",
      data: res,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An unknown error occurred",
    };
  }
}

export const deleteCloudinaryImage = async (publicId: string) => {
  const res = await fetch("/api/delete-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publicId }),
  });

  const data = await res.json();
  return data;
};
