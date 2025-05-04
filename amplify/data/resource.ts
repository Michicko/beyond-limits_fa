import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { addUserToGroup } from "./add-user-to-group/resource";
import { listUsers } from "./list-users/resource";
import { removeUserFromGroup } from "./remove-user-from-group/resource";
import { listGroupsForUser } from "./list-groups-for-user/resource";
import { globalSearch } from "./global-search/resource";

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

  Team: a
    .model({
      logo: a.string().required(),
      shortName: a.string().required(),
      longName: a.string().required(),
      stadium: a.string(),
      isBeyondLimits: a.boolean().required().default(false),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  Season: a
    .model({
      season: a.string().required(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
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
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  CompetitionSeason: a
    .model({
      season: a.string().required(),
      name: a.string().required(),
      type: a.string().required(),
      logo: a.string().required(),
      competitionId: a.id(),
      competition: a.belongsTo("Competition", "competitionId"),
      cupId: a.id(),
      cup: a.hasOne("Cup", "competitionSeasonId"),
      leagueId: a.id(),
      league: a.hasOne("League", "competitionSeasonId"),
      matches: a.hasMany("Match", "competitionSeasonId"),
      winner: a.customType({
        isBeyondLimits: a.boolean(),
      }),
      status: a.ref("CompetitionStatus"),
    })
    .secondaryIndexes((index) => [index("season")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  League: a
    .model({
      competitionSeasonId: a.id(),
      CompetitionSeason: a.belongsTo(
        "CompetitionSeason",
        "competitionSeasonId"
      ),
      competitionNameSeason: a.string().required(),
      status: a.ref("CompetitionStatus"),
      leagueRounds: a.hasMany("LeagueRound", "leagueId"),
      standings: a.hasMany("Standing", "leagueId"),
      teams: a.id().array().required(),
      winnerId: a.id(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  LeagueRound: a
    .model({
      leagueId: a.id(),
      league: a.belongsTo("League", "leagueId"),
      round: a.string().required(),
      standing: a.customType({
        position: a.integer().required(),
        p: a.integer().required(),
        w: a.integer().required(),
        d: a.integer().required(),
        l: a.integer().required(),
        g: a.string().required(),
        gd: a.integer().required(),
        pts: a.integer().required(),
      }),
      matchId: a.id(),
      result: a.ref("RoundResult"),
      homeForm: a.string(),
      awayForm: a.string(),
      status: a.ref("CompetitionStatus"),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  Standing: a
    .model({
      leagueId: a.id(),
      league: a.belongsTo("League", "leagueId"),
      teamId: a.id(),
      name: a.string().required(),
      logo: a.string().required(),
      isBeyondLimits: a.boolean().required(),
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
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  Cup: a
    .model({
      competitionSeasonId: a.id(),
      CompetitionSeason: a.belongsTo(
        "CompetitionSeason",
        "competitionSeasonId"
      ),
      competitionNameSeason: a.string().required(),
      status: a.ref("CompetitionStatus"),
      playOffs: a.hasMany("PlayOff", "cupId"),
      winnerId: a.id(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
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
      status: a.ref("CompetitionStatus"),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
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
      result: a.ref("RoundResult"),
      keyPlayerId: a.id(),
      aboutKeyPlayer: a.string(),
      mvpId: a.id(),
      aboutMvp: a.string(),
      review: a.json(),
      report: a.json(),
      lineup: a.id().array(),
      substitutes: a.id().array(),
      coach: a.customType({
        name: a.string().required(),
        role: a.enum(["HEAD", "ASSISTANT"]),
      }),
      homeTeam: a.customType({
        id: a.string().required(),
        logo: a.string().required(),
        shortName: a.string().required(),
        longName: a.string().required(),
        goals: a.string(),
        passes: a.string(),
        offsides: a.string(),
        corners: a.string(),
        shots: a.string(),
        yellows: a.string(),
        reds: a.string(),
      }),
      awayTeam: a.customType({
        id: a.string().required(),
        logo: a.string().required(),
        shortName: a.string().required(),
        longName: a.string().required(),
        goals: a.string(),
        passes: a.string(),
        offsides: a.string(),
        corners: a.string(),
        shots: a.string(),
        yellows: a.string(),
        reds: a.string(),
      }),
      scorers: a.json(),
      homeForm: a.string(),
      awayForm: a.string(),
    })
    .secondaryIndexes((index) => [index("date").sortKeys(["status"])])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
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
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
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
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),
  PlayerPosition: a
    .model({
      shortName: a.string().required(),
      longName: a.string().required(),
      players: a.hasMany("Player", "playerPositionId"),
      attributes: a.string().array(),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow.group("Admin").to(["create", "read", "delete", "update"]),
    ]),

  ArticleCategory: a
    .model({
      category: a.string().required(),
      articles: a.hasMany("Article", "articleCategoryId"),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
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
      matchId: a.string(),
      matchHomeTeamLogo: a.string(),
      matchAwayTeamLogo: a.string(),
      tags: a.string().array(),
      status: a.ref("ArticleStatus"),
    })
    .secondaryIndexes((index) => [index("title")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow
        .groups(["Admin", "Writer"])
        .to(["create", "read", "delete", "update"]),
    ]),

  Highlight: a
    .model({
      title: a.string().required(),
      coverImage: a.string().required(),
      videoId: a.string().required(),
      description: a.json(),
      tags: a.string().array(),
    })
    .secondaryIndexes((index) => [index("title")])
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
      allow
        .groups(["Admin", "Writer"])
        .to(["create", "read", "delete", "update"]),
    ]),

  addUserToGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("Admin")])
    .handler(a.handler.function(addUserToGroup))
    .returns(a.json()),

  removeUserFromGroup: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      groupName: a.string().required(),
    })
    .authorization((allow) => [allow.group("Admin")])
    .handler(a.handler.function(removeUserFromGroup))
    .returns(a.json()),

  listUsers: a
    .query()
    .authorization((allow) => [allow.group("Admin")])
    .handler(a.handler.function(listUsers))
    .returns(a.json()),

  listGroupsForUser: a
    .query()
    .arguments({
      userId: a.string().required(),
    })
    .authorization((allow) => [allow.group("Admin")])
    .handler(a.handler.function(listGroupsForUser))
    .returns(a.json()),

  globalSearch: a
    .query()
    .arguments({
      keyword: a.string().required(),
    })
    .authorization((allow) => [
      allow.guest(),
      allow.groups(["Admin", "Writer"]),
      allow.authenticated(),
    ])
    .handler(a.handler.function(globalSearch))
    .returns(a.json()),
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
