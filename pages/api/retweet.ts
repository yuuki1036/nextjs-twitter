import type { NextApiRequest, NextApiResponse } from "next";
import { mutateEndpoint } from "lib/constants";
import { TTweetUpdateRetweets } from "type";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TTweetUpdateRetweets = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        patch: {
          id: data.id,
          set: {
            retweets: data.retweets,
          },
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
