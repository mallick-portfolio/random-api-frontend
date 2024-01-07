import { setShowChatBox } from "@/app/store/reducer/modalSlice";
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Widget = () => {
  const dispatch = useDispatch();
  const { showChatBox } = useSelector((state) => state.modal);
  const { id } = useParams();
  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8000/ws/message/${id}/`
  );
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  console.log(lastMessage?.data);

  const handleClickSendMessage = useCallback((data) => {
    console.log(data);
    sendMessage("Hello");
  }, []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log(connectionStatus);
  return (
    <div className="">
      <div
        className={`fixed right-3  shadow-2xl bottom-4 bg-gradient-to-r from-emerald-400 to-cyan-400 artboard phone-1 rounded-2xl max-h-[480px] transition-opacity ease-in-out delay-150 duration-300 ${
          showChatBox ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-full">
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-t-xl px-2 py-3 flex justify-between items-center">
            <h3>hello world </h3>
            <button
              onClick={() => dispatch(setShowChatBox(false))}
              className="p-1 rounded-full border border-white ml-auto float-right font-semibold outline-none focus:outline-none"
            >
              <span className=" text-white  text-2xl block outline-none focus:outline-none">
                <HiMiniXMark />
              </span>
            </button>
          </div>
          <div className="px-2 overflow-y-scroll max-h-[375px]">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                You were the Chosen One!
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                I hate you!
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                You were the Chosen One!
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                I hate you!
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                You were the Chosen One!
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                I hate you!
              </div>
            </div>
          </div>
          <div className="flex gap-1 absolute bottom-0 right-0 left-0 flex-row items-center h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white w-full px-2">
            <div>
              <button className="flex items-center justify-center ">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-grow">
              <div className="relative w-full">
                <input
                  type="text"
                  className="flex w-full border rounded-xl text-primary focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
              </div>
            </div>
            <div className="">
              <button
                onClick={() => handleClickSendMessage()}
                className="flex items-center justify-center text-white"
              >
                <span className="">
                  <svg
                    className="w-5 h-5 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
