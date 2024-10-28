import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://from-a2b.fr",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://from-a2b.fr/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://from-a2b.fr/home",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
  ];
}
