import type { NextApiRequest, NextApiResponse } from "next";
import { MUTATE_END_POINT } from "lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mutations = {
    mutations: [
      {
        delete: {
          query: "*[_type == 'tweet' || _type == 'comment']",
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
