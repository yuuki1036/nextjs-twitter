import React, { FC, useContext, useState } from "react";
import { TTweet } from "type";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { CommentModalContext } from "./Feed";

type Props = {
  tweet: TTweet;
};

const Comments: FC<Props> = ({ tweet }) => {
  const { handleOpen } = useContext(CommentModalContext);
  const [count, setCount] = useState(tweet.commentsCount);

  return (
    <div
      onClick={() => handleOpen(tweet)}
      className="w-[4rem] flex items-center space-x-1 text-gray-400 cursor-pointer group"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ease-out group-hover:text-comment group-hover:bg-comment/10">
        <ChatBubbleOvalLeftIcon className="w-5 h-5" />
      </div>
      <p className="text-sm transition-all duration-200 ease-out group-hover:text-comment">
        {count === 0 ? " " : count}
      </p>
    </div>
  );
};

export default Comments;
