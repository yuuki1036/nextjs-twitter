import { TFetchMode, TTweet } from "type";
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "sanity";
import { groq } from "next-sanity";

const initQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt <= $latest] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;
const nextQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt < $oldest] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;
const updateQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt > $latest] | order(_createdAt desc) {
  _id,
    ...
}
`;
const refreshQuery = groq`
*[_type == 'tweet' && !blockTweet && $latest >= _createdAt && _createdAt >= $oldest] | order(_createdAt desc) {
  _id,
    ...
}
`;

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
  let tweets: TTweet[] = [];
  switch (mode) {
    case "init": // first fetch when starting app
      tweets = await client.fetch(initQuery, { latest });
      console.log("initial fetch from", latest);
      break;
    case "next": // fetch next tweets
      tweets = await client.fetch(nextQuery, { oldest });
      console.log("next fetch after", oldest);
      break;
    case "update": // fetch only latest tweets
      tweets = await client.fetch(updateQuery, { latest });
      console.log("update fetch latest from", latest);
      break;
    case "refresh": // refresh tweets in feed
      tweets = await client.fetch(refreshQuery, { latest, oldest });
      console.log("refresh fetch between", latest, "~", oldest);
      break;
  }
  res.status(200).json({ tweets });
}
