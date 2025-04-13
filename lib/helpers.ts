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
