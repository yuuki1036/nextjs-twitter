// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TTweet } from 'type'

type Data = {
  tweets: TTweet[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const 
  res.status(200).json({ name: 'John Doe' })
}
