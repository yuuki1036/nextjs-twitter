import { TComment } from "type";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "sanity";
import { groq } from "next-sanity";

const commentQuery = groq`
  *[_type == 'comment' && references(*[_type == 'tweet' && _id == $tweetId]._id)] {
  _id,
  ...
  } | order(_createdAt desc)
`;

type Data = {
  comments: TComment[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query;
  const comments: TComment[] = await client.fetch(commentQuery, { tweetId });
  res.status(200).json({ comments });
}
