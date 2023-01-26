import React, { FC, useContext } from "react";
import { CommentModalContext } from "./Feed";

const CommentsModal: FC = () => {
  const { tweetId, handleOpen, handleClose } = useContext(CommentModalContext);
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => handleClose()}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full"></div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-lg font-medium text-gray-800">
                Delete account ?
              </h4>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="items-center gap-2 mt-3 sm:flex">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                  onClick={() => handleClose()}
                >
                  Delete
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => handleClose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
