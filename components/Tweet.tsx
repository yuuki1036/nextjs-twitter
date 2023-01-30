import React, { FC } from "react";
import { TTweet } from "type";
import { GUEST_NAME } from "lib/constants";
import Likes from "./Likes";
import Retweets from "./Retweets";
import Comments from "./Comments";
import { Flipped } from "react-flip-toolkit";
import ReactTimeago from "react-timeago";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

type Props = {
  tweet: TTweet;
};

const Tweet: FC<Props> = ({ tweet }) => {
  return (
    <Flipped flipId={tweet._id}>
      <div className="flex flex-col border-y border-gray-100 px-4 md:px-5 pt-3 md:pt-4 pb-1 md:pb-2">
        {/* retweet status */}
        {tweet.tweetType === "retweet" && (
          <div className="flex flex-row items-center mb-[0.15rem] text-sm text-gray-500 font-bold">
            <ArrowPathRoundedSquareIcon className="w-4 h-4 ml-7" />
            <p className="ml-4">{tweet.retweeter}</p>
            <p className="">がもうひとこと！</p>
          </div>
        )}
        {/* tweet body */}
        <div className="flex space-x-3">
          <picture>
            <img
              className="w-12 h-12 md:w-12 md:h-12 rounded-full"
              src={tweet.profileImg}
              alt={tweet.username}
            />
          </picture>
          <div className="flex-1">
            <div className="flex items-end">
              <p className="mr-1 font-bold">{tweet.username}</p>
              {tweet.username !== GUEST_NAME ? (
                <p className="hidden text-sm text-gray-500 sm:inline">
                  @{tweet.username.replace(/\s+/g, "").toLowerCase()}&nbsp;
                  {"･"}
                </p>
              ) : (
                <span className="mr-1"></span>
              )}
              <ReactTimeago
                className="text-sm text-gray-500"
                date={tweet._createdAt}
              />
            </div>
            {/* tweet text */}
            <p className="mb-2 whitespace-pre-wrap">{`${tweet.text}`}</p>
            {/* tweet image */}
            {tweet.image && (
              <picture>
                <img
                  className="mt-3 ml-0 mb-2 w-full rounded-lg object-cover shadow-sm"
                  src={tweet.image}
                  alt="tweet image"
                />
              </picture>
            )}
          </div>
        </div>
        {/* tweet status */}
        <div className="flex justify-between pl-[3.2rem] md:pr-[4.5rem]">
          <Comments tweet={tweet} />
          <Retweets tweet={tweet} />
          <Likes tweet={tweet} />
          <div className="flex items-center space-x-3 text-gray-300">
            <ArrowUpTrayIcon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </div>
    </Flipped>
  );
};

export default Tweet;
