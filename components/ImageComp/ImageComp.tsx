"use client";
import Image from "next/image";
import imageLoader from "@/lib/imageLoader";
import React from "react";

const ImageComp = ({
  image,
  alt,
  placeholder,
  priority,
}: {
  image: string;
  alt: string;
  priority?: boolean;
  placeholder?: string;
}) => {
  return (
    <Image
      src={image}
      fill={true}
      alt={alt || ""}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      loader={() => imageLoader({ src: image, width: 100, quality: 75 })}
      placeholder={"blur"}
      blurDataURL={placeholder || image}
      style={{ objectFit: "cover", objectPosition: "center" }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default ImageComp;
