import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TTweet } from "type";
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import { fetchTweets } from "utils/fetchTweets";
import { toast } from "react-hot-toast";

type Props = {
  tweets: TTweet[];
};

const Feed: FC<Props> = ({ tweets: tweetsProp }) => {
  const [tweets, settweets] = useState<TTweet[]>(tweetsProp);
  console.log(tweets);

  const handleRefresh = async () => {
    const refeshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    settweets(tweets);

    toast.success("Feed updated", {
      id: refeshToast,
    });
  };

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-3 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div>
        <TweetBox />
      </div>

      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
