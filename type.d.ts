export interface TTweet extends TTweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: boolean;
}

export type TTweetBody = {
  text: string;
  username: string;
  profileImg: string;
  image: string;
};
