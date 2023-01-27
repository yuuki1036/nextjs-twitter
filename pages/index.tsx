import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Feed from "components/Feed";
import Widgets from "components/Widgets";
import { fetchTweets } from "utils/fetchTweets";
import { TTweet } from "type";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";

type Props = {
  tweets: TTweet[];
};

const Home: NextPage<Props> = ({ tweets }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>HITOKOTO</title>
      </Head>
      <Toaster />
      {status === "loading" ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <main className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
          <div className="grid grid-cols-9">
            <Sidebar />
            <Feed tweets={tweets} />
            <Widgets />
          </div>
        </main>
      )}
    </>
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
