import { FC, useRef } from "react";
import Script from "next/script";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// X の公式 widgets.js が window に置くオブジェクトのうち、ここで使う部分
type TTwttr = {
  widgets: {
    createTimeline: (
      source: { sourceType: "profile"; screenName: string },
      target: HTMLElement,
      options?: { height?: number }
    ) => Promise<HTMLElement | undefined>;
  };
};

declare global {
  interface Window {
    twttr?: TTwttr;
  }
}

const Widgets: FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // widgets.js の読み込み後と、再マウントのたびに呼ばれる
  const createTimeline = () => {
    const target = timelineRef.current;
    const twttr = window.twttr;
    if (!target || !twttr?.widgets) return;
    target.replaceChildren();
    twttr.widgets.createTimeline(
      { sourceType: "profile", screenName: "twitter" },
      target,
      { height: 700 }
    );
  };

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
        <div ref={timelineRef} />
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onReady={createTimeline}
        />
      </div>
    </div>
  );
};

export default Widgets;
