import { FC } from "react";
import { TTweet } from "type";
import Feed from "./Feed";
import MobileMenu from "./MobileMenu";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

type Props = {
  tweets: TTweet[];
};

const Wrapper: FC<Props> = ({ tweets }) => {
  return (
    <>
      <div className="grid grid-cols-9 h-[calc(100vh-3.1rem)] md:h-screen">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </div>
      <MobileMenu />
    </>
  );
};

export default Wrapper;
