import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { TTweet, TTweetBody, TTweetUpdateRetweets } from "type";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { fetchTweets } from "utils/fetchTweets";
import { toast } from "react-hot-toast";
import { GUEST_NAME } from "lib/constants";
import cn from "classnames";

type Props = {
  tweet: TTweet;
  setTweets: Dispatch<SetStateAction<TTweet[]>>;
};

const Retweets: FC<Props> = ({ tweet, setTweets }) => {
  const { data: session } = useSession();
  const [count, setCount] = useState(tweet.retweetsCount);
  const [retweeted, setRetweeted] = useState<boolean>(
    !!session && tweet.retweets.includes(session?.user?.name || "")
  );

  const increaceRetweet = async () => {
    setRetweeted(true);
    setCount(count + 1);
    tweet.retweets.push(session?.user?.name || "");

    const uniqueRetweets = Array.from(new Set(tweet.retweets));

    const data: TTweetUpdateRetweets = {
      id: tweet._id,
      retweets: uniqueRetweets,
    };
    await fetch("/api/retweet", {
      body: JSON.stringify(data),
      method: "POST",
    });
  };

  const addRetweet = async () => {
    const data: TTweetBody = {
      text: tweet.text,
      username: tweet.username,
      profileImg: tweet.profileImg,
      image: tweet.image,
      retweeter: session?.user?.name || GUEST_NAME,
    };
    await fetch("/api/addRetweet", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    return Promise.resolve();
  };

  const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (retweeted) return;
    increaceRetweet();
    const promise = addRetweet();
    toast.promise(promise, {
      loading: <b>投稿中...</b>,
      success: <b>もうひとことしました！</b>,
      error: <b>投稿に失敗しました...</b>,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="w-[4rem] flex items-center space-x-1 text-gray-400 cursor-pointer group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-out group-hover:text-retweet group-hover:bg-retweet/10">
        <ArrowPathRoundedSquareIcon
          className={cn("w-5 h-5", { "text-retweet": retweeted })}
        />
      </div>
      <p
        className={cn(
          "text-sm transition-all duration-200 ease-out group-hover:text-retweet",
          { "text-retweet": retweeted }
        )}
      >
        {count === 0 ? "" : count}
      </p>
    </div>
  );
};

export default Retweets;
