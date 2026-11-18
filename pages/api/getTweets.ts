import { TFetchMode, TTweet } from "type";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTweets } from "lib/getTweets";

type TQuery = {
  mode: TFetchMode;
  latest: string;
  oldest: string;
};

type Data = {
  tweets: TTweet[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { mode, latest, oldest } = req.query as unknown as TQuery;
  const tweets = await getTweets({ mode, latest, oldest });
  res.status(200).json({ tweets });
}
