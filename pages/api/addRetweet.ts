import type { NextApiRequest, NextApiResponse } from "next";
import { mutateEndpoint } from "lib/constants";
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
          tweetType: "retweet",
          text: data.text,
          username: data.username,
          blockTweet: false,
          profileImg: data.profileImg,
          image: data.image,
          retweeter: data.retweeter,
          likes: [],
          retweets: [],
        },
      },
    ],
  };

  const result = await fetch(mutateEndpoint, {
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
