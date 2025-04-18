import {
  Age_group,
  Competition_type,
  CompetitionStatus,
  Dominant_foot,
  MatchResult,
  MatchStatus,
  Player_status,
  Playoffs_round,
} from "./definitions";

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const landing_visuals = [
  "/images/home-header-bg.png",
  "/images/contact.jpg",
  "/images/trophy-boy.jpg",
  "/images/results.jpg",
];

export const visuals = [
  "/images/blvsig.png",
  "/images/contact.jpg",
  "/images/trophy-boy.jpg",
  "/images/home-header-bg.png",
  "/images/results.jpg",
  "/images/trials.png",
  "/images/results.jpg",
];

export const teams = [
  {
    id: "f7dccbf7-d187-465d-918f-7760444e839c",
    shortName: "blfa",
    longName: "beyond limits fa",
    logo: "/images/beyondimitslogo.png",
    isBeyondLimits: true,
    stadium: "Remo stars stadium",
  },
  {
    id: "07b1ea51-73a7-41eb-aae1-9dff2500d50a",
    shortName: "imfc",
    longName: "imperial fc",
    logo: "/images/imperial_fc.png",
    isBeyondLimits: false,
    stadium: "surulere stadium",
  },
  {
    id: "8bc32940-d9a7-43c4-8af9-7313a7d8b9c1",
    shortName: "gfc",
    longName: "gbagada fc",
    logo: "/images/gbagada_fc.png",
    isBeyondLimits: false,
    stadium: "gbagada stadium",
  },
  {
    id: "4cd32940-d9a7-43c4-4ac9-7313a7d8b9b2",
    shortName: "cc-u19",
    longName: "carrarese u19",
    logo: "/images/carrarese_u19.png",
    isBeyondLimits: false,
    stadium: "Stadio dei Marmi",
  },
  {
    id: "2cd32920-d9a7-33d4-4ac9-7213b7d8b9b2",
    shortName: "f-u19",
    longName: "fioretina u19",
    logo: "/images/fioretina_u19.png",
    isBeyondLimits: false,
    stadium: "Stadio Curva Fiesole - Viola Park",
  },
  {
    id: "2fd32420-d9b4-22c5-4ac9-7213b7d8b9b3",
    shortName: "cz-u19",
    longName: "crvena-zvezda u19",
    logo: "/images/crvena-zvezda_u19.png",
    isBeyondLimits: false,
    stadium: "Rajko Mitić - Jug veštačka trava 4",
  },
  {
    id: "2cd42420-d9b4-32c5-4ac9-7213b7d8b9b3",
    shortName: "a-u19",
    longName: "avellino u19",
    logo: "/images/avellino_u19.png",
    isBeyondLimits: false,
    stadium: "Stadio Partenio-Adriano Lombardi",
  },
  {
    id: "2cc42120-d9b4-32c5-4ad9-7214b7d8b9b3",
    shortName: "t-u19",
    longName: "torino u19",
    logo: "/images/torino_u19.png",
    isBeyondLimits: false,
    stadium: "Stadio Valentino Mazzola",
  },
  {
    id: "2dc52120-d9b4-32c5-4ad9-3214b4d8b9b3",
    shortName: "oc-u19",
    longName: "ojodu city u19",
    logo: "/images/ojodu-city_u19.png",
    isBeyondLimits: false,
    stadium: "Ojodu stadium",
  },
  {
    id: "2cc32121-d9b4-32c5-4ad9-3214b4d8b9b3",
    shortName: "b-u19",
    longName: "brazzaville u19",
    logo: "/images/brazzaville_u19.png",
    isBeyondLimits: false,
    stadium: "",
  },
];

const similar_attributes = [
  "tackles",
  "interceptions",
  "deuls_won",
  "blocks",
  "clearance",
];

export const player_positions = [
  {
    id: "4ddb4b61-3b45-44b5-b21b-4ab385b8eb94",
    shortName: "gk",
    longName: "goalkeeper",
    attributes: [
      "clean_sheat",
      "saves",
      "goals_conceded",
      "clearance",
      "successful_passes",
    ],
  },
  {
    id: "63650e97-8fcb-43ac-8e5a-3d1ca8904e38",
    shortName: "fb",
    longName: "fullback",
    attributes: [...similar_attributes, "crosses", "dribbles"],
  },
  {
    id: "7622d8ad-708f-4ddb-90b0-e30cec744e7f",
    shortName: "cb",
    longName: "central back",
    attributes: [...similar_attributes],
  },
  {
    id: "737aeebc-23c0-4811-8d65-3c42b6e5f25c",
    shortName: "dm",
    longName: "defensive midfielder",
    attributes: [...similar_attributes, "successful_passes"],
  },
  {
    id: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
    shortName: "cm",
    longName: "central midfielder",
    attributes: [
      ...similar_attributes,
      "successful_passes",
      "shots",
      "dribbles",
      "successful_dribbles",
    ],
  },
  {
    id: "ddbd8b40-892f-4e0a-9a0d-0c34584094c6",
    shortName: "am",
    longName: "attacking midfielder",
    attributes: [
      "passes",
      "successful_passes",
      "shots",
      "dribbles",
      "successful_dribbles",
      "crosses",
      "successful_crosses",
    ],
  },
  {
    id: "ee636c92-087b-457d-9418-dccd90423838",
    shortName: "w",
    longName: "winger",
    attributes: [
      "successful_passes",
      "shots",
      "dribbles",
      "successful_dribbles",
      "crosses",
      "successful_crosses",
    ],
  },
  {
    id: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
    shortName: "st",
    longName: "striker",
    attributes: ["shots", "shots_on", "dribbles", "attacking_duels_won"],
  },
];

export const players = [
  {
    id: "055d368e-3f4d-4d12-903b-e4aac2633993",
    firstname: "John",
    lastname: "Doe",
    positionId: "4ddb4b61-3b45-44b5-b21b-4ab385b8eb94",
    position: player_positions.find(
      (el) => el.id === "4ddb4b61-3b45-44b5-b21b-4ab385b8eb94"
    ),
    squadNo: 1,
    dob: "2007-3-10",
    height: 175,
    weight: 78,
    dominantFoot: Dominant_foot.RIGHT,
    isTwoFooted: true,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "2cc2934b-f7eb-47b5-af55-ecee0bbbe4a4",
    positionId: "737aeebc-23c0-4811-8d65-3c42b6e5f25c",
    position: player_positions.find(
      (el) => el.id === "737aeebc-23c0-4811-8d65-3c42b6e5f25c"
    ),
    squadNo: 4,
    firstname: "Seyi",
    lastname: "Olofin",
    dob: "2012-5-2",
    height: 180,
    weight: 81,
    dominantFoot: Dominant_foot.RIGHT,
    isTwoFooted: true,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "cc8586e3-b78c-4680-ad20-7fe25f5398fb",
    firstname: "Emeka",
    lastname: "Ojiofor",
    positionId: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
    position: player_positions.find(
      (el) => el.id === "cc3a4a86-a091-4099-be7a-2e1b061e330a"
    ),
    squadNo: 17,
    dob: "2008-5-10",
    height: 170,
    weight: 75,
    dominantFoot: Dominant_foot.LEFT,
    isTwoFooted: false,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "cb8586e3-b78c-4680-ad20-7fe25f5398fb",
    firstname: "Okpala",
    lastname: "Uche",
    positionId: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
    position: player_positions.find(
      (el) => el.id === "cc3a4a86-a091-4099-be7a-2e1b061e330a"
    ),
    squadNo: 18,
    dob: "2008-5-10",
    height: 168,
    weight: 74,
    dominantFoot: Dominant_foot.LEFT,
    isTwoFooted: false,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "2b4586e3-b78c-4680-ad20-7fe25f5398fb",
    firstname: "Olamilekan",
    lastname: "Adegoyega",
    positionId: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
    position: player_positions.find(
      (el) => el.id === "cc3a4a86-a091-4099-be7a-2e1b061e330a"
    ),
    squadNo: 17,
    dob: "2011-5-10",
    height: 172,
    weight: 80,
    dominantFoot: Dominant_foot.RIGHT,
    isTwoFooted: false,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "2c4584e3-c78c-2680-ad20-7fe25f5398fb",
    firstname: "Taiwo-Cole",
    lastname: "Oyetunde",
    positionId: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
    position: player_positions.find(
      (el) => el.id === "cc3a4a86-a091-4099-be7a-2e1b061e330a"
    ),
    squadNo: 15,
    dob: "2011-4-21",
    height: 175,
    weight: 75,
    dominantFoot: Dominant_foot.LEFT,
    isTwoFooted: false,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_17,
    status: Player_status.ACTIVE,
  },
  {
    id: "3bc2934b-f7eb-47b5-af55-ecee0bbbe4a4",
    positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
    position: player_positions.find(
      (el) => el.id === "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8"
    ),
    squadNo: 7,
    firstname: "Aiyenugba",
    lastname: "Daniel",
    dob: "2011-5-2",
    height: 170,
    weight: 82,
    dominantFoot: Dominant_foot.LEFT,
    isTwoFooted: true,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
    positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
    position: player_positions.find(
      (el) => el.id === "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8"
    ),
    squadNo: 9,
    firstname: "Aiyenugba",
    lastname: "Daniel",
    dob: "2011-5-2",
    height: 170,
    weight: 82,
    dominantFoot: Dominant_foot.RIGHT,
    isTwoFooted: true,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
  {
    id: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
    firstname: "Shina",
    lastname: "Ayodele",
    positionId: "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8",
    position: player_positions.find(
      (el) => el.id === "3bc2934b-f7eb-47b5-af55-ecee0bbbe6a8"
    ),
    squadNo: 8,
    dob: "2006-06-22",
    height: 175,
    weight: 75,
    dominantFoot: Dominant_foot.RIGHT,
    isTwoFooted: false,
    homeKit: "/images/player-1.png",
    awayKit: "/images/player-2.png",
    ageGroup: Age_group.UNDER_19,
    status: Player_status.ACTIVE,
  },
];

export const seasons = [
  {
    id: "2380576c-20d7-4d05-9a96-0735514f03fc",
    season: "2022/2023",
  },
  {
    id: "2380574c-20d9-4d05-9a96-0735514f03fc",
    season: "2023/2024",
  },
  {
    id: "2380576c-20d9-4d05-9a96-0735514f03fc",
    season: "2024/2025",
  },
];

export const competitions = [
  {
    id: "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45",
    shortName: "nnl",
    longName: "nigerian national league",
    logo: "/images/nnl.png",
    competitionType: Competition_type.LEAGUE,
  },
  {
    id: "bc5ae10f-1f1f-46b4-abe6-7fba3891fc45",
    shortName: "tccc",
    longName: "the creative championship league",
    logo: "/images/tccc.png",
    competitionType: Competition_type.LEAGUE,
  },
  {
    id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    shortName: "vc",
    longName: "Viareggio cup",
    logo: "/images/vc.png",
    competitionType: Competition_type.MIXEDCUP,
  },
];

export const standing = [
  {
    id: "f412b74a-e81b-491b-8ac3-15134192d0fd",
    league_id: "f7d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "f7dccbf7-d187-465d-918f-7760444e839c",
    position: 2,
    stats: {
      p: 12,
      w: 10,
      d: 2,
      l: 0,
      g: "15:10",
      gd: 5,
      pts: 32,
    },
  },
  {
    id: "1dc23f0e-0704-4457-94ca-ef6e1efda117",
    league_id: "f7d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "07b1ea51-73a7-41eb-aae1-9dff2500d50a",
    position: 1,
    stats: {
      p: 12,
      w: 11,
      d: 1,
      l: 0,
      g: "15:10",
      gd: 5,
      pts: 34,
    },
  },
  {
    id: "1dc23f0e-0704-4457-94ca-ef6e1efda117",
    league_id: "f7d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "8bc32940-d9a7-43c4-8af9-7313a7d8b9c1",
    position: 3,
    stats: {
      p: 12,
      w: 9,
      d: 1,
      l: 2,
      g: "14:9",
      gd: 5,
      pts: 28,
    },
  },
  {
    id: "2cc23f0e-1504-3427-94ca-bf6e1efda117",
    league_id: "b4d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "f7dccbf7-d187-465d-918f-7760444e839c",
    position: 1,
    stats: {
      p: 3,
      w: 3,
      d: 0,
      l: 0,
      g: "15:4",
      gd: 11,
      pts: 9,
    },
  },
  {
    id: "3dd13e0e-1504-2427-44ca-bf6e1efda117",
    league_id: "b4d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "2cd32920-d9a7-33d4-4ac9-7213b7d8b9b2",
    position: 2,
    stats: {
      p: 3,
      w: 2,
      d: 0,
      l: 1,
      g: "11:7",
      gd: 5,
      pts: 6,
    },
  },
  {
    id: "2cd13e0b-1504-2327-44ca-bf6e1efda117",
    league_id: "b4d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "4cd32940-d9a7-43c4-4ac9-7313a7d8b9b2",
    position: 4,
    stats: {
      p: 3,
      w: 0,
      d: 0,
      l: 3,
      g: "2:13",
      gd: -11,
      pts: 0,
    },
  },
  {
    id: "2bc13e0b-1504-2428-44ca-bf6e1efda117",
    league_id: "b4d227c5-ca5b-4f6c-844c-efe898960c3a",
    team_id: "2fd32420-d9b4-22c5-4ac9-7213b7d8b9b3",
    position: 3,
    stats: {
      p: 3,
      w: 1,
      d: 0,
      l: 2,
      g: "5:9",
      gd: -4,
      pts: 3,
    },
  },
];

export const leagues = [
  {
    id: "f7d227c5-ca5b-4f6c-844c-efe898960c3a",
    competition_id: "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45",
    competition: competitions.find(
      (compe) => compe.id === "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45"
    ),
    season_id: "2380576c-20d9-4d05-9a96-0735514f03fc",
    season: seasons.find(
      (el) => el.id === "2380576c-20d9-4d05-9a96-0735514f03fc"
    ),
    status: CompetitionStatus.pending,
  },
  {
    id: "b4d227c5-ca5b-4f6c-844c-efe898960c3a",
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),
    season_id: "2380576c-20d9-4d05-9a96-0735514f03fc",
    season: seasons.find(
      (el) => el.id === "2380576c-20d9-4d05-9a96-0735514f03fc"
    ),
    status: CompetitionStatus.completed,
  },
];

export const cups = [
  {
    id: "b2d227c5-ca5b-4f6c-844c-efe898960c2a",
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),
    season_id: "2380576c-20d9-4d05-9a96-0735514f03fc",
    season: seasons.find(
      (el) => el.id === "2380576c-20d9-4d05-9a96-0735514f03fc"
    ),
    status: CompetitionStatus.pending,
  },
];

export const mixed_cups = [
  {
    id: "2412b73a-e81b-451b-8ac3-15134192d0fd",
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",

    season_id: "2380576c-20d9-4d05-9a96-0735514f03fc",
    season: seasons.find(
      (el) => el.id === "2380576c-20d9-4d05-9a96-0735514f03fc"
    ),
    main: [
      "c42ae10f-1c1f-46b4-abe6-4bba3891fc43",
      "242be10f-1c1f-46b4-abe6-7fba3891fc45",
      "252ce10f-2c1f-46b4-abe6-7fba3891fc45",
    ],
    mainStatus: "completed",
    playOffs: [
      "232ce11f-2c1f-46b4-abe6-7fba3491cc45",
      "215ce12c-2c1f-43b4-abe6-7fba3891fc45",
      "223ce11c-2d1f-46c4-abe6-2fba3891fc45",
      "224ce11c-2d1f-46c4-abe6-2fba3891fc42",
    ],
  },
];

export const playOffs = [
  {
    id: "232be11f-2c1f-46b4-abe6-7fba3491cc42",
    cup_id: "b2d227c5-ca5b-4f6c-844c-efe898960c2a",
    round: "1/8 round",
    match_id: "232ce11f-2c1f-46b4-abe6-7fba3491cc45",
    match: "",
  },
  {
    id: "2c2be11f-2c1b-46b4-abe6-7fba3491cc42",
    cup_id: "b2d227c5-ca5b-4f6c-844c-efe898960c2a",
    round: "1/4 round",
    match_id: "215ce12c-2c1f-43b4-abe6-7fba3891fc45",
    match: "",
  },
  {
    id: "2b3be11f-2c1b-46b4-abe6-7fba3491cc42",
    cup_id: "b2d227c5-ca5b-4f6c-844c-efe898960c2a",
    round: "third place",
    match_id: "223ce11c-2d1f-46c4-abe6-2fba3891fc45",
    match: "",
  },
  {
    id: "2b3be11f-2c1b-46b4-abe6-7fba3491cc42",
    cup_id: "b2d227c5-ca5b-4f6c-844c-efe898960c2a",
    round: "final",
    match_id: "224ce11c-2d1f-46c4-abe6-2fba3891fc42",
    match: "",
  },
];

const getMatchTeam = (
  team_id: string,
  form: string,
  goals?: number,
  stats?: {
    passes: number;
    offsides: number;
    corners: number;
    shots: number;
    yellows: number;
    reds: number;
  },

  penalties?: number
) => {
  return {
    team_id: team_id,
    form,
    team: teams.find((el) => el.id === team_id),
    goals: goals || 0,
    stats: {
      passes: stats?.passes || 0,
      offsides: stats?.offsides || 0,
      corners: stats?.corners || 0,
      shots: stats?.shots || 0,
      yellows: stats?.yellows || 0,
      reds: stats?.reds || 0,
    },

    penalties: penalties,
  };
};

const lineup = {
  starters: players.slice(0, 11).map((el) => el.id),
  substitutes: players.slice(0, 5).map((el) => el.id),
  coach: {
    name: "Ogundeye godwin",
    role: "coach",
    image: "/images/coach.png",
  },
};

export const matches = [
  {
    id: "d55ae10f-1c1f-46b4-abe6-7fba3891fc45",
    round: "5",
    competition_id: "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45",
    competition: competitions.find(
      (compe) => compe.id === "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45"
    ),
    home: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w"),
    away: getMatchTeam("07b1ea51-73a7-41eb-aae1-9dff2500d50a", "w,l,d,l,w"),
    date: "2025-4-15",
    time: "10:00 am",
    venue: "remo stars stadium",
    status: MatchStatus.UPCOMING,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and imperifal fc is going to be tough",
      keyPlayer: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
      aboutKeyPlayer: "He is a cool boy",
    },
    report: {
      context: "",
      mvp: "",
      aboutMvp: "",
    },
    scorers: [],
  },
  {
    id: "c42ae10f-1c1f-46b4-abe6-7fba3891fc45",
    round: "6",
    competition_id: "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45",
    competition: competitions.find(
      (compe) => compe.id === "cd5ae10f-1f1f-46b4-abe6-7fba3891fc45"
    ),
    home: getMatchTeam("8bc32940-d9a7-43c4-8af9-7313a7d8b9c1", "w,w,d,w,w", 2, {
      passes: 23,
      offsides: 5,
      corners: 6,
      yellows: 5,
      reds: 0,
      shots: 13,
    }),
    away: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 4, {
      passes: 43,
      offsides: 5,
      corners: 14,
      yellows: 2,
      reds: 0,
      shots: 18,
    }),
    date: "2025-5-10",
    time: "9:30 am",
    venue: "Ifako stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.WIN,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "cc3a4a86-a091-4099-be7a-2e1b061e330a",
      aboutKeyPlayer: "He is a cool boy",
    },
    report: {
      context: "The match was a really tough one",
      mvp: "cb8586e3-b78c-4680-ad20-7fe25f5398fb",
      aboutMvp: "He played hsi heart out",
    },
    scorers: [
      {
        time: "23rd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Ajayi sogunde",
        assist: "Emmanuel Loel",
      },
      {
        time: "33rd",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Oju Larry",
        assist: "",
      },
      {
        time: "65th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Ajayi sogunde",
        assist: "Emmanuel Loel",
      },
    ],
  },
  // matches for viareggio
  {
    id: "c42ae10f-1c1f-46b4-abe6-4bba3891fc43",
    round: "1",
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),
    home: getMatchTeam("4cd32940-d9a7-43c4-4ac9-7313a7d8b9b2", "w,l,d,l,w", 0, {
      passes: 200,
      corners: 6,
      offsides: 5,
      yellows: 5,
      reds: 0,
      shots: 13,
    }),
    away: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 6, {
      passes: 243,
      offsides: 5,
      corners: 12,
      yellows: 2,
      reds: 0,
      shots: 18,
    }),
    date: "2024-02-12",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.WIN,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "1st",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "6th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Olamilekan Adegoyega",
        assist: "",
      },
      {
        time: "13th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "37th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "69th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Adebayo Dikko",
        assist: "",
      },
      {
        time: "82nd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Shina Ayodele",
        assist: "",
      },
    ],
  },
  {
    id: "242be10f-1c1f-46b4-abe6-7fba3891fc45",
    round: "2",
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),

    home: getMatchTeam("4cd32940-d9a7-43c4-4ac9-7313a7d8b9b2", "w,l,d,w,w", 0, {
      passes: 220,
      offsides: 5,
      corners: 2,
      yellows: 3,
      reds: 0,
      shots: 13,
    }),
    away: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 3, {
      passes: 343,
      offsides: 5,
      corners: 12,
      yellows: 0,
      reds: 0,
      shots: 14,
    }),
    date: "2024-02-14",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.WIN,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "63rd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "71st",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Olamilekan Adegoyega",
        assist: "",
      },
      {
        time: "83rd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
    ],
  },
  {
    id: "252ce10f-2c1f-46b4-abe6-7fba3891fc45",
    round: "3",
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),

    home: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 6, {
      passes: 420,
      offsides: 5,
      corners: 9,
      yellows: 4,
      reds: 0,
      shots: 22,
    }),
    away: getMatchTeam("2cd32920-d9a7-33d4-4ac9-7213b7d8b9b2", "w,w,d,w,w", 4, {
      passes: 243,
      offsides: 5,
      corners: 10,
      yellows: 2,
      reds: 0,
      shots: 18,
    }),
    date: "2024-02-16",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.WIN,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "4th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "6th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Olamilekan Adegoyega",
        assist: "",
      },
      {
        time: "11th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Isaac Chukwudi",
        assist: "",
      },
      {
        time: "38th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Giorgio Puzzoli",
        assist: "",
      },
      {
        time: "39th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Oliundare",
        assist: "",
      },
      {
        time: "50th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Oliundare",
        assist: "",
      },
      {
        time: "59th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "penalty",
        name: "Oliundare",
        assist: "",
      },
      {
        time: "61st",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "penalty",
        name: "Giorgio Puzzoli",
        assist: "",
      },
      {
        time: "78th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Stefano Maiorana",
        assist: "",
      },
      {
        time: "83rd",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Niccolo Generali",
        assist: "",
      },
    ],
  },
  {
    id: "232ce11f-2c1f-46b4-abe6-7fba3491cc45",
    round: Playoffs_round.ROUND8,
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),
    home: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 3, {
      passes: 320,
      offsides: 5,
      corners: 9,
      yellows: 2,
      reds: 0,
      shots: 15,
    }),
    away: getMatchTeam("2cd42420-d9b4-32c5-4ac9-7213b7d8b9b3", "w,w,d,l,w", 1, {
      passes: 243,
      offsides: 5,
      corners: 5,
      yellows: 4,
      reds: 0,
      shots: 10,
    }),
    date: "2024-02-20",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.WIN,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "18th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "own goal",
        name: "Alessandro Lanzone",
        assist: "",
      },
      {
        time: "54th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Isaac Chukwudi",
        assist: "",
      },
      {
        time: "60th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Francesco Palamara",
        assist: "",
      },
      {
        time: "93rd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Shina Ayodele",
        assist: "",
      },
    ],
  },
  {
    id: "215ce12c-2c1f-43b4-abe6-7fba3891fc45",
    round: Playoffs_round.QUATERFINALS,
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),

    home: getMatchTeam("2cc42120-d9b4-32c5-4ad9-7214b7d8b9b3", "w,w,d,w,w", 1, {
      passes: 320,
      offsides: 5,
      corners: 9,
      yellows: 2,
      reds: 0,
      shots: 6,
    }),
    away: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 2, {
      passes: 343,
      offsides: 5,
      corners: 12,
      yellows: 4,
      reds: 0,
      shots: 9,
    }),
    date: "2024-02-22",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.DRAW,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "7th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Simone Armocida",
        assist: "",
      },
      {
        time: "30th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Adebayo Dikko",
        assist: "",
      },
      {
        time: "54th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Shina Ayodele",
        assist: "",
      },
    ],
  },
  {
    id: "223ce11c-2d1f-46c4-abe6-2fba3891fc45",
    round: Playoffs_round.SEMIFINALS,
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),

    home: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 2, {
      passes: 370,
      offsides: 5,
      corners: 9,
      yellows: 2,
      reds: 0,
      shots: 6,
    }),
    away: getMatchTeam("2dc52120-d9b4-32c5-4ad9-3214b4d8b9b3", "w,w,d,w,w", 1, {
      passes: 323,
      offsides: 5,
      corners: 12,
      yellows: 4,
      reds: 0,
      shots: 9,
    }),
    date: "2024-02-24",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.LOSE,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2b4584d3-c78c-2480-ad20-7fe25f5398fb",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "3rd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "14th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Ibrahim",
        assist: "",
      },

      {
        time: "53rd",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Isaac Chukwudi",
        assist: "",
      },
    ],
  },
  {
    id: "224ce11c-2d1f-46c4-abe6-2fba3891fc42",
    round: Playoffs_round.FINALS,
    competition_id: "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42",
    competition: competitions.find(
      (compe) => compe.id === "bc3ae20f-1f1f-46b4-abe6-7fba3891fc42"
    ),

    home: getMatchTeam("f7dccbf7-d187-465d-918f-7760444e839c", "w,w,d,w,w", 2, {
      passes: 370,
      offsides: 5,
      corners: 12,
      yellows: 2,
      reds: 0,
      shots: 16,
    }),
    away: getMatchTeam("2cc32121-d9b4-32c5-4ad9-3214b4d8b9b3", "w,w,d,w,w", 0, {
      passes: 223,
      offsides: 5,
      corners: 12,
      yellows: 4,
      reds: 0,
      shots: 9,
    }),
    date: "2024-02-24",
    time: "3:00 pm",
    venue: "Italy stadium",
    status: MatchStatus.FINISHED,
    result: MatchResult.WIN,
    lineup: lineup.starters,
    substitutes: lineup.substitutes,
    coach: lineup.coach,
    preview: {
      context:
        "Match between beyon limits fa and gbagada fc is going to be tough",
      keyPlayer: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutKeyPlayer:
        "He is a joy to watch, i expect him to get some goals today",
    },
    report: {
      context: "It was a beautiful match which beautiful memories",
      mvp: "2cc2934b-f7bb-27c5-af35-ecee0bbbe4a4",
      aboutMvp: `He was a joy to watch. He bagged a hatrick and left with the match ball, 
      not only that he also left with the people's heart.`,
    },
    scorers: [
      {
        time: "18th",
        isOpponent: false,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "normal goal",
        name: "Kparobo Ariehri",
        assist: "",
      },
      {
        time: "27th",
        isOpponent: true,
        id: "'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'",
        goalType: "own goal",
        name: "Christian Gloire Mafoulou",
        assist: "",
      },
    ],
  },
];

export const socials = [
  {
    id: 21,
    link: "https://x.com/beyond_limitsfa?s=11&t=a_AA_bkBcHWDpD2WBldopQ",
    icon: "/images/pajamas_twitter.svg",
    name: "Twitter",
  },
  {
    id: 22,
    link: "https://www.instagram.com/beyondlimits_fa?igsh=MXdiM3gwaTBkNGd5Yg==",
    icon: "/images/bi_instagram.svg",
    name: "Twitter",
  },
  {
    id: 23,
    link: "https://x.com/beyond_limitsfa?s=11&t=a_AA_bkBcHWDpD2WBldopQ",
    icon: "/images/ph_tiktok-logo.svg",
    name: "Tiktok",
  },
  {
    id: 24,
    link: "https://youtube.com/@beyondlimitsfootballacadem7276?si=UrDiLOAy9c6j8jDM",
    icon: "/images/ant-design_youtube-outlined.svg",
    name: "Youtube",
  },
];

export const article_categories = [
  {
    id: "bb3a4a86-a091-4099-be7a-2e1b061e340c",
    name: "CLUB NEWS",
  },
  {
    id: "bb3a4a86-a091-4099-be7a-2e1b061e340b",
    name: "MATCH REPORT",
  },
  {
    id: "dd2a4a86-a091-4099-be7a-2e1b061e340b",
    name: "MATCH PREVIEW",
  },
];

export const articles = [
  {
    id: "cc3a4a86-a091-4099-be7a-2e1b061e340b",
    title:
      "Beyond Limits FA Earns Promotion to NNL After 4-0 Victory Over First Bank FC",
    createdAt: "2024-06-15",
    coverImage: "/images/winners.jpg",
    articleCategoryId: "bb3a4a86-a091-4099-be7a-2e1b061e340c",
    category: article_categories.find(
      (el) => el.id === "bb3a4a86-a091-4099-be7a-2e1b061e340c"
    ),
    content: {},
    tags: ["hello", "world"],
  },
  {
    id: "bc2a4a86-a091-4099-be7a-2e1b061e330a",
    articleCategoryId: "bb3a4a86-a091-4099-be7a-2e1b061e340b",
    category: article_categories.find(
      (el) => el.id === "bb3a4a86-a091-4099-be7a-2e1b061e340b"
    ),
    title:
      "Beyond Limits FA Stuns Imperial FC with Dramatic 2-1 Comeback in Season Opener",
    createdAt: "2024-06-01",
    coverImage: "/images/trophy-boy.jpg",
    match: matches.find(
      (el) => el.id === "d55ae10f-1c1f-46b4-abe6-7fba3891fc45"
    ),
    content: {},
    tags: ["hello", "world"],
  },
  {
    id: "cc3a4a86-a093-3099-be7a-2e1b061e331a",
    articleCategoryId: "bb3a4a86-a091-4099-be7a-2e1b061e340c",
    category: article_categories.find(
      (el) => el.id === "bb3a4a86-a091-4099-be7a-2e1b061e340c"
    ),
    title:
      "Academy Breaks Records with 10-Game Unbeaten Streak, Securing Place in NNL",
    createdAt: "2024-05-28",
    coverImage: "/images/results.jpg",
    content: {},
    tags: ["hello", "world"],
  },
  {
    id: "dd3a4a86-a091-4099-be7a-2e1b061e330a",
    articleCategoryId: "bb3a4a86-a091-4099-be7a-2e1b061e340c",
    category: article_categories.find(
      (el) => el.id === "bb3a4a86-a091-4099-be7a-2e1b061e340c"
    ),
    title:
      "End of Season Gala: Beyond Limits FA Celebrates Success with Players and Coaches",
    createdAt: "2024-05-20",
    coverImage: "/images/teamstats.jpg",
    content: {},
    tags: ["hello", "world"],
  },
  {
    id: "cc3a4a86-a091-4099-be7a-2e1b061e23ab",
    articleCategoryId: "bb3a4a86-a091-4099-be7a-2e1b061e340C",
    category: article_categories.find(
      (el) => el.id === "bb3a4a86-a091-4099-be7a-2e1b061e340c"
    ),
    title:
      "Beyond Limits Academy Wins Thrilling Cup Final Against Local Rivals in 3-2 Victory",
    createdAt: "2024-05-15",
    coverImage: "/images/honors.jpg",
    match: matches.find(
      (el) => el.id === "d55ae10f-1c1f-46b4-abe6-7fba3891fc45"
    ),
    content: {},
    tags: ["hello", "world"],
  },
  {
    id: "cc3a4a86-a091-2149-be7a-2e1b061e330c",
    articleCategoryId: "dd2a4a86-a091-4099-be7a-2e1b061e340b",
    category: article_categories.find(
      (el) => el.id === "dd2a4a86-a091-4099-be7a-2e1b061e340b"
    ),
    title:
      "Beyond Limits FA Stuns Imperial FC with Dramatic 2-1 Comeback in Season Opener",
    createdAt: "2024-06-01",
    coverImage: "/images/trophy-boy.jpg",
    match: matches.find(
      (el) => el.id === "d55ae10f-1c1f-46b4-abe6-7fba3891fc45"
    ),
    content: {},
    tags: ["hello", "world"],
  },
];

export const match_highlights = [
  {
    id: 12,
    title: "TCC 24|25 MD1 : BEYOND LIMITS FA VS IGANMU TIGERS",
    date: "2024-01-10",
    thumbnail: "/images/blvsig.png",
    videoUrl: "https://www.youtube.com/watch?v=oVy2zUmq1DA&t=2s",
  },
  {
    id: 13,
    title: "PRESEASON FRIENDLY MATCH: BLFA 2-1 BENDEL INSURANCE",
    date: "2024-01-05",
    thumbnail: "/images/keep.png",
    videoUrl: "https://www.youtube.com/watch?v=RvyFQolhGUg",
  },
  {
    id: 14,
    title: "GOTHIA CUP 2024: BEYOND LIMITS U17 Vs ROSENBORG U17",
    date: "2024-01-03",
    thumbnail: "/images/keep.png",
    videoUrl: "https://www.youtube.com/watch?v=xxfZcnZx5h0",
  },
  {
    id: 4,
    title: "TV Post 4",
    date: "2024-09-27",
    videoUrl: "https://www.youtube.com/watch?v=oVy2zUmq1DA",
    thumbnail: "/images/ongame.png",
  },
];

export const honors = [
  {
    id: "cc3a4a86-a092-2149-be7a-2e1b061e330c",
    competition: { short: "NNL", long: "Nigerian National League" },
    trophy: "/images/nnl-trophy.png",
    numbers_won: 1,
    years: [2024],
    article_id: 3,
  },
  {
    id: "cc3a4a86-a091-2149-be7a-2e1b061e330d",
    competition: { short: "VC", long: "Viareggio cup" },
    trophy: "/images/vc-trophy.png",
    numbers_won: 1,
    years: [2024],
    article_id: 3,
  },
  {
    id: "cc3a4a86-a041-2149-be7a-2e1b061e330c",
    competition: { short: "tccc", long: "The Creative Championship cup" },
    trophy: "/images/tccc-trophy.png",
    numbers_won: 1,
    years: [2023, 2024],
    article_id: 3,
  },
  {
    id: "cb3a4a86-a091-2149-be7a-2e1b061e330c",
    competition: { short: "tccl", long: "The Creative Championship league" },
    trophy: "/images/tccl-trophy.png",
    numbers_won: 1,
    years: [2024],
    article_id: 3,
  },
];
