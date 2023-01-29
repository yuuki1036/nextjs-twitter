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
    fetchNext: () => void;
    fetchRefresh: () => void;
    setTweets: Dispatch<SetStateAction<TTweet[]>>;
  }
);
