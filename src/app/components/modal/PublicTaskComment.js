import { formatDate } from "@/app/utils/helpers";
import React from "react";
import Avater from "../shared/Avater";
import { IoDocumentAttachOutline } from "react-icons/io5";

const PublicTaskComments = ({ comments }) => {
  return (
    <>
      {comments?.map((comment) => {
        if (comment?.comment_type === "text") {
          return (
            <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <Avater
                      css={"w-10"}
                      name={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                    />
                  </p>
                  <div className="flex flex-col">
                    <p>
                      {comment?.user?.first_name} {comment?.user?.last_name}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {formatDate(comment?.created_at)}
                      </time>
                    </p>
                  </div>
                </div>
              </footer>
              <p class="text-gray-500 dark:text-gray-400">{comment?.content}</p>
            </article>
          );
        } else if (comment?.comment_type === "media") {
          return (
            <article class="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <Avater
                      css={"w-10"}
                      name={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                    />
                  </p>
                  <div className="flex flex-col">
                    <p>
                      {comment?.user?.first_name} {comment?.user?.last_name}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        {formatDate(comment?.created_at)}
                      </time>
                    </p>
                  </div>
                </div>
              </footer>
              <div className="flex flex-wrap gap-1">
                {comment?.task_attachments?.map((att) => {
                  if (att?.media_type === "image") {
                    return (
                      <img
                        key={att?.id}
                        className=" rounded-lg w-32 h-auto"
                        alt="message image "
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}` + att.image}
                      />
                    );
                  } else if (att?.media_type === "file") {
                    return (
                      <div
                        key={att?.id}
                        className="chat-bubble flex bg-gradient-to-r from-pink-400 to-pink-600"
                      >
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
            </article>
          );
        }
      })}
    </>
  );
};

export default PublicTaskComments;
