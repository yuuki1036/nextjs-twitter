import React, { FC, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TTweet, TTweetBody, TAddRetweetRequest } from "type";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { fetchTweets } from "utils/fetchTweets";
import { toast } from "react-hot-toast";
import { GUEST_NAME } from "lib/constants";
import cn from "classnames";
import { FetchTweetContext } from "contexts/contexts";

type Props = {
  tweet: TTweet;
};

const Retweets: FC<Props> = ({ tweet }) => {
  const { data: session } = useSession();
  const { setTweets } = useContext(FetchTweetContext);
  const [count, setCount] = useState(tweet.retweetsCount);
  const [retweeted, setRetweeted] = useState<boolean>(
    !!session && tweet.retweets.includes(session?.user?.name || "")
  );
  useEffect(() => {
    setCount(tweet.retweetsCount);
  }, [tweet.retweetsCount]);

  const addRetweet = async () => {
    tweet.retweets.push(session?.user?.name || "");
    const uniqueRetweets = Array.from(new Set(tweet.retweets));

    const data: TAddRetweetRequest = {
      // add retweet
      text: tweet.text,
      username: tweet.username,
      profileImg: tweet.profileImg,
      image: tweet.image,
      retweeter: session?.user?.name || GUEST_NAME,
      // update reference tweet
      refId: tweet._id,
      refRetweets: uniqueRetweets,
    };
    await fetch("/api/retweet", {
      body: JSON.stringify(data),
      method: "POST",
    });

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    return Promise.resolve();
  };

  const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setRetweeted(true);
    setCount((count) => count + 1);
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
      className="w-[4rem] flex items-center md:space-x-1 text-gray-500 cursor-pointer group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-out group-hover:text-retweet group-hover:bg-retweet/10">
        <ArrowPathRoundedSquareIcon
          className={cn("w-4 h-4 md:w-5 md:h-5", { "text-retweet": retweeted })}
        />
      </div>
      <p
        className={cn(
          "text-xs md:text-sm transition-all duration-200 ease-out group-hover:text-retweet",
          { "text-retweet": retweeted }
        )}
      >
        {count === 0 ? "" : count}
      </p>
    </div>
  );
};

export default Retweets;
