import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TTweet } from "type";
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";

type Props = {
  tweets: TTweet[];
};

const Feed = ({ tweets }: Props) => {
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
        <h1 className="p-3 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
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
