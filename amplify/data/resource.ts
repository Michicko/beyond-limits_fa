import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  CompetitionStatus: a.enum(["PENDING", "COMPLETED"]),
  ArticleStatus: a.enum(["UNPUBLISHED", "PUBLISHED"]),
  RoundResult: a.enum(["WIN", "DRAW", "LOSE"]),
  AgeGroup: a.enum(["UNDER_17", "UNDER_19"]),
  GoalType: a.enum(["NORMAL", "OWNGOAL", "PENALTY"]),
  CompetitionType: a.enum(["LEAGUE", "CUP", "MIXED"]),
  DominantFoot: a.enum(["RIGHT", "LEFT"]),
  PlayerStatus: a.enum(["ACTIVE", "LOAN", "INJURED"]),
  PlayOffRound: a.enum([
    "FINALS_128",
    "FINALS_64",
    "FINALS_32",
    "FINALS_16",
    "FINALS_8",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "FINALS",
  ]),
  MatchStatus: a.enum(["UPCOMING", "COMPLETED", "ABANDONED", "CANCELED"]),
  Scorer: a.customType({
    name: a.string().required(),
    time: a.string().required(),
    goalType: a.ref("GoalType"),
    isOpponent: a.boolean(),
  }),

  Team: a
    .model({
      logo: a.string().required(),
      shortName: a.string().required(),
      longName: a.string().required(),
      stadium: a.string(),
      isBeyondLimits: a.boolean().required().default(false),
    })
    .secondaryIndexes((index) => [index("longName")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Season: a
    .model({
      season: a.string().required(),
    })
    .secondaryIndexes((index) => [index("season")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Competition: a
    .model({
      logo: a.string().required(),
      shortName: a.string().required(),
      longName: a.string().required(),
      competitionType: a.ref("CompetitionType"),
      competitionSeasons: a.hasMany("CompetitionSeason", "competitionId"),
      trophy: a.hasOne("Trophy", "competitionId"),
    })
    .secondaryIndexes((index) => [index("longName")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  CompetitionSeason: a
    .model({
      season: a.string().required(),
      competitionId: a.id(),
      competition: a.belongsTo("Competition", "competitionId"),
      league: a.hasOne("League", "competitionSeasonId"),
      cup: a.hasOne("Cup", "competitionSeasonId"),
      matches: a.hasMany("Match", "competitionSeasonId"),
      winnerId: a.id(),
      status: a.ref("CompetitionStatus"),
    })
    .secondaryIndexes((index) => [index("season")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  League: a
    .model({
      competitionSeasonId: a.id(),
      competitionSeason: a.belongsTo(
        "CompetitionSeason",
        "competitionSeasonId"
      ),
      competitionNameSeason: a.string().required(),
      status: a.ref("CompetitionStatus"),
      leagueRounds: a.hasMany("LeagueRound", "leagueId"),
      standings: a.hasMany("Standing", "leagueId"),
      winnerId: a.id(),
    })
    .secondaryIndexes((index) => [index("competitionNameSeason")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  LeagueRound: a
    .model({
      leagueId: a.id(),
      league: a.belongsTo("League", "leagueId"),
      round: a.string().required(),
      standingId: a.id(),
      matchId: a.id(),
      result: a.ref("RoundResult"),
      homeForm: a.string(),
      awayForm: a.string(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Standing: a
    .model({
      leagueId: a.id(),
      league: a.belongsTo("League", "leagueId"),
      teamId: a.id(),
      position: a.integer().required(),
      p: a.integer().required(),
      w: a.integer().required(),
      d: a.integer().required(),
      l: a.integer().required(),
      g: a.string().required(),
      gd: a.integer().required(),
      pts: a.integer().required(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Cup: a
    .model({
      competitionSeasonId: a.id(),
      competitionSeason: a.belongsTo(
        "CompetitionSeason",
        "competitionSeasonId"
      ),
      competitionNameSeason: a.string().required(),
      status: a.ref("CompetitionStatus"),
      playOffs: a.hasMany("PlayOff", "cupId"),
      winnerId: a.id(),
    })
    .secondaryIndexes((index) => [index("competitionNameSeason")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  PlayOff: a
    .model({
      cupId: a.id(),
      cup: a.belongsTo("Cup", "cupId"),
      round: a.string().required(),
      matchId: a.id(),
      homeForm: a.string(),
      awayForm: a.string(),
      result: a.ref("RoundResult"),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Match: a
    .model({
      competitionSeasonId: a.id(),
      competitionSeason: a.belongsTo(
        "CompetitionSeason",
        "competitionSeasonId"
      ),
      date: a.date().required(),
      time: a.time().required(),
      venue: a.string().required(),
      status: a.ref("MatchStatus"),
      keyPlayerId: a.id(),
      mvpId: a.id(),
      review: a.json(),
      report: a.json(),
      lineup: a.id().array(),
      substitutes: a.id().array(),
      coach: a.customType({
        name: a.string().required(),
        role: a.enum(["HEAD", "ASSISTANT"]),
      }),
      homeTeamId: a.id(),
      awayTeamId: a.id(),
      homeTeamStats: a.customType({
        goals: a.integer(),
        passes: a.integer(),
        offsides: a.integer(),
        corners: a.integer(),
        shots: a.integer(),
        yellows: a.integer(),
        reds: a.integer(),
      }),
      awayTeamStats: a.customType({
        goals: a.integer(),
        passes: a.integer(),
        offsides: a.integer(),
        corners: a.integer(),
        shots: a.integer(),
        yellows: a.integer(),
        reds: a.integer(),
      }),
      scorers: a.ref("Scorer").array(),
    })
    .secondaryIndexes((index) => [index("date").sortKeys(["status"])])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Trophy: a
    .model({
      image: a.string().required(),
      trophyName: a.string().required(),
      competitionId: a.id(),
      competition: a.belongsTo("Competition", "competitionId"),
      articleId: a.id(),
    })
    .secondaryIndexes((index) => [index("trophyName")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  Player: a
    .model({
      ageGroup: a.ref("AgeGroup"),
      firstname: a.string().required(),
      lastname: a.string().required(),
      height: a.integer(),
      weight: a.integer(),
      homeKit: a.string(),
      awayKit: a.string(),
      squadNo: a.integer(),
      dob: a.date(),
      playerPositionId: a.id(),
      playerPosition: a.belongsTo("PlayerPosition", "playerPositionId"),
      status: a.ref("PlayerStatus"),
      dominantFoot: a.ref("DominantFoot"),
      isTwoFooted: a.boolean().default(false),
    })
    .secondaryIndexes((index) => [index("ageGroup")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  PlayerPosition: a
    .model({
      shortName: a.string().required(),
      longName: a.string().required(),
      players: a.hasMany("Player", "playerPositionId"),
      attributes: a.string().array(),
    })
    .secondaryIndexes((index) => [index("shortName")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  ArticleCategory: a
    .model({
      category: a.string().required(),
      articles: a.hasMany("Article", "articleCategoryId"),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow
        .groups(["Admin", "Writer"])
        .to(["create", "read", "delete", "update"]),
    ]),

  Article: a
    .model({
      articleCategoryId: a.id(),
      articleCategory: a.belongsTo("ArticleCategory", "articleCategoryId"),
      title: a.string().required(),
      coverImage: a.string(),
      content: a.json(),
      tags: a.string().array(),
      status: a.ref("ArticleStatus"),
    })
    .secondaryIndexes((index) => [index("title")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated("identityPool").to(["read"]),
      allow
        .groups(["Admin", "Writer"])
        .to(["create", "read", "delete", "update"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
