const calcWidth = (total: number, value: number) => {
  const width = (value / total) * 100;
  return width;
};

export default calcWidth;
