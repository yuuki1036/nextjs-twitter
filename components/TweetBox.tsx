import {
  CalendarIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { TTweet, TTweetBody } from "type";
import { fetchTweets } from "utils/fetchTweets";

type Props = {
  setTweets: Dispatch<SetStateAction<TTweet[]>>;
};

const TweetBox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
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
    const tweetBody: TTweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "public/unknown-user.jpg",
      image: image,
    };
    const result = await fetch("/api/addTweet", {
      body: JSON.stringify(tweetBody),
      method: "POST",
    });

    const json = await result.json();

    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postTweet();

    setInput("");
    setImage("");
    setIsImageUrlBoxOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 w-14 h-14 rounded-full object-cover"
        src={session?.user?.image || "public/unknown-user.jpg"}
      />
      <div className="flex flex-1 items-center pl-2">
        <div className="flex flex-1 flex-col">
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's happening?"
              className="h-24 w-full outline-none placeholder:text-xl"
            />
            <div className="flex items-center">
              <div className="flex flex-1 space-x-2 text-twitter">
                <PhotoIcon
                  onClick={() => {
                    setIsImageUrlBoxOpen(!isImageUrlBoxOpen);
                  }}
                  className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                />
                <MagnifyingGlassIcon className="h-5 w-5" />
                <FaceSmileIcon className="h-5 w-5" />
                <CalendarIcon className="h-5 w-5" />
                <MapPinIcon className="h-5 w-5" />
              </div>
              <button
                onClick={handleSubmit}
                disabled={!input || !session}
                className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
              >
                Tweet
              </button>
            </div>
          </form>
          {isImageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                type="text"
                ref={imageInputRef}
                placeholder="Enter Image URL..."
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetBox;
