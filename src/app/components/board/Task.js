import { useLazyGetTaskDetailsQuery } from "@/app/store/api/taskApi";
import {
  setRefetchTask,
  setSelectedTaskId,
  setShowTaskDetailModal,
  setTaskDetails,
} from "@/app/store/reducer/modalSlice";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import Loading from "../shared/Loading";
import { useSelector } from "react-redux";
import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

export default function Task({ task, index }) {
  const dispatch = useDispatch();
  const { refetchTask } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.global);

  // api call
  const [handleTaskDetails, results] = useLazyGetTaskDetailsQuery({
    refetchOnReconnect: true,
  });
  useEffect(() => {
    if (results && results.data) {
      dispatch(setTaskDetails(results.data?.data));
      dispatch(setRefetchTask(false));
    }
  }, [results]);

  useEffect(() => {
    if (refetchTask) {
      handleTaskDetails(task.id);
    }
  }, [refetchTask]);

  const handleTaskOpen = (task) => {
    const taskMembers = task?.authorize_users?.map((user) => user?.id);

    if (!task?.status) {
      dispatch(setShowTaskDetailModal(true));
      handleTaskDetails(task.id);
    } else if (taskMembers?.includes(user?.id)) {
      dispatch(setShowTaskDetailModal(true));
      handleTaskDetails(task.id);
    }
  };

  if (results.status == "pending") {
    return <Loading />;
  }
  return (
    <Draggable draggableId={`${task?.id}`} key={task?.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => handleTaskOpen(task)}
          className="rounded-lg shadow-md p-3 text-black min-h-90 bg-base-100 cursor-pointer flex flex-col gap-y-2 justify-between relative"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="flex gap-y-2 p-1 items-center">
            <h4 className="text-lg">{task?.title}</h4>
          </div>
          <div className="absolute top-2 flex gap-1 right-2">
            {task?.status ? (
              <FaLock className="text-red-500 text-lg" />
            ) : (
              <FaLockOpen className="text-red-500 text-lg" />
            )}
            {task?.user === user?.id ? <FaCheck /> : ""}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
