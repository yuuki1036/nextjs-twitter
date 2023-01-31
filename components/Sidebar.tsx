import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import SidebarRow from "./SidebarRow";
import logo from "public/logo.png";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  QueueListIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import { GUEST_IMAGE_PATH, GUEST_NAME } from "lib/constants";

const Sidebar: FC = () => {
  const { data: session } = useSession();
  const userImage = session?.user?.image || GUEST_IMAGE_PATH;

  return (
    <div className="hidden md:flex flex-col items-center col-span-1 h-screen overflow-y-scroll py-2 scrollbar-hide">
      <Link href="/">
        {/* app logo */}
        <div className="w-15 h-15 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:bg-twitter/20">
          <Image
            alt="ひとこと"
            src={logo}
            width={40}
            height={40}
            className="w-[3.2rem] h-[3.2rem] p-2"
          />
        </div>
      </Link>
      <div className="flex flex-col items-center justify-between h-screen space-y-5">
        {/* menu */}
        <div className="mt-1 flex flex-col space-y-1">
          <Link href="/">
            <SidebarRow Icon={HomeIcon} disabled={false} />
          </Link>
          <SidebarRow Icon={HashtagIcon} />
          <SidebarRow Icon={BellIcon} />
          <SidebarRow Icon={EnvelopeIcon} />
          <SidebarRow Icon={BookmarkIcon} />
          <SidebarRow Icon={QueueListIcon} />
          <SidebarRow
            Icon={UserIcon}
            onClick={session ? signOut : signIn}
            disabled={false}
          />
          <SidebarRow Icon={EllipsisHorizontalCircleIcon} />
        </div>
        {/* user icon */}
        <div className="">
          <picture>
            <img
              className="w-[3.7rem] h-[3.7rem] p-2 rounded-full object-cover"
              src={session?.user?.image || GUEST_IMAGE_PATH}
              alt="user image"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
