import { setShowTaskDetailModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import {
  useDeleteTaskMutation,
  useTaskChecklistMutation,
} from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { checkListProgress } from "@/app/utils/helpers";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
      dispatch(setShowTaskDetailModal(false));
    } else if (data && data?.error) {
      toast.error(data?.message);
    }
  }, [data]);

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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none min-w-96">
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
                    {Math.ceil(checkListProgress(taskDetails?.taskLabels))}%
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
