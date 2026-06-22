export function image(path?: string) {
  if (!path) return "/images/beyondimitslogo.png";

  // already full URL (Cloudinary or external)
  if (path.startsWith("http")) {
    if (path.includes("res.cloudinary.com")) {
      const fileName = path.split("/").pop();

      return fileName
        ? `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/images/${fileName}`
        : "/images/beyondimitslogo.png";
    }

    return path;
  }

  // already S3 key
  return `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${path}`;
}
