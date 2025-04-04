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
