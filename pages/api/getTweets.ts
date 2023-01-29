import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { TFetchMode, TTweet } from "type";
import { client } from "sanity";

const initQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt <= $begin] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;
const nextQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt < $end] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;
const refreshQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt > $begin] | order(_createdAt desc) {
  _id,
    ...
}
`;

type TQuery = {
  mode: TFetchMode;
  begin: string;
  end: string;
};

type Data = {
  tweets: TTweet[];
  begin: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { mode, begin, end } = req.query as unknown as TQuery;
  let tweets: TTweet[] = [];
  switch (mode) {
    case "init":
      tweets = await client.fetch(initQuery, { begin });
      console.log("init", begin, "〜");
      break;
    case "next":
      tweets = await client.fetch(nextQuery, { end });
      console.log("next", end, "〜");
      break;
    case "refresh":
      tweets = await client.fetch(refreshQuery, { begin });
      console.log("refresh", "now 〜", begin);
      break;
  }
  const _Date = new Date();
  const updateBegin = mode === "refresh" ? _Date.toISOString() : begin;
  res.status(200).json({ tweets, begin: updateBegin });
}
