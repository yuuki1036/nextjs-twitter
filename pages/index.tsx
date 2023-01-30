import { TTweet } from "type";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { fetchTweets } from "utils/fetchTweets";
import { Toaster } from "react-hot-toast";
import Wrapper from "components/Wrapper";

type Props = {
  tweets: TTweet[];
};

const Home: NextPage<Props> = ({ tweets }) => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>ひとこと</title>
      </Head>
      <Toaster />
      <main className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
        {status === "loading" ? (
          <div className="fixed w-screen h-screen z-50"></div>
        ) : (
          <Wrapper tweets={tweets} />
        )}
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // initial fetch
  const { tweets } = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
