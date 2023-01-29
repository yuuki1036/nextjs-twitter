import { TlastCreatedAt, TTweet } from "type";

export const fetchTweets = async (lastCreatedAt: TlastCreatedAt) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets?lastCreatedAt=${lastCreatedAt}`
  );
  const data = await res.json();
  const tweets: TTweet[] = data.tweets;
  const _lastCreatedAt: string = data.lastCreatedAt;
  return { tweets, lastCreatedAt: _lastCreatedAt };
};
