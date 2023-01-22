import { TTweet } from "type";

export const fetchTweets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`);
  const data = await res.json();
  const tweets: TTweet[] = data.tweets;
  return tweets;
};
