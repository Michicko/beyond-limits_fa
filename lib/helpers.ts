import moment from "moment";

export const getObjectValue = <T extends Object>(
  obj: T,
  key: string | number | symbol
) => {
  return obj[key as keyof typeof obj];
};

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
  return moment(date).startOf("minutes").fromNow();
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
      // For file uploads
      formData.append(key, obj[key]);
    } else if (Array.isArray(obj[key])) {
      // Handle arrays (optional handling)
      obj[key].forEach((value: any, index: number) => {
        formData.append(`${key}[${index}]`, value);
      });
    } else {
      formData.append(key, obj[key]);
    }
  }

  return formData;
};
