import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sweetlar.co.mz",
      lastModified: new Date(),
    },
  ];
}
