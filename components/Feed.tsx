import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TFetchMode, TTweet } from "type";
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
import Link from "next/link";

type Props = {
  tweets: TTweet[];
};

const Feed: FC<Props> = ({ tweets: tweetsProp }) => {
  const [tweets, setTweets] = useState<TTweet[]>(tweetsProp);
  // scroll fetch status
  const [hasMore, setHasMore] = useState<boolean>(true);
  // for comment modal
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
    console.log("next...");
    const { tweets: _tweets } = await fetchTweets(mode, tweets);
    if (_tweets.length > 0) {
      // set tweets at the end
      setTweets([...tweets, ..._tweets]);
    } else {
      // fetched all tweets
      setHasMore(false);
    }
    return Promise.resolve();
  };

  // fetch latest tweets
  const fetchUpdate = async () => {
    const mode: TFetchMode = "update";
    console.log("update...");
    const { tweets: _tweets } = await fetchTweets(mode, tweets);
    // set tweets at the top
    setTweets([..._tweets, ...tweets]);
    return Promise.resolve();
  };

  // refresh tweets
  const fetchRefresh = async () => {
    const mode: TFetchMode = "refresh";
    console.log("refresh...");
    const { tweets: _tweets } = await fetchTweets(mode, tweets);
    // replace all tweets
    setTweets([..._tweets]);
    return Promise.resolve();
  };

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
        <div className="col-span-9 md:col-span-8 lg:col-span-5 border-x h-screen overflow-y-scroll scrollbar-hide">
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
            {/* top sticky area */}
            <div className="sticky top-0 z-10 px-4 md:px-5 py-3 md:py-4 backdrop-blur-sm bg-white/80 flex items-center justify-between border-y border-gray-100">
              <h1 className="text-xl font-bold hidden md:block">Home</h1>
              <Link href="/">
                <Image
                  alt="ひとこと"
                  src={logo}
                  width={40}
                  height={40}
                  className="w-7 h-7 md:hidden cursor-pointer"
                />
              </Link>
              <ArrowPathIcon
                onClick={handleRefresh}
                className="mr-3 w-7 h-7 md:w-8 md:h-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
              />
            </div>
            {/* tweet form */}
            <div>
              <TweetBox />
            </div>
            {/* fetched tweets */}
            <div>
              <Flipper flipKey={tweets} spring="wobbly">
                {tweets.map((tweet) => (
                  <Tweet key={tweet._id} tweet={{ ...tweet }} />
                ))}
              </Flipper>
            </div>
          </InfiniteScroll>
        </div>
        {/* comment modal window */}
        {modalOpen && <CommentsModal />}
      </CommentModalContext.Provider>
    </FetchTweetContext.Provider>
  );
};

export default Feed;
