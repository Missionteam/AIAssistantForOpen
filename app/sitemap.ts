import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://precedent.dev",
      lastModified: new Date(),
    },
    {
      url: "https://precedent.dev/user1",
      lastModified: new Date(),
    },
    {
      url: "https://precedent.dev/user2",
      lastModified: new Date(),
    },
    // 他のユーザーURLを追加...
  ];
}