import { signIn, signOut, useSession } from "next-auth/react";
import SidebarRow from "./SidebarRow";

import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  QueueListIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "public/logo.png";
import Link from "next/link";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden md:block col-span-1 md:col-span-2 flex flex-col items-center px-4 md:items-start  ">
      <Link href="/">
        <Image
          alt="Hitokoto"
          src={logo}
          width={40}
          height={40}
          className="w-11 h-11 p-[0.35rem] m-3"
        />
      </Link>

      <Link href="/">
        <SidebarRow Icon={HomeIcon} title="Home" />
      </Link>
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={QueueListIcon} title="Lists" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
      />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
};

export default Sidebar;
