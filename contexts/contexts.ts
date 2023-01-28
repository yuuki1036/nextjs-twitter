import { createContext, Dispatch, SetStateAction } from "react";
import { TTweet } from "type";

export const CommentModalContext = createContext(
  {} as {
    selectedTweet?: TTweet;
    handleOpen: (tweet: TTweet) => void;
    handleClose: () => void;
  }
);

export const FetchTweetContext = createContext(
  {} as {
    refreshFeed: () => void;
    setTweets: Dispatch<SetStateAction<TTweet[]>>;
  }
);
