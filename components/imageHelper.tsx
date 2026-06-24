export function image(path?: string) {
  if (!path) return "/images/beyondimitslogo.png";

  // already full URL (Cloudinary or external)
  if (path.startsWith("http")) {
    if (path.includes("res.cloudinary.com")) {
      let fileName = path.split("/").pop();

      fileName = fileName?.replace(/:/g, "_");

      return fileName
        ? `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/images/${fileName}`
        : "/images/beyondimitslogo.png";
    }

    return path;
  }

  // normalize legacy filenames
  const normalizedPath = path.replace(/:/g, "_");

  return `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${normalizedPath}`;
}
