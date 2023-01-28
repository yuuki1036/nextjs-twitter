import React, { FC } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const MobileMenu: FC = () => {
  return (
    <div className="fixed bottom-0 z-50 w-screen h-[3.4rem] bg-white md:hidden">
      <hr className="bg-gray-50" />
      <div className="h-full flex items-center justify-between px-6">
        <Link href="/">
          <div className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full">
            <HomeIcon className="w-7 h-7" />
          </div>
        </Link>
        <div className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full">
          <MagnifyingGlassIcon className="w-7 h-7" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full">
          <BellIcon className="w-7 h-7" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-full">
          <EnvelopeIcon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
