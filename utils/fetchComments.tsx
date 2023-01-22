import { TComment } from "type";

export const fetchComments = async (tweetId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
  );
  const data = await res.json();
  const comments: TComment[] = data.comments;
  return comments;
};
