import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { TTweet, TTweetBody } from "type";
import { fetchTweets } from "utils/fetchTweets";
import { toast } from "react-hot-toast";
import {
  CalendarIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { GUEST_IMAGE_PATH, GUEST_NAME } from "lib/constants";
import TextareaAutosize from "react-textarea-autosize";
import { FetchTweetContext } from "contexts/contexts";

const TweetBox: FC = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || GUEST_NAME;
  const userImage = session?.user?.image || GUEST_IMAGE_PATH;

  const { fetchRefresh } = useContext(FetchTweetContext);

  // tweet input
  const [input, setInput] = useState<string>("");
  // tweet with image
  const [image, setImage] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isImageUrlBoxOpen, setIsImageUrlBoxOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setIsImageUrlBoxOpen(false);
  };

  const postTweet = async () => {
    const data: TTweetBody = {
      text: input,
      username: userName,
      profileImg: userImage,
      image: image,
      retweeter: "",
    };
    await fetch("/api/addTweet", {
      body: JSON.stringify(data),
      method: "POST",
    });
    // feed更新
    fetchRefresh();
    return Promise.resolve();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = postTweet();
    toast.promise(promise, {
      loading: <b>投稿中...</b>,
      success: <b>ひとことしました！</b>,
      error: <b>投稿に失敗しました...</b>,
    });

    setInput("");
    setImage("");
    setIsImageUrlBoxOpen(false);
  };

  return (
    <div className="flex px-4 py-4 md:px-5 space-x-1 md:space-x-2">
      <picture>
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={session?.user?.image || GUEST_IMAGE_PATH}
          alt={session?.user?.name || GUEST_NAME}
        />
      </picture>
      <div className="flex flex-1 items-center pl-2">
        <div className="flex flex-1 flex-col">
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              maxRows={10}
              minRows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="なにかひとことおねがいします..."
              className="mt-3 mb-2 md:mb-1 w-full outline-none md:placeholder:text-xl scrollbar-hide"
            />
            <div className="flex items-center">
              <div className="flex flex-1">
                <div
                  onClick={() => {
                    setIsImageUrlBoxOpen(!isImageUrlBoxOpen);
                  }}
                  className="flex items-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200 ease-out hover:bg-twitter/10"
                >
                  <PhotoIcon className="h-5 w-5 text-twitter mx-auto" />
                </div>
                <div className="flex items-center w-8 h-8">
                  <MagnifyingGlassIcon className="h-5 w-5 mx-auto text-gray-400" />
                </div>
                <div className="flex items-center w-8 h-8">
                  <FaceSmileIcon className="h-5 w-5 mx-auto text-gray-400" />
                </div>
                <div className="flex items-center w-8 h-8">
                  <CalendarIcon className="h-5 w-5 mx-auto text-gray-400" />
                </div>
                <div className="flex items-center w-8 h-8">
                  <MapPinIcon className="h-5 w-5 mx-auto text-gray-400" />
                </div>
              </div>
              <button
                disabled={!input}
                className="bg-twitter px-[0.6rem] py-[0.4rem] md:px-5 md:py-2 font-bold text-white text-sm md:text-base rounded-full disabled:opacity-40"
              >
                ひとこと
              </button>
            </div>
          </form>
          {isImageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-1 px-4">
              <input
                type="text"
                ref={imageInputRef}
                placeholder="画像のURLを入力してください"
                className="flex-1 bg-transparent p-2 text-white text-sm md:text-base outline-none placeholder:text-white"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                追加
              </button>
            </form>
          )}

          {image && (
            <picture>
              <img
                className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                src={image}
                alt="added image"
              />
            </picture>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
