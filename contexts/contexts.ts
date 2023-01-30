import { TTweet } from "type";
import { createContext } from "react";

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
    fetchUpdate: () => void;
    fetchRefresh: () => void;
  }
);
