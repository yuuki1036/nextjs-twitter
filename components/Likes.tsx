import { FC, useContext, useEffect, useState } from "react";
import { TTweet, TUpdateLikesRequest } from "type";
import { FetchTweetContext } from "contexts/contexts";
import { useSession } from "next-auth/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

type Props = {
  tweet: TTweet;
};

type TMode = "inc" | "dec";

const Likes: FC<Props> = ({ tweet }) => {
  const { data: session } = useSession();
  const { fetchRefresh } = useContext(FetchTweetContext);
  const [count, setCount] = useState(tweet.likesCount);
  const [liked, setLiked] = useState<boolean>(
    !!session && tweet.likes.includes(session?.user?.name || "")
  );

  useEffect(() => {
    setCount(tweet.likesCount);
  }, [tweet.likesCount]);

  const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    let updateLikes = [...tweet.likes];
    let mode: TMode = liked ? "dec" : "inc";

    if (liked) {
      // decrement
      setLiked(!liked);
      setCount((count) => count - 1);
      updateLikes = updateLikes.filter((userName) => userName !== userName);
    } else {
      // increment
      setLiked(!liked);
      setCount((count) => count + 1);
      updateLikes.push(session?.user?.name || "");
    }

    const uniqueLikes = Array.from(new Set(updateLikes));

    const data: TUpdateLikesRequest = {
      id: tweet._id,
      likes: uniqueLikes,
      mode,
    };
    await fetch("/api/like", {
      body: JSON.stringify(data),
      method: "POST",
    });
    // refresh feed
    fetchRefresh();
  };

  return (
    <div
      onClick={handleClick}
      className="w-[4rem] flex items-center md:space-x-1 text-gray-500 cursor-pointer group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-out group-hover:text-like group-hover:bg-like/10">
        {liked ? (
          <SolidHeartIcon className="w-4 h-4 md:w-5 md:h-5 text-like" />
        ) : (
          <HeartIcon className="w-4 h-4 md:w-5 md:h-5" />
        )}
      </div>
      <p
        className={cn(
          "text-xs md:text-sm transition-all duration-200 ease-out group-hover:text-like",
          { "text-like": liked }
        )}
      >
        {count === 0 ? " " : count}
      </p>
    </div>
  );
};

export default Likes;
