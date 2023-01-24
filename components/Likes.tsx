import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TTweetUpdateLikes } from "type";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import CountUp from "react-countup";
import cn from "classnames";

type Props = {
  tweetId: string;
  likes: string[];
};

const Likes: FC<Props> = ({ tweetId, likes }) => {
  const { data: session } = useSession();
  const [count, setCount] = useState(likes.length);
  const [liked, setLiked] = useState<boolean>(
    likes.includes(session?.user?.name || "")
  );

  // wait until get username
  useEffect(() => {
    setLiked(likes.includes(session?.user?.name || ""));
  }, [session]);

  const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    let updateLikes = [...likes];

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

    const tweetBody: TTweetUpdateLikes = {
      id: tweetId,
      likes: uniqueLikes,
    };
    await fetch("/api/like", {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center space-x-3 text-gray-400"
    >
      {liked ? (
        <SolidHeartIcon className="w-5 h-5 text-like" />
      ) : (
        <HeartIcon className="w-5 h-5" />
      )}
      <p className={cn("text-sm", { "text-like": liked })}>
        <CountUp end={count} />
      </p>
    </div>
  );
};

export default Likes;
