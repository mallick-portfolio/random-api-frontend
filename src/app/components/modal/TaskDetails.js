import {
  setRefetchTask,
  setShowTaskDetailModal,
} from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import {
  useDeleteTaskMutation,
  useTaskChecklistMutation,
  useTaskCommentsMutation,
} from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { checkListProgress } from "@/app/utils/helpers";
import { IoImageOutline } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import TaskComment from "./TaskComment";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const inputImageRef = useRef(null);
  const [itemName, setItemName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");

  const { showTaskDetailModal, taskDetails } = useSelector(
    (state) => state.modal
  );

  const { ref } = useComponentVisible(
    showTaskDetailModal,
    setShowTaskDetailModal
  );

  // api call
  const [handleDeleteTask, { isLoading, data }] = useDeleteTaskMutation();
  const [handleAddChecklist, { data: iData, isLoading: iLoading }] =
    useTaskChecklistMutation();

  const [handleCommment, { data: cData, isLoading: cLoading }] =
    useTaskCommentsMutation();

  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
      dispatch(setShowTaskDetailModal(false));
    } else if (data && data?.error) {
      toast.error(data?.message);
    }
  }, [data]);

  useEffect(() => {
    if (cData && cData?.success) {
      toast.success(cData?.message);
      setComment("");
    } else if (cData && cData?.error) {
      toast.error(cData?.message);
    }
  }, [cData]);

  useEffect(() => {
    if (iData && iData?.id) {
      toast.success("Task checklist added successfully");
      setItemName("");
      setSelectedId("");
      setSelectedId(null);
    } else if (iData && !iData?.id) {
      toast.error("Failed to add checklist!!!");
    }
  }, [iData]);

  useEffect(() => {
    if (selectedId) {
      handleUpdateChecklist();
    }
  }, [selectedId, isCompleted]);

  const handleAddItem = async () => {
    if (itemName && itemName !== "") {
      const formData = {
        title: itemName,
        task: taskDetails?.id,
      };
      await handleAddChecklist({
        formData,
        method: "POST",
      });
    }
  };
  const handleUpdateChecklist = async () => {
    const formData = {
      task: taskDetails?.id,
      is_completed: isCompleted,
      title: selectedItem?.title,
    };
    await handleAddChecklist({
      formData,
      method: "PUT",
      id: selectedId,
    });
  };

  const handleCommmentSubmit = () => {
    if (comment && comment !== "") {
      const data = {
        content: comment,
        task: taskDetails?.id,
      };
      handleCommment({ data });
    }
  };

  // image upload handler
  const onImageChangeCapture = async (e) => {
    const form = new FormData();
    const images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      form.append("image", images[i]);
      form.append("media_type", "image");
    }
    form.append("task", taskDetails?.id);
    form.append("media_type", "image");
    const res = await axios.post(
      `http://127.0.0.1:8000/api/v1/task-board/task/task-comment/attachment/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
          "Content-Type": "multipart/form-data;",
        },
      }
    );
    if (res?.status === 200) {
      dispatch(setRefetchTask(true));
    }
  };
  // image upload handler
  const onFileChangeCapture = async (e) => {
    const form = new FormData();
    const images = e.target.files;
    for (let i = 0; i < images.length; i++) {
      form.append("file", images[i]);
      form.append("media_type", "file");
    }
    form.append("task", taskDetails?.id);
    const res = await axios.post(
      `http://127.0.0.1:8000/api/v1/task-board/task/task-comment/attachment/`,
      form,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
          "Content-Type": "multipart/form-data;",
        },
      }
    );
    console.log(res)
    if (res?.status === 200) {
      dispatch(setRefetchTask(true));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  let taskChecklistItem;
  if (taskDetails?.taskLabels && taskDetails?.taskLabels?.length) {
    taskChecklistItem = taskDetails?.taskLabels?.map((item) => {
      return (
        <label key={item?.id} className="cursor-pointer label">
          <span className="label-text">{item?.title}</span>
          <input
            onChange={(e) => {
              setIsCompleted(e.target.checked);
              setSelectedId(item?.id);
              setSelectedItem(item);
            }}
            type="checkbox"
            checked={
              isCompleted && item?.id == selectedId
                ? isCompleted
                : item?.is_completed
            }
            className="checkbox checkbox-secondary"
          />
        </label>
      );
    });
  }

  return (
    <div>
      {showTaskDetailModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={ref} className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none min-w-[500px]">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {taskDetails?.title}
                  </h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-8 text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowTaskDetailModal(false))}
                  >
                    <span className=" text-red-500  text-2xl block outline-none focus:outline-none">
                      <HiMiniXMark />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto  max-h-[280px] overflow-y-auto">
                  <p className="">{taskDetails?.description}</p>

                  <div className="form-control mt-6">
                    <h4 className="text-xl font-semibold">Check list item</h4>
                    {Math.ceil(checkListProgress(taskDetails?.taskLabels))
                      ? Math.ceil(checkListProgress(taskDetails?.taskLabels))
                      : 0}
                    %
                    <progress
                      className="progress progress-secondary w-full mb-2"
                      value={checkListProgress(taskDetails?.taskLabels)}
                      max="100"
                    ></progress>
                    {taskChecklistItem}
                  </div>
                  <div className="my-2">
                    <label className="form-control w-full max-w-xs">
                      <input
                        onChange={(e) => setItemName(e.target.value)}
                        value={itemName}
                        type="text"
                        placeholder="Item name here"
                        className="input input-bordered focus:outline-none input-md w-full max-w-xs"
                      />
                    </label>
                    <button
                      disabled={iLoading}
                      onClick={handleAddItem}
                      className="btn btn-sm bg-first mt-1"
                      type="button"
                    >
                      Add Item
                    </button>
                  </div>
                  <TaskComment />
                  <div className="mt-5">
                    <input
                      type="file"
                      name="image"
                      accept=".png, .jpg, .jpeg, .webp"
                      hidden
                      ref={inputImageRef}
                      multiple
                      onChange={onImageChangeCapture}
                    />
                    <input
                      type="file"
                      name="image"
                      accept=".pdf,.xml, .txt"
                      hidden
                      ref={inputFileRef}
                      multiple
                      onChange={onFileChangeCapture}
                    />
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                      className="textarea textarea-bordered w-full"
                      placeholder="Comment"
                    ></textarea>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => inputImageRef.current.click()}
                        className="flex items-center justify-center "
                      >
                        <IoImageOutline />
                      </button>
                      <button
                        onClick={() => inputFileRef.current.click()}
                        className="flex items-center justify-center "
                      >
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
                    <button
                      disabled={cLoading}
                      onClick={handleCommmentSubmit}
                      className="btn btn-sm bg-first mt-1"
                      type="button"
                    >
                      Add comment
                    </button>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    disabled={isLoading}
                    onClick={() => handleDeleteTask(taskDetails?.id)}
                    className="btn btn-sm bg-second"
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm bg-first"
                    type="button"
                    onClick={() => dispatch(setShowTaskDetailModal(false))}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default TaskDetails;
