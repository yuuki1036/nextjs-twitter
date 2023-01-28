import React, { Dispatch, FC, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import { TTweet } from "type";
import ReactTimeago from "react-timeago";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Likes from "./Likes";
import Retweets from "./Retweets";
import { Flipped } from "react-flip-toolkit";
import { GUEST_NAME } from "lib/constants";
import Comments from "./Comments";

type Props = {
  tweet: TTweet;
};

const Tweet: FC<Props> = ({ tweet }) => {
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

            <p className="whitespace-pre-wrap">{`${tweet.text}`}</p>

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
          <Retweets tweet={tweet} />
          <Likes tweet={tweet} />
          <div className="flex items-center space-x-3 text-gray-400">
            <ArrowUpTrayIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Flipped>
  );
};

export default Tweet;
