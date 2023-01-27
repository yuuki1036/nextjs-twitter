import { XMarkIcon } from "@heroicons/react/24/outline";
import { GUEST_NAME, GUEST_IMAGE_PATH } from "lib/constants";
import { useSession } from "next-auth/react";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ReactTextareaAutosize from "react-textarea-autosize";
import ReactTimeago from "react-timeago";
import { TComment, TCommentBody, TTweet } from "type";
import { fetchComments } from "utils/fetchComments";
import { CommentModalContext } from "./Feed";

const CommentsModal: FC = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || GUEST_NAME;
  const userImage = session?.user?.image || GUEST_IMAGE_PATH;

  const { selectedTweet, handleClose } = useContext(CommentModalContext);
  const tweet = selectedTweet as TTweet;
  // comment
  const [comments, setComments] = useState<TComment[]>([]);
  const [input, setInput] = useState<string>("");

  const refreshComments = async () => {
    const comments: TComment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: TCommentBody = {
      comment: input,
      username: userName,
      profileImg: userImage,
      tweetId: tweet._id,
    };
    const result = await fetch("/api/addComment", {
      body: JSON.stringify(data),
      method: "POST",
    });
    const json = await result.json();

    refreshComments();
    toast("Comment Posted", {
      icon: "🚀",
    });

    setInput("");
  };

  return (
    <div
      onClick={() => handleClose()}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-xl"
      >
        <div className="max-h-96 p-3 overflow-y-scroll">
          <div className="p-1 sticky">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full">
              <XMarkIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="flex flex-col">
              <picture>
                <img
                  className="w-11 h-11 rounded-full"
                  src={tweet.profileImg}
                  alt={tweet.username}
                />
              </picture>
              <div className="w-[2px] mx-auto bg-gray-200"></div>
            </div>
            <div>
              <div className="flex items-end space-x-1">
                <p className="mr-1 font-bold">{tweet.username}</p>
                {tweet.username !== GUEST_NAME && (
                  <p className="hidden text-sm text-gray-500 sm:inline">
                    @{tweet.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                )}
                <ReactTimeago
                  className="text-sm text-gray-500"
                  date={tweet._createdAt}
                />
              </div>

              <p className="whitespace-pre-wrap">{`${tweet.text}`}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex space-x-3">
              <picture className="w-11 h-11">
                <img
                  className="w-11 h-11 rounded-full"
                  src={userImage}
                  alt={userName}
                />
              </picture>
              <div className="">
                <ReactTextareaAutosize
                  maxRows={10}
                  minRows={3}
                  value={input}
                  autoFocus={true}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="なにかひとことどうぞ..."
                  className="mt-3 w-full outline-none md:placeholder:text-xl scrollbar-hide"
                />
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                disabled={!input}
                className="bg-twitter px-[0.4rem] py-1 md:px-5 md:py-2 font-bold text-white rounded-full disabled:opacity-40"
              >
                ひとこと
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
