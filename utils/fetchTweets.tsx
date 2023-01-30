import { TFetchMode, TTweet } from "type";

export const fetchTweets = async (
  mode: TFetchMode = "init",
  tweets: TTweet[] = []
) => {
  const _Date = new Date();
  const length = tweets.length;
  const latest = length > 0 ? tweets[0]._createdAt : _Date.toISOString();
  const oldest = length > 0 ? tweets[length - 1]._createdAt : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets?mode=${mode}&latest=${latest}&oldest=${oldest}`
  );
  const data = await res.json();
  const _tweets: TTweet[] = data.tweets;
  return { tweets: _tweets };
};
