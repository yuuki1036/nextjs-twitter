import { TFetchMode, TTweet } from "type";
import { client } from "lib/sanityClient";
import groq from "groq";

const initQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt <= $latest] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;
const nextQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt < $oldest] | order(_createdAt desc) [0...10] {
  _id,
    ...
}
`;
const updateQuery = groq`
*[_type == 'tweet' && !blockTweet && _createdAt > $latest] | order(_createdAt desc) {
  _id,
    ...
}
`;
const refreshQuery = groq`
*[_type == 'tweet' && !blockTweet && $latest >= _createdAt && _createdAt >= $oldest] | order(_createdAt desc) {
  _id,
    ...
}
`;

type TGetTweetsParams = {
  mode: TFetchMode;
  latest: string;
  oldest: string;
};

// API route（client から呼ぶ）と getServerSideProps（server で直接呼ぶ）の両方で使う
export const getTweets = async ({
  mode,
  latest,
  oldest,
}: TGetTweetsParams): Promise<TTweet[]> => {
  switch (mode) {
    case "init": // first fetch when starting app
      console.log("initial fetch from", latest);
      return client.fetch(initQuery, { latest });
    case "next": // fetch next tweets
      console.log("next fetch after", oldest);
      return client.fetch(nextQuery, { oldest });
    case "update": // fetch only latest tweets
      console.log("update fetch latest from", latest);
      return client.fetch(updateQuery, { latest });
    case "refresh": // refresh tweets in feed
      console.log("refresh fetch between", latest, "~", oldest);
      return client.fetch(refreshQuery, { latest, oldest });
    default:
      return [];
  }
};
