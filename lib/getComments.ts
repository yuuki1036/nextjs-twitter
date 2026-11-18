import { TComment } from "type";
import { client } from "lib/sanityClient";
import groq from "groq";

const commentQuery = groq`
  *[_type == 'comment' && references(*[_type == 'tweet' && _id == $tweetId]._id)] {
  _id,
  ...
  } | order(_createdAt desc)
`;

export const getComments = async (tweetId: string): Promise<TComment[]> =>
  client.fetch(commentQuery, { tweetId });
