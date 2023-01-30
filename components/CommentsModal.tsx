import { FC, useContext, useLayoutEffect, useState } from "react";
import { TComment, TCommentBody, TTweet } from "type";
import { CommentModalContext, FetchTweetContext } from "contexts/contexts";
import { GUEST_NAME, GUEST_IMAGE_PATH } from "lib/constants";
import { useSession } from "next-auth/react";
import { fetchComments } from "utils/fetchComments";
import ReactTextareaAutosize from "react-textarea-autosize";
import ReactTimeago from "react-timeago";
import { Flipped, Flipper } from "react-flip-toolkit";
import { toast } from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CommentsModal: FC = () => {
  const { data: session } = useSession();
  const userName = session?.user?.name || GUEST_NAME;
  const userImage = session?.user?.image || GUEST_IMAGE_PATH;
  const { fetchRefresh } = useContext(FetchTweetContext);
  const { selectedTweet, handleClose } = useContext(CommentModalContext);
  const tweet = selectedTweet as TTweet;
  // comment
  const [comments, setComments] = useState<TComment[]>([]);
  const [input, setInput] = useState<string>("");

  const refreshComments = async () => {
    const comments = await fetchComments(tweet._id);
    setComments(comments);
  };

  useLayoutEffect(() => {
    refreshComments();
  }, []);

  const addComment = async () => {
    const data: TCommentBody = {
      comment: input,
      username: userName,
      profileImg: userImage,
      tweetId: tweet._id,
    };
    await fetch("/api/addComment", {
      body: JSON.stringify(data),
      method: "POST",
    });
    // update comments
    refreshComments();
    // refresh background feed
    fetchRefresh();
    return Promise.resolve();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = addComment();
    toast.promise(promise, {
      loading: <b>投稿中...</b>,
      success: <b>ひとことかえしました！</b>,
      error: <b>投稿に失敗しました...</b>,
    });

    setInput("");
  };

  return (
    <div
      onClick={() => handleClose()}
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/40"
    >
      {/* modal body */}
      <div className="w-full max-w-lg mx-3 md:mx-0 rounded-xl bg-white py-2 pl-1 pr-2 pt-0">
        {/* sticky top area  */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-h-[80vh] overflow-y-scroll rounded-xl"
        >
          <div className="px-1 py-3 sticky top-0 z-20 backdrop-blur-sm bg-white/80 rounded-2xl">
            <div
              onClick={() => handleClose()}
              className="w-[2.2rem] h-[2.2rem] flex items-center justify-center hover:bg-gray-200 rounded-full transition-all duration-200 ease-out cursor-pointer"
            >
              <XMarkIcon className="w-[1.4rem] h-[1.4rem]" />
            </div>
          </div>
          {/* content */}
          <div className="p-2">
            {/* quoted tweet */}
            <div className="flex space-x-2">
              <div className="flex flex-col">
                <picture>
                  <img
                    className="w-12 h-12 mb-1 rounded-full"
                    src={tweet.profileImg}
                    alt={tweet.username}
                  />
                </picture>
                <div className="flex-1 w-[2px] mx-auto bg-gray-400"></div>
              </div>
              <div>
                <div className="flex items-end">
                  <p className="mr-1 font-bold">{tweet.username}</p>
                  {tweet.username !== GUEST_NAME ? (
                    <p className="hidden text-sm text-gray-500 sm:inline">
                      @{tweet.username.replace(/\s+/g, "").toLowerCase()}&nbsp;
                      {"･"}
                    </p>
                  ) : (
                    <span className="mr-1"></span>
                  )}
                  <ReactTimeago
                    className="text-sm text-gray-500"
                    date={tweet._createdAt}
                  />
                </div>

                <p className="mb-7 whitespace-pre-wrap">{`${tweet.text}`}</p>
              </div>
            </div>
            {/* comment form */}
            <form onSubmit={handleSubmit} className="mt-1">
              <div className="flex space-x-2">
                <picture>
                  <img
                    className="w-12 h-12 rounded-full"
                    src={userImage}
                    alt={userName}
                  />
                </picture>
                <ReactTextareaAutosize
                  maxRows={10}
                  minRows={3}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="なにかひとことどうぞ..."
                  className="flex-1 w-full mt-[0.6rem] outline-none md:placeholder:text-xl scrollbar-hide"
                />
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  disabled={!input}
                  className="bg-twitter px-[0.6rem] py-1 md:px-5 md:py-2 font-bold text-white text-sm md:text-base rounded-full disabled:opacity-40"
                >
                  ひとこと
                </button>
              </div>
            </form>
            {/* other comments */}
            <div>
              {comments?.length > 0 && (
                <Flipper flipKey={comments} spring="wobbly">
                  <hr className="my-4" />
                  {comments.map((comment, idx) => (
                    <Flipped key={comment._id} flipId={comment._id}>
                      <div className="flex space-x-2 mt-1">
                        <div className="flex flex-col">
                          <picture>
                            <img
                              className="w-12 h-12 mb-1 rounded-full"
                              src={comment.profileImg}
                              alt={comment.username}
                            />
                          </picture>
                          {idx !== comments.length - 1 && (
                            <div className="flex-1 w-[2px] mx-auto bg-gray-400"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-end space-x-1">
                            <p className="mr-1 font-bold">{comment.username}</p>
                            {comment.username !== GUEST_NAME ? (
                              <p className="hidden text-sm text-gray-500 sm:inline">
                                @
                                {comment.username
                                  .replace(/\s+/g, "")
                                  .toLowerCase()}
                                &nbsp;
                                {"･"}
                              </p>
                            ) : (
                              <span className="mr-1"></span>
                            )}
                            <ReactTimeago
                              className="text-sm text-gray-500"
                              date={comment._createdAt}
                            />
                          </div>
                          <p className="mb-7 whitespace-pre-wrap">{`${comment.comment}`}</p>
                        </div>
                      </div>
                    </Flipped>
                  ))}
                </Flipper>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
