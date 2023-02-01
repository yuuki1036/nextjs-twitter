import { FC, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { GUEST_IMAGE_PATH } from "lib/constants";

const MobileMenu: FC = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    setImage(session?.user?.image || GUEST_IMAGE_PATH);
  }, []);

  return (
    <div className="fixed bottom-5 right-4 z-50 md:hidden">
      <picture>
        <img
          onClick={() => (session ? signOut() : signIn())}
          className="w-[3.2rem] h-[3.2rem] rounded-full border-gray-300 border-2 cursor-pointer"
          src={image}
          alt="user image"
        />
      </picture>
    </div>
  );
};

export default MobileMenu;
