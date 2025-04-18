const formatDate = (date: string) => {
  const fmt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return fmt.format(new Date(date));
};

export default formatDate;
