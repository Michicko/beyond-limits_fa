const calcWidth = (total: number, value: number) => {
  const width = Math.floor((value / total) * 100);
  return width;
};

export default calcWidth;
