import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TTweet, TTweetUpdateLikes } from "type";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

type Props = {
  tweet: TTweet;
};

type TMode = "inc" | "dec";

const Likes: FC<Props> = ({ tweet }) => {
  const { data: session } = useSession();
  const [count, setCount] = useState(tweet.likesCount);
  const [liked, setLiked] = useState<boolean>(
    !!session && tweet.likes.includes(session?.user?.name || "")
  );

  // username取得後に実行
  useEffect(() => {
    setLiked(!!session && tweet.likes.includes(session?.user?.name || ""));
  }, [session]);

  const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    let updateLikes = [...tweet.likes];
    let mode: TMode = liked ? "dec" : "inc";

    if (liked) {
      // decrement
      setLiked(!liked);
      setCount(count - 1);
      updateLikes = updateLikes.filter((userName) => userName !== userName);
    } else {
      // increment
      setLiked(!liked);
      setCount(count + 1);
      updateLikes.push(session?.user?.name || "");
    }

    const uniqueLikes = Array.from(new Set(updateLikes));

    const data: TTweetUpdateLikes = {
      id: tweet._id,
      likes: uniqueLikes,
      mode,
    };
    await fetch("/api/like", {
      body: JSON.stringify(data),
      method: "POST",
    });
  };

  return (
    <div
      onClick={handleClick}
      className="w-[4rem] flex items-center space-x-1 text-gray-400 cursor-pointer group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-out group-hover:text-like group-hover:bg-like/10">
        {liked ? (
          <SolidHeartIcon className="w-5 h-5 text-like" />
        ) : (
          <HeartIcon className="w-5 h-5" />
        )}
      </div>
      <p
        className={cn(
          "text-sm transition-all duration-200 ease-out group-hover:text-like",
          { "text-like": liked }
        )}
      >
        {count === 0 ? " " : count}
      </p>
    </div>
  );
};

export default Likes;
