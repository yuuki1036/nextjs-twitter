import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { TTweet, TTweetBody, TTweetUpdateRetweets } from "type";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import CountUp from "react-countup";
import cn from "classnames";
import { fetchTweets } from "utils/fetchTweets";
import { toast } from "react-hot-toast";

type Props = {
  tweet: TTweet;
  setTweets: Dispatch<SetStateAction<TTweet[]>>;
};

const Retweets: FC<Props> = ({ tweet, setTweets }) => {
  const { data: session } = useSession();
  const [count, setCount] = useState(tweet.retweets.length);
  const [retweeted, setRetweeted] = useState<boolean>(
    tweet.retweets.includes(session?.user?.name || "")
  );

  // wait until get username
  useEffect(() => {
    setRetweeted(tweet.retweets.includes(session?.user?.name || ""));
  }, [session]);

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
      retweeter: session?.user?.name || "",
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
    const myPromise = addRetweet();
    toast.promise(myPromise, {
      loading: <b>投稿中...</b>,
      success: <b>もうひとことしました！</b>,
      error: <b>投稿に失敗しました...</b>,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center space-x-3 text-gray-400"
    >
      <ArrowPathRoundedSquareIcon
        className={cn("w-5 h-5", { "text-retweet": retweeted })}
      />
      <p className={cn("text-sm", { "text-retweet": retweeted })}>
        <CountUp end={count} />
      </p>
    </div>
  );
};

export default Retweets;
