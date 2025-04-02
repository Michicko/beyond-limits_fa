import { ReactNode } from "react";
import { JSONContent } from "@tiptap/react";

export interface IStackStyles {
  border: string;
  padding: string;
  borderRadius: string;
}

export interface ILabelStyles {
  color: string;
  alignSelf: string;
}

export interface ISocial {
  id: number;
  link: string;
  icon: string;
  name: string;
}

export interface IHighlight {
  id: number;
  title: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
}

export interface ILink {
  href: string;
  name: string;
}

export interface ICurrentMenu {
  id: number;
  icon: ReactNode;
  name: string;
  innerLinks: string[];
  subMenu: {
    id: number;
    link: string;
    name: string;
    image: string;
  }[];
  description: string;
}

interface IPlayerPosition {
  shortName: string;
  longName: string;
  attributes: string[];
  players?: IPlayer[];
}

export interface ITeam {
  id: string;
  shortName: string;
  longName: string;
  logo: string;
  isBeyondLimits: boolean;
  stadium?: string;
}

export interface IArticleCategory {
  id: string;
  name: string;
}

export interface IArticle {
  id: string;
  title: string;
  createdAt: string;
  article_category_id: string;
  coverImage: string;
  match?: IMatch;
  tags: string[];
  content: JSONContent | string;
  category?: IArticleCategory;
}

export interface ISeason {
  season: string;
  competitions?: ICompetition[];
}

export interface IHonor {
  competition_id: string;
  competition?: ICompetition;
  trophy_image: string;
  numbers_won: number;
  years_won: number[];
  article_id: string;
  article?: IArticle;
}

export enum CompetitionStatus {
  pending = "pending",
  completed = "completed",
}

export interface ILeague {
  id: string;
  competition_id: string;
  competition?: ICompetition;
  season_id: string;
  season?: ISeason;
  standing?: string[] | IStandingRow[];
  status: CompetitionStatus;
  winner?: ITeam;
}

export interface ICup {
  id: string;
  competition_id: string;
  competition?: ICompetition;
  season_id: string;
  season?: ISeason;
  playOffs?: string[] | IMatch[];
  status: CompetitionStatus;
  winner?: ITeam;
}

export interface IPlayOff {
  id: string;
  cup_id: string;
  round: string;
  match_id: string;
  match?: IMatch;
}

export enum Playoffs_round {
  ROUND32 = "1/32-final",
  ROUND16 = "1/16-final",
  ROUND8 = "1/8-final",
  QUATERFINALS = "QUATERFINAL",
  SEMIFINALS = "SEMIFINAL",
  THIRDPLACE = "THIRDPLACE",
  FINALS = "FINAL",
}

export interface IMixedCup {
  id: string;
  competition_id: string;
  competition?: ICompetition;
  season_id: string;
  season?: ISeason;
  league: ILeague;
  cup: ICup;
  winner?: ITeam;
}

export interface IStandingRow {
  league_id: string;
  team_id: string;
  position: number;
  stats: {
    p: number;
    w: number;
    d: number;
    l: number;
    g: string;
    gd: number;
    pts: number;
  };
}

export enum Competition_type {
  LEAGUE = "LEAGUE",
  CUP = "CUP",
  MIXEDCUP = "MIXEDCUP",
}

export interface ICompetition {
  id: string;
  short_name: string;
  long_name: string;
  logo: string;
  competition_type: Competition_type;
  matches?: IMatch[];
}

export enum MatchStatus {
  UPCOMING = "UPCOMING",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED",
  ABANDONED = "ABANDONED",
}

export enum MatchResult {
  WIN = "WIN",
  LOSE = "LOSE",
  DRAW = "DRAW",
}

interface IMatchStats {
  player_id: string;
  match_id: string;
  goals: number;
  assists: number;
  minutes_played: number;
}

export enum Dominant_foot {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum Age_group {
  UNDER_19 = "UNDER-19",
  UNDER_17 = "UNDER-17",
}

export enum Player_status {
  LOANED = "LOANED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  positionId: string;
  position?: IPlayerPosition;
  squadNo: number;
  dob: string;
  height: number;
  weight: number;
  dominantFoot: Dominant_foot;
  isTwoFooted: boolean;
  homeKit: string;
  awayKit: string;
  ageGroup: Age_group;
  status: Player_status;
}

interface IStaff {
  name: string;
  role: string;
  image: string;
}

interface ILineup {
  starters: IPlayer[];
  substitutes: IPlayer[];
  coach: IStaff;
}

// export enum GOAL_TYPE {
// 	PENALTY = "PENALTY",
// 	OWN_GOAL = "OWN GOAL",
// 	NORMAL_GOAL = "NORMAL GOAL",
// }

export interface IMatchScorer {
  id: string;
  name: string;
  time: string;
  goalType: string;
  isOpponent: boolean;
}

interface IMatchTeam {
  team_id: string;
  team?: ITeam;
  goals: number;
  stats: {
    passes: number;
    offsides: number;
    corners: number;
    shots: number;
    yellows: number;
    reds: number;
  };
  form: string;
  penalties?: number;
}

export interface IMatch {
  id?: string;
  round: string;
  competition_id: string;
  competition?: ICompetition;
  home: IMatchTeam;
  away: IMatchTeam;
  date: string;
  time: string;
  venue: string;
  status: MatchStatus;
  result?: MatchResult;
  lineup: string[];
  substitutes: string[];
  coach: {
    name: string;
    role: string;
  };
  preview: {
    context: JSONContent | string;
    keyPlayer?: string;
    aboutKeyPlayer: string;
  };
  report: {
    context: JSONContent | string;
    mvp?: string;
    aboutMvp: string;
  };
  scorers: IMatchScorer[];
}

export interface IMatchTeamForm {
  team: string;
  goals: string;
  stats: {
    passes: string;
    offsides: string;
    corners: string;
    shots: string;
    yellows: string;
    reds: string;
  };
  form: string;
  penalties: string;
}
