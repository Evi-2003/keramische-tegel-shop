import { MetadataRoute } from 'next';
import slugs from './data/slugs.csv';

type SitemapFile = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: "weekly" | "yearly" | "always" | "hourly" | "daily" | "monthly" | "never";
  priority?: number;
};

export default async function sitemap(): Promise<SitemapFile[]> {
  let productSlugs = slugs.flatMap(obj => Object.values(obj));
  const baseUrl = "https://dev.keramischetegelshop.nl";
  const urls = productSlugs.map((product) => ({
    url: `${baseUrl}/app/producten/${product}`,
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const additionalPages: SitemapFile[] = [
    {
      url: `${baseUrl}`,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/over-ons`,
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/klantenservice`,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/shop`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  return [...urls, ...additionalPages];
}
