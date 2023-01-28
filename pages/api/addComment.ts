import type { NextApiRequest, NextApiResponse } from "next";
import { TCommentBody } from "type";
import { fetchSanity } from "lib/fetchSanity";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TCommentBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: "comment",
          comment: data.comment,
          username: data.username,
          profileImg: data.profileImg,
          tweet: {
            _type: "reference",
            _ref: data.tweetId,
          },
        },
      },
      {
        patch: {
          id: data.tweetId,
          inc: {
            commentsCount: 1,
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
