import { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import MobileMenuRow from "./MobileMenuRow";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const MobileMenu: FC = () => {
  const { data: session } = useSession();

  return (
    <div className="sticky bottom-0 z-50 w-screen h-[3.2rem] bg-white md:hidden">
      <hr className="bg-gray-50" />
      <div className="h-full flex items-center justify-between px-6">
        <Link href="/">
          <MobileMenuRow Icon={HomeIcon} />
        </Link>
        <MobileMenuRow Icon={MagnifyingGlassIcon} />
        <MobileMenuRow Icon={BellIcon} />
        <MobileMenuRow Icon={UserIcon} onClick={session ? signOut : signIn} />
      </div>
    </div>
  );
};

export default MobileMenu;
