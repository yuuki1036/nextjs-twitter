import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TFetchMode, TFetchQuery, TTweet } from "type";
import { CommentModalContext, FetchTweetContext } from "contexts/contexts";
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import { fetchTweets } from "utils/fetchTweets";
import CommentsModal from "./CommentsModal";
import { toast } from "react-hot-toast";
import { Flipper } from "react-flip-toolkit";
import Image from "next/image";
import logo from "public/logo.png";
import InfiniteScroll from "react-infinite-scroller";
import { RotatingLines } from "react-loader-spinner";

type Props = {
  tweets: TTweet[];
};

const Feed: FC<Props> = ({ tweets: tweetsProp }) => {
  const [tweets, setTweets] = useState<TTweet[]>(tweetsProp);
  // fetch status
  const [hasMore, setHasMore] = useState<boolean>(tweets.length > 10);
  // comment modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTweet, setSelectedTweet] = useState<TTweet | undefined>(
    undefined
  );

  // for CommentModalContext
  const handleOpen = (tweet: TTweet) => {
    setSelectedTweet(tweet);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  // fetch with scroll
  const fetchNext = async () => {
    if (!hasMore) return;
    const mode: TFetchMode = "next";
    const { tweets: _tweets } = await fetchTweets(mode, tweets);
    _tweets.length > 0 ? setTweets([...tweets, ..._tweets]) : setHasMore(false);
    return Promise.resolve();
  };
  // fetch latest tweets
  const fetchUpdate = async () => {
    const mode: TFetchMode = "update";
    const { tweets: _tweets } = await fetchTweets(mode, tweets);
    setTweets([..._tweets, ...tweets]);
    return Promise.resolve();
  };
  // refresh tweets
  const fetchRefresh = async () => {
    const mode: TFetchMode = "refresh";
    const { tweets: _tweets } = await fetchTweets(mode, tweets);
    setTweets([..._tweets]);
    return Promise.resolve();
  };

  // click reflesh button
  const handleRefresh = async () => {
    const promise = fetchRefresh();
    toast.promise(promise, {
      loading: <b>更新中...</b>,
      success: <b>フィードを更新しました！</b>,
      error: <b>更新に失敗しました...</b>,
    });
  };

  return (
    <FetchTweetContext.Provider
      value={{ fetchNext, fetchUpdate, fetchRefresh }}
    >
      <CommentModalContext.Provider
        value={{ selectedTweet, handleOpen, handleClose }}
      >
        <div className="col-span-9 md:col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
          <InfiniteScroll
            loadMore={fetchNext}
            hasMore={hasMore}
            useWindow={false}
            loader={
              <div
                key={0}
                className="w-full h-20 flex items-center justify-center"
              >
                <RotatingLines strokeColor="#00ADED" width="40" />
              </div>
            }
          >
            <div className="sticky top-0 z-10 px-4 md:px-5 py-3 md:py-4 backdrop-blur-sm bg-white/80 flex items-center justify-between border-y border-gray-100">
              <h1 className="text-xl font-bold hidden md:block">Home</h1>
              <Image
                alt="ひとこと"
                src={logo}
                width={40}
                height={40}
                className="w-7 h-7 md:hidden"
              />
              <ArrowPathIcon
                onClick={handleRefresh}
                className="mr-3 w-7 h-7 md:w-8 md:h-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
              />
            </div>
            <div>
              <TweetBox />
            </div>

            <div>
              <Flipper flipKey={tweets} spring="wobbly">
                {tweets.map((tweet) => (
                  <Tweet key={tweet._id} tweet={{ ...tweet }} />
                ))}
              </Flipper>
            </div>
            {modalOpen && <CommentsModal />}
          </InfiniteScroll>
        </div>
      </CommentModalContext.Provider>
    </FetchTweetContext.Provider>
  );
};

export default Feed;
