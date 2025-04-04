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
