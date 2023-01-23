import React, { useEffect, useState } from "react";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import ReactTimeago from "react-timeago";
import { TComment, TCommentBody, TTweet } from "type";
import { fetchComments } from "utils/fetchComments";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

type Props = {
  tweet: TTweet;
};

const Tweet = ({ tweet }: Props) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<TComment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const refreshComments = async () => {
    const comments: TComment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const postComment = async () => {
    const commentBody: TCommentBody = {
      comment: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "public/unknown-user.jpg",
      tweetId: tweet._id,
    };
    const result = await fetch("/api/addComment", {
      body: JSON.stringify(commentBody),
      method: "POST",
    });

    const json = await result.json();

    refreshComments();

    toast("Comment Posted", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment();

    setInput("");
    setCommentBoxVisible(false);
  };

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <picture>
          <img
            className="w-10 h-10 rounded-full"
            src={tweet.profileImg}
            alt={tweet.username}
          />
        </picture>

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
            <picture>
              <img
                className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
                src={tweet.image}
                alt="tweet image"
              />
            </picture>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
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

      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
          />
          <button
            type="submit"
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className=" relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <picture>
                <img
                  className="mt-2 h-7 w-7 rounded-full object-cover"
                  src={comment.profileImg}
                  alt={comment.username}
                />
              </picture>
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
