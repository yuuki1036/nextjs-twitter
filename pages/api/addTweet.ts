import type { NextApiRequest, NextApiResponse } from "next";
import { MUTATE_END_POINT } from "lib/constants";
import { TTweetBody } from "type";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TTweetBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: "tweet",
          tweetType: "tweet",
          text: data.text,
          username: data.username,
          blockTweet: false,
          profileImg: data.profileImg,
          image: data.image,
          retweeter: "",
          likesCount: 0,
          likes: [],
          retweetsCount: 0,
          retweets: [],
        },
      },
    ],
  };

  const result = await fetch(MUTATE_END_POINT, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: "POST",
  });

  const json = await result.json();
  res.status(200).json({ message: "complete" });
}
