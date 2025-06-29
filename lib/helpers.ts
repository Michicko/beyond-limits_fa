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
  longName: string;
  trophyArticleId: string | null;
  competitionSeasons: {
    isWinner: Nullable<boolean>;
    season: string;
    status: "PENDING" | "COMPLETED" | null;
  }[];
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
  const dateStr = moment(date); // or moment(date) if already local

  if (
    moment().diff(dateStr, "days") > 7 ||
    moment().diff(dateStr, "days") < -7
  ) {
    return dateStr.local().format("MMM D, YYYY"); // display as local
  }

  return dateStr.local().startOf("minutes").fromNow(); // display relative time
};

export const formatTime = (time: string) => {
  return moment(time, "HH:mm").format("h:mm A");
};

export const formatDateTime = (date: string, time: string) => {
  // Combine date and time into full ISO-like datetime string
  // Example: date = "2025-06-02", time = "16:30"
  const combined = `${date}T${time}`;

  const dateTime = moment(combined);

  if (
    moment().diff(dateTime, "days") > 7 ||
    moment().diff(dateTime, "days") < -7
  ) {
    return dateTime.format("MMM D, YYYY");
  }

  return dateTime.startOf("minutes").fromNow();
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
  return matches
    .filter((el) => {
      const date = new Date(el.date);
      const month = date.getUTCMonth();
      if (param) {
        return el.status === status && months.indexOf(param) === month;
      } else {
        return el.status === status;
      }
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getFixturesResults = (
  matches: IMatch[],
  statuses: ("UPCOMING" | "COMPLETED")[] = ["UPCOMING", "COMPLETED"],
  monthParam?: string,
  yearParam?: number
) => {
  return matches
    .filter((el) => {
      const date = new Date(el.date);
      const matchStatus = statuses.includes(
        el.status as "UPCOMING" | "COMPLETED"
      );
      const matchMonth = monthParam
        ? months.indexOf(monthParam) === date.getUTCMonth()
        : true;
      const matchYear = yearParam ? date.getUTCFullYear() === yearParam : true;
      return matchStatus && matchMonth && matchYear;
    })
    .sort((a, b) => {
      // Sort UPCOMING before COMPLETED
      if (a.status !== b.status) {
        return a.status === "UPCOMING" ? -1 : 1;
      }
      // If same status, sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
};

export const getMatchesByDateRange = (
  matches: IMatch[],
  status: "UPCOMING" | "COMPLETED",
  startDate: Date,
  endDate: Date
) => {
  return matches.filter((el) => {
    const date = new Date(el.date);
    return el.status === status && date >= startDate && date < endDate;
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
  "defender",
  "fullback",
  "left back",
  "right back",
  "central back",
  "midfielder",
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
  const [year, month, day] = dateString.split("-").map(Number);

  // Add a time buffer (e.g. 12:00 noon) to reduce false negatives
  const inputDate = new Date(year, month - 1, day, 12, 0, 0);
  const now = new Date();

  const diffInMs = now.getTime() - inputDate.getTime();
  const hoursInMs = 24 * 60 * 60 * 1000;

  return diffInMs >= 0 && diffInMs < hoursInMs;
};

export const getHonorsStats = (honors: Honor[]) => {
  return honors.reduce(
    (acc, honor) => {
      honor.competitionSeasons.forEach((seasonObj) => {
        if (
          seasonObj.isWinner &&
          seasonObj.status === "COMPLETED" &&
          seasonObj.season &&
          seasonObj.season.trim() !== ""
        ) {
          acc.numbersWon += 1;
          acc.seasonsWon.push(seasonObj.season.split("/")[1]);
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
  const year = date.getUTCFullYear();
  return `${link}?month=${months[month]}&year=${year}`;
};

export const getCloudinaryPublicId = (url: string): string | null => {
  try {
    const parts = new URL(url).pathname.split("/");

    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) return null;

    // Start from the part right after "upload"
    const publicIdParts = parts.slice(uploadIndex + 1);

    // Remove version part if it matches the format v1234567890
    if (/^v\d+$/.test(publicIdParts[0])) {
      publicIdParts.shift();
    }

    const publicIdWithExt = publicIdParts.join("/");
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ""); // Remove file extension

    return publicId;
  } catch (err) {
    return null;
  }
};

export const getCloudinaryFilename = (url: string): string | null => {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)$/);
  return match ? match[1] : null;
};

export function sortByCreatedAt<T extends { createdAt: string | Date }>(
  list: T[]
): T[] {
  return [...list].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const getExpectedSeasonLabel = (
  seasonStartMonth: number,
  date: Date = new Date()
): string => {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (month >= seasonStartMonth) {
    return `${year}/${year + 1}`;
  } else {
    return `${year - 1}/${year}`;
  }
};

export const findCurrentSeason = (
  competitionSeasons: any[],
  referenceDate: Date = new Date(),
  selectedSeasonLabel?: string
) => {
  if (!competitionSeasons) return undefined;

  if (selectedSeasonLabel) {
    return competitionSeasons.find(
      (season) => season.season === selectedSeasonLabel
    );
  }

  // If only one season is available, return it regardless of its date
  if (competitionSeasons.length === 1) {
    return competitionSeasons[0];
  }

  return competitionSeasons?.find((season) => {
    const startMonthIndex = months.indexOf(season.seasonStartMonth); // assumes seasonStartMonth is a string
    if (startMonthIndex === -1) return false;

    const expectedLabel = getExpectedSeasonLabel(
      startMonthIndex,
      referenceDate
    );
    return season.season === expectedLabel;
  });
};

export function filterGroupedSeasonsByCurrent(
  competitionSeasons: any[]
): any[] {
  if (!competitionSeasons || competitionSeasons.length === 0) return [];

  const groupedByName: Record<string, any[]> = {};

  for (const season of competitionSeasons) {
    if (!groupedByName[season.name]) {
      groupedByName[season.name] = [];
    }
    groupedByName[season.name].push(season);
  }

  const filteredSeasons = Object.values(groupedByName).flatMap((group) => {
    if (group.length === 1) return group;

    const current = findCurrentSeason(group);
    return current ? [current] : []; // fallback could return group if needed
  });

  return filteredSeasons;
}

export function capitalize(str: string) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
