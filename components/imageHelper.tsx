export function image(path: string) {
  return `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${path}`;
}
