import { timeDifference } from "@/app/utils/helpers";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Avater from "../shared/Avater";
import { IoDocumentAttachOutline } from "react-icons/io5";

const Message = () => {
  const ref = useRef();
  const { messages } = useSelector((state) => state.apiStateData);
  const { user } = useSelector((state) => state.global);

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
      if (message?.message_type === "media") {
        return (
          <div
            className={`chat ${
              message?.sender.id === user?.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                <Avater
                  css={"bg-second w-10"}
                  name={`${message?.sender?.first_name} ${message?.sender?.last_name}`}
                />
              </div>
            </div>
            <div className="chat-header">
              {message?.sender?.first_name}{" "}
              <time className="text-xs opacity-50">
                {timeDifference(message?.created_at)}
              </time>
            </div>
            <div className=" p-1 flex flex-col gap-1 bg-transparent">
              {message?.attachments?.map((att) => {
                console.log(att?.media_type === "file");
                if (att?.media_type === "image") {
                  return (
                    <img
                      className=" rounded-lg w-32 h-auto"
                      alt="message image "
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}` + att.image}
                    />
                  );
                } else if (att?.media_type === "file") {
                  return (
                    <div className="chat-bubble bg-gradient-to-r from-pink-400 to-pink-600">
                      <a
                        target="_blank"
                        href={
                          `${process.env.NEXT_PUBLIC_MEDIA_URL}` +
                          att.media_file
                        }
                      >
                        <IoDocumentAttachOutline className="text-white  text-2xl cursor-pointer" />
                      </a>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div
            className={`chat ${
              message?.sender.id === user?.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                <Avater
                  css={"bg-second w-10"}
                  name={`${message?.sender?.first_name} ${message?.sender?.last_name}`}
                />
              </div>
            </div>
            <div className="chat-header">
              {message?.sender?.first_name}{" "}
              <time className="text-xs opacity-50">
                {timeDifference(message?.created_at)}
              </time>
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
    <div className="px-2 overflow-y-scroll sm:max-h-[375px]">
      {messageLog}
      <div className="mb-5" ref={ref}></div>
    </div>
  );
};

export default Message;
