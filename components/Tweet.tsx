import React, {
  Dispatch,
  FC,
  SetStateAction,
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
import Comments from "./Comments";

type Props = {
  tweet: TTweet;
  setTweets: Dispatch<SetStateAction<TTweet[]>>;
};

const Tweet: FC<Props> = ({ tweet, setTweets }) => {
  const { data: session } = useSession();
  // comment
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentBody: TCommentBody = {
      comment: input,
      username: session?.user?.name || GUEST_NAME,
      profileImg: session?.user?.image || GUEST_IMAGE_PATH,
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

    setInput("");
    setCommentBoxVisible(false);
  };

  return (
    <Flipped flipId={tweet._id}>
      <div className="flex flex-col border-y border-gray-100 px-5 py-4">
        {tweet.tweetType === "retweet" && (
          <div className="flex flex-row items-center mb-1 text-sm text-gray-500 font-bold">
            <ArrowPathRoundedSquareIcon className="w-4 h-4 ml-7" />
            <p className="ml-2">{tweet.retweeter}</p>
            <p className="">がもうひとこと！</p>
          </div>
        )}
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
              {tweet.username !== GUEST_NAME && (
                <p className="hidden text-sm text-gray-500 sm:inline">
                  @{tweet.username.replace(/\s+/g, "").toLowerCase()}
                </p>
              )}

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
          <Comments tweet={tweet} />
          <Retweets tweet={tweet} setTweets={setTweets} />
          <Likes tweet={tweet} />
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
    </Flipped>
  );
};

export default Tweet;
