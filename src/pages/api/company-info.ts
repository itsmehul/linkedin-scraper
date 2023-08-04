// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import scrape from "@/features/scraper/linkedinScraper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  aboutUs: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { aboutUs } = await scrape(req.query.companyName as string);
  res.status(200).json({ aboutUs });
}
