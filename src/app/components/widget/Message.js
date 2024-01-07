import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = () => {
  const ref = useRef();
  const { messages } = useSelector((state) => state.apiStateData);
  const { user } = useSelector((state) => state.global);

  console.log(user?.id);
  const handleScrollToBottom = () => {
    ref.current.scrollIntoView();
  };

  useEffect(() => {
    if (ref.current) {
      handleScrollToBottom();
    }
  }, [ref, messages]);

  let messageLog = "";
  if (messages && messages?.length) {
    messageLog = messages?.map((message) => {
      if (message?.sender.id === user?.id) {
        return (
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
              {message?.content}
            </div>
          </div>
        );
      } else {
        return (
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
              {message?.content}
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className="px-2 overflow-y-scroll max-h-[375px]">
      {messageLog}
      <div ref={ref}></div>
    </div>
  );
};

export default Message;
