import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { TTweet } from "type";
import { client } from "sanity";

const feedQuery = groq`
*[_type == 'tweet' && !blockTweet] {
  _id,
    ...
} | order(_createdAt desc)
`;

type Data = {
  tweets: TTweet[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: TTweet[] = await client.fetch(feedQuery);
  res.status(200).json({ tweets });
}
