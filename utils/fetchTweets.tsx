import { TFetchMode, TTweet } from "type";

type Props = {
  mode: TFetchMode;
  begin?: string;
  end?: string;
};

export const fetchTweets = async ({ mode, begin = "", end = "" }: Props) => {
  const _Date = new Date();

  switch (mode) {
    case "init":
      begin = _Date.toISOString();
      break;
    case "next":
      break;
    case "refresh":
      break;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets?mode=${mode}&begin=${begin}&end=${end}`
  );
  const data = await res.json();
  const tweets: TTweet[] = data.tweets;
  const _begin = data.begin;
  return { tweets, begin: _begin };
};
