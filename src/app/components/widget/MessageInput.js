import { setMessages } from "@/app/store/reducer/dataSlice";
import { setShowChatBox } from "@/app/store/reducer/modalSlice";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { use, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";

const MessageInput = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const { messages } = useSelector((state) => state.apiStateData);
  const { user } = useSelector((state) => state.global);

  const [socketUrl, setSocketUrl] = useState(
    `ws://localhost:8000/ws/message/${id}/?token=${Cookies.get("auth_token")}`
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      const newMessage = JSON.parse(lastMessage.data);
      const totalMessage = [...messages, newMessage];
      dispatch(setMessages(totalMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log(connectionStatus);

  useEffect(() => {
    if (connectionStatus && connectionStatus === "Closed") {
      dispatch(setShowChatBox(false));
    }
  }, [connectionStatus]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (inputText !== "") {
      const data = {
        content: inputText,
        message_type: "text",
        sender: user?.id,
      };
      sendMessage(JSON.stringify(data));
      setInputText("");
    }
  };

  return (
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
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}
            className="flex w-full border rounded-xl text-primary focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
        </div>
      </div>
      <div className="">
        <button
          onClick={() => handleSend()}
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
  );
};

export default MessageInput;
