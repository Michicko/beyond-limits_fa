import moment from "moment";
import { IMatch, Nullable } from "./definitions";
import { months } from "./placeholder-data";

interface IPlayer {
  id: string;
  firstname: string;
  lastname: string;
  squadNo: Nullable<number>;
  playerPosition: {
    id: string;
    longName: string;
    shortName: string;
  };
}

interface IPos {
  position: string;
  players: IPlayer[];
}

type Honor = {
  id: string;
  image: string;
  trophyName: string;
  articleId: string | null;
  competition: {
    competitionSeasons: {
      winner: {
        isBeyondLimits: boolean | null;
      } | null;
      season: string;
    }[];
  };
};

export const getObjectValue = <T extends Object>(
  obj: T,
  key: string | number | symbol
) => {
  return obj[key as keyof typeof obj];
};

export function getFirstLetter(str: string): string {
  return str
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word[0])
    .join("");
}

export const getDefaultSeason = (seasons: { id: string; season: string }[]) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const defaultSeason = seasons.find((el) =>
    el.season.includes(String(currentYear))
  )?.season;
  return defaultSeason || currentYear - 1 + "/" + currentYear;
};

export const isInAuthorizedGroup = (
  userGroups: any,
  authorizedGroups: string[]
) => {
  if (!userGroups || !authorizedGroups) return;
  const includesAny = (arr: any, values: string[]) =>
    values.some((v) => arr.includes(v));
  return includesAny(userGroups, authorizedGroups);
};

export const getButtonStatus = (
  entity: any,
  entityName: string,
  isPending: boolean
) => {
  return entity
    ? `${isPending ? `Updating ${entityName}` : `Update ${entityName}`}`
    : `${isPending ? `Creating ${entityName}` : `Create ${entityName}`}`;
};

export const formatDate = (date: string) => {
  const dateStr = moment(date);
  if (
    moment().diff(dateStr, "days") > 7 ||
    moment().diff(dateStr, "days") < -7
  ) {
    return dateStr.format("MMM D, YYYY");
  }
  return dateStr.startOf("minutes").fromNow();
};

export const formatTime = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
  return `${hour12}:${minute.toString().padStart(2, "0")} ${suffix}`;
};

export const playOffsLabels = [
  { value: "QUALIFIERS", label: "qualifiers" },
  { value: "FINALS_128", label: "1/128-finals" },
  { value: "FINALS_64", label: "1/64-finals" },
  { value: "FINALS_32", label: "1/32-finals" },
  { value: "FINALS_16", label: "1/16-finals" },
  { value: "FINALS_8", label: "1/8-finals" },
  { value: "QUARTER_FINALS", label: "quater-finals" },
  { value: "SEMI_FINALS", label: "semi-finals" },
  { value: "FINALS", label: "final" },
];

export const getPlayOffRoundName = (value: string) => {
  const plf = playOffsLabels.find((el) => el.value === value);
  return plf?.label;
};

type SortableObject = { [key: string]: any };

export const sortArray = <T extends SortableObject>(
  array: T[],
  key: keyof T
): T[] => {
  return array.sort((a, b) => {
    // Check if the key exists in both objects
    if (a[key] === undefined || b[key] === undefined) {
      return 0; // Treat as equal if either key is missing
    }

    // Compare values (handles both strings and numbers)
    if (a[key] > b[key]) return 1;
    if (a[key] < b[key]) return -1;
    return 0; // Values are equal
  });
};

export const objectToFormData = (obj: Record<string, any>): FormData => {
  const formData = new FormData();

  for (const key in obj) {
    if (obj[key] instanceof File) {
      formData.append(key, obj[key]);
    } else if (typeof obj[key] !== "object" || obj[key] === null) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
};

export function updateFormDataWithJSON(
  formData: FormData,
  data: Record<string, any>
) {
  const keys = [
    "review",
    "report",
    "lineup",
    "substitutes",
    "coach",
    "homeTeam",
    "awayTeam",
    "scorers",
  ];

  keys.forEach((key) => {
    formData.delete(key);
    formData.append(key, JSON.stringify(data[key]));
  });
}

export const getMatches = (
  matches: IMatch[],
  status: "UPCOMING" | "COMPLETED",
  param?: string
) => {
  return matches.filter((el) => {
    const date = new Date(el.date);
    const month = date.getUTCMonth();
    if (param) {
      return el.status === status && months.indexOf(param) === month;
    } else {
      return el.status === status;
    }
  });
};

export function formDataToObject<T = Record<string, any>>(
  formData: FormData
): T {
  const obj: Record<string, any> = {};

  Array.from(formData.entries()).forEach(([key, value]) => {
    obj[key] = typeof value === "string" ? value : value.name ?? value;
  });

  return obj as T;
}

export function clientPaginate<T>(
  items: T[],
  currentPage: number,
  limit: number
) {
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const paginatedItems = items.slice(start, end);
  const hasNextPage = end < items.length;

  return {
    paginatedItems,
    hasNextPage,
  };
}

const positions = [
  "goalkeeper",
  "fullback",
  "left back",
  "right back",
  "central back",
  "defensive midfielder",
  "central midfielder",
  "attacking midfielder",
  "winger",
  "attacker",
  "forward",
  "striker",
];

export const groupPlayersByPositions = (players: IPlayer[]) => {
  const position_rows: IPos[] = [];

  // group player by positions in p
  players.forEach((player) => {
    const pos = position_rows.find(
      (role) =>
        role.position.replace(/\s+/g, "").toLowerCase() ===
        player.playerPosition.longName.replace(/\s+/g, "").toLowerCase()
    );

    if (player.playerPosition) {
      if (!pos) {
        position_rows.push({
          position: player.playerPosition.longName,
          players: [player],
        });
      } else {
        pos.players.push(player);
      }
    }
  });

  // sort and filter positions according to available position group
  const playersByPositions = positions.map((el) => {
    const found_position = position_rows.find((col) => {
      return (
        el.replace(/\s+/g, "").toLowerCase() ===
        col.position.replace(/\s+/g, "").toLowerCase()
      );
    });
    if (!found_position) return;
    return found_position;
  });

  return playersByPositions;
};

export const removeImgBg = (src: string) => {
  return src.replace("/upload", "/upload/e_background_removal,f_auto,q_auto");
};

export const isLessThan24HoursAgo = (dateString: string) => {
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - inputDate.getTime();
  const hoursInMs = 24 * 60 * 60 * 1000;

  return diffInMs < hoursInMs;
};

export const getHonorsStats = (honors: Honor[]) => {
  return honors.reduce(
    (acc, honor) => {
      honor.competition.competitionSeasons.forEach((seasonObj) => {
        if (seasonObj.winner?.isBeyondLimits) {
          acc.numbersWon += 1;
          acc.seasonsWon.push(seasonObj.season);
        }
      });
      return acc;
    },
    {
      numbersWon: 0,
      seasonsWon: [] as string[],
    }
  );
};

export const appendMonthToLink = (link: string) => {
  const date = new Date();
  const month = date.getMonth();
  return `${link}?month=${months[month]}`;
};
