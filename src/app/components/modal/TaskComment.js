import { formatDate } from "@/app/utils/helpers";
import React from "react";
import { useSelector } from "react-redux";
import Avater from "../shared/Avater";
import { IoDocumentAttachOutline } from "react-icons/io5";

const TaskComment = () => {
  const { taskDetails } = useSelector((state) => state.modal);

  return (
    <>
      {taskDetails?.task_comments?.map((comment) => {
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
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span class="sr-only">Comment settings</span>
                </button>
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
                <button
                  id="dropdownComment1Button"
                  data-dropdown-toggle="dropdownComment1"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span class="sr-only">Comment settings</span>
                </button>
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

export default TaskComment;
