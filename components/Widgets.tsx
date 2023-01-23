import { FC } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const Widgets: FC = () => {
  return (
    <div className="col-span-2 px-2 mt-2 hidden lg:inline">
      <div className="flex items-center space-x-2 rounded-full bg-gray-100 p-3 ">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Twitter"
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
