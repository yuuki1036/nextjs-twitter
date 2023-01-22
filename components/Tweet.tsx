import { useEffect, useState } from "react";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ReactTimeago from "react-timeago";
import { TComment, TTweet } from "type";
import { fetchComments } from "utils/fetchComments";

type Props = {
  tweet: TTweet;
};

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<TComment[]>([]);

  const refreshComments = async () => {
    const comments: TComment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="w-10 h-10 rounded-full"
          src={tweet.profileImg}
          alt={tweet.username}
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>

            <ReactTimeago
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p>{tweet.text}</p>

          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="tweet image"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleOvalLeftIcon className="w-5 h-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowPathRoundedSquareIcon className="w-5 h-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="w-5 h-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="w-5 h-5" />
        </div>
      </div>

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className=" relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                className="mt-2 h-7 w-7 rounded-full object-cover"
                src={comment.profileImg}
                alt={comment.username}
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <ReactTimeago
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tweet;
