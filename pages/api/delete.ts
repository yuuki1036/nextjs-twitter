import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSanity } from "lib/fetchSanity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const mutations = {
    mutations: [
      {
        delete: {
          query: "*[_type == 'tweet' || _type == 'comment']", // delete all
        },
      },
    ],
  };

  try {
    await fetchSanity(mutations);
  } catch (err) {
    console.error(err);
  }
  res.status(200).json("deleted!");
}
