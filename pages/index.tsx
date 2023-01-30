import { TTweet } from "type";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Sidebar from "components/Sidebar";
import Feed from "components/Feed";
import Widgets from "components/Widgets";
import MobileMenu from "components/MobileMenu";
import { fetchTweets } from "utils/fetchTweets";
import { Toaster } from "react-hot-toast";
import cn from "classnames";

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
      <div
        className={cn("fixed w-screen h-screen z-50", {
          hidden: status !== "loading",
        })}
      ></div>
      <main className="mx-auto lg:max-w-6xl max-h-screen overflow-hidden">
        <div className="grid grid-cols-9">
          <Sidebar />
          <Feed tweets={tweets} />
          <Widgets />
          <MobileMenu />
        </div>
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
