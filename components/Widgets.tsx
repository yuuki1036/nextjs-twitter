import { FC } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets: FC = () => {
  return (
    <div className="col-span-3 pl-5 pr-3 mt-4 hidden lg:inline">
      <div className="flex items-center space-x-2 rounded-xl bg-gray-100 px-3 py-2">
        <MagnifyingGlassIcon className="h-5 w-5 mt-[0.15rem] text-gray-400" />
        <input
          type="text"
          placeholder="ひとことをけんさく"
          className="flex-1 bg-transparent outline-none"
        />
      </div>
      <div className="mt-4">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="twitter"
          options={{ height: 700 }}
        />
      </div>
    </div>
  );
};

export default Widgets;
