import { TAddRetweetRequest } from "type";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSanity } from "lib/fetchSanity";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TAddRetweetRequest = JSON.parse(req.body);

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
          commentsCount: 0,
          likesCount: 0,
          likes: [],
          retweetsCount: 0,
          retweets: [],
        },
      },
      {
        patch: {
          id: data.refId,
          set: {
            retweets: data.refRetweets,
          },
          inc: {
            retweetsCount: 1,
          },
        },
      },
    ],
  };

  try {
    await fetchSanity(mutations);
  } catch (err) {
    console.error(err);
  }
  res.status(200).json({ message: "complete" });
}
