import React, {
  CSSProperties,
  Dispatch,
  FC,
  forwardRef,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { TComment, TCommentBody, TTweet, TTweetBody } from "type";
import { fetchComments } from "utils/fetchComments";
import ReactTimeago from "react-timeago";
import { toast } from "react-hot-toast";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import Likes from "./Likes";
import Retweets from "./Retweets";
import { Flipped } from "react-flip-toolkit";
import { GUEST_IMAGE_PATH, GUEST_NAME } from "lib/constants";
import CommentsModal from "./CommentsModal";
import { CommentModalContext } from "./Feed";

type Props = {
  tweet: TTweet;
};

const modalStyle: CSSProperties = {
  backgroundColor: "#fff",
  padding: "60px 100px",
  borderRadius: "10px",
};

const Comments: FC<Props> = ({ tweet }) => {
  const { handleOpen, handleClose } = useContext(CommentModalContext);
  const [count, setCount] = useState(tweet.commentsCount);

  return (
    <div
      onClick={() => handleOpen(tweet._id)}
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
