import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { TlastCreatedAt, TTweet } from "type";
import { client } from "sanity";

const feedQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt < $lastCreatedAt] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;

type Data = {
  tweets: TTweet[];
  lastCreatedAt: TlastCreatedAt;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { lastCreatedAt } = req.query;
  const tweets: TTweet[] = await client.fetch(feedQuery, { lastCreatedAt });
  const _lastCreatedAt: TlastCreatedAt =
    tweets.length > 0 ? tweets[tweets.length - 1]._createdAt : null;
  res.status(200).json({ tweets, lastCreatedAt: _lastCreatedAt });
}
