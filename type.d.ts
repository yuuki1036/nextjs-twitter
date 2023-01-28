export type TTweetBody = {
  text: string;
  username: string;
  profileImg: string;
  image: string;
  retweeter: string;
};

export interface TTweet extends TTweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  tweetType: "tweet" | "retweet";
  blockTweet: boolean;
  commentsCount: number;
  likesCount: number;
  likes: string[];
  retweetsCount: number;
  retweets: string[];
}

export type TUpdateLikesRequest = {
  id: string;
  likes: string[];
  mode: "inc" | "dec";
};

export interface TAddRetweetRequest extends TTweetBody {
  refId: string;
  refRetweets: string[];
}

export interface TComment extends TCommentBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "comment";
  tweet: {
    _ref: string;
    _type: "reference";
  };
}

export type TCommentBody = {
  comment: string;
  tweetId: string;
  username: string;
  profileImg: string;
};
