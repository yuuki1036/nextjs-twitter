import { FC, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TlastCreatedAt, TTweet } from "type";
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

type Props = {
  tweets: TTweet[];
  lastCreatedAt: TlastCreatedAt;
};

const Feed: FC<Props> = ({
  tweets: tweetsProp,
  lastCreatedAt: lastCreatedAtProp,
}) => {
  const [tweets, setTweets] = useState<TTweet[]>(tweetsProp);
  const [lastCreatedAt, setLastCreatedAt] =
    useState<TlastCreatedAt>(lastCreatedAtProp);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedTweet, setSelectedTweet] = useState<TTweet | undefined>(
    undefined
  );
  console.log(lastCreatedAt);

  // CommentModalで使用
  const handleOpen = (tweet: TTweet) => {
    setSelectedTweet(tweet);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  // feed更新
  const refreshFeed = async () => {
    const { tweets: newTweets, lastCreatedAt: newLastCreatedAt } =
      await fetchTweets(lastCreatedAt);
    setTweets([...tweets, ...newTweets]);
    setLastCreatedAt(newLastCreatedAt);
    console.log(lastCreatedAt);
    return Promise.resolve();
  };
  const handleRefresh = async () => {
    const promise = refreshFeed();
    toast.promise(promise, {
      loading: <b>更新中...</b>,
      success: <b>フィードを更新しました！</b>,
      error: <b>更新に失敗しました...</b>,
    });
  };

  return (
    <FetchTweetContext.Provider value={{ refreshFeed, setTweets }}>
      <CommentModalContext.Provider
        value={{ selectedTweet, handleOpen, handleClose }}
      >
        <div className="col-span-9 md:col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
          <InfiniteScroll
            pageStart={0}
            loadMore={refreshFeed}
            useWindow={false}
            hasMore={true}
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
              <TweetBox setTweets={setTweets} />
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
