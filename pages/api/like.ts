import { TUpdateLikesRequest } from "type";
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSanity } from "lib/fetchSanity";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TUpdateLikesRequest = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        patch: {
          id: data.id,
          set: {
            likes: data.likes,
          },
          [data.mode]: {
            // inc or dec
            likesCount: 1,
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
