const loaderProp = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const breakpoints = [320, 640, 1280];
  const closest = breakpoints.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
  );

  return `${src}?w=${closest}&q=${quality || 75}`;
};

export default loaderProp;
