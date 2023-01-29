import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Sidebar from "components/Sidebar";
import Feed from "components/Feed";
import Widgets from "components/Widgets";
import { fetchTweets } from "utils/fetchTweets";
import { TTweet } from "type";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import cn from "classnames";
import MobileMenu from "components/MobileMenu";

type Props = {
  tweets: TTweet[];
};

const Home: NextPage<Props> = ({ tweets }) => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>ひとこと</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
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
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
