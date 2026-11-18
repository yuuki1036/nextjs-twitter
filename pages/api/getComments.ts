import { TComment } from "type";
import type { NextApiRequest, NextApiResponse } from "next";
import { getComments } from "lib/getComments";

type Data = {
  comments: TComment[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query as { tweetId: string };
  const comments = await getComments(tweetId);
  res.status(200).json({ comments });
}
