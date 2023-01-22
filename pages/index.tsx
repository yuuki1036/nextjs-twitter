import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Feed from "components/Feed";
import Widgets from "components/Widgets";
import { fetchTweets } from "utils/fetchTweets";
import { TTweet } from "type";
import { Toaster } from "react-hot-toast";

type Props = {
  tweets: TTweet[];
};

const Home: NextPage<Props> = ({ tweets }) => {
  return (
    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
      <Head>
        <title>HITOKOTO</title>
      </Head>
      <Toaster />
      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
