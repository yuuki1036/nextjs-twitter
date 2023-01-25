import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TTweet } from "type";
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import { fetchTweets } from "utils/fetchTweets";
import { toast } from "react-hot-toast";
import { Flipper } from "react-flip-toolkit";

type Props = {
  tweets: TTweet[];
};

const Feed: FC<Props> = ({ tweets: tweetsProp }) => {
  const [tweets, setTweets] = useState<TTweet[]>(tweetsProp);

  const getTweets = async () => {
    const tweets = await fetchTweets();
    setTweets(tweets);
    return Promise.resolve();
  };

  const handleRefresh = async () => {
    const promise = getTweets();
    toast.promise(promise, {
      loading: <b>更新中...</b>,
      success: <b>フィードを更新しました！</b>,
      error: <b>更新に失敗しました...</b>,
    });
  };

  return (
    <div className="col-span-8 md:col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className="sticky top-0 z-50 px-5 py-3 md:py-4 backdrop-blur-sm bg-white/80 flex items-center justify-between border-y border-gray-100">
        <h1 className=" text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="mr-3 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div>
        <TweetBox setTweets={setTweets} />
      </div>

      <div>
        <Flipper flipKey={tweets} spring="wobbly">
          {tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} setTweets={setTweets} />
          ))}
        </Flipper>
      </div>
    </div>
  );
};

export default Feed;
