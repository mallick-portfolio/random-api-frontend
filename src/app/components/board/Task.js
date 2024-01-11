import { useLazyGetTaskDetailsQuery } from "@/app/store/api/taskApi";
import {
  setSelectedTaskId,
  setShowTaskDetailModal,
  setTaskDetails,
} from "@/app/store/reducer/modalSlice";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import Loading from "../shared/Loading";

export default function Task({ task, index }) {
  const dispatch = useDispatch();
  // api call
  const [handleTaskDetails, results] = useLazyGetTaskDetailsQuery();
  useEffect(() => {
    if (results && results.data) {
      dispatch(setTaskDetails(results.data?.data));
    }
  }, [results]);

  if (results.status == "pending") {
    return <Loading />;
  }
  return (
    <Draggable draggableId={`${task?.id}`} key={task?.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={() => {
            handleTaskDetails(task.id);
            dispatch(setShowTaskDetailModal(true));
          }}
          className="rounded-lg shadow-md p-3 text-black min-h-90 bg-base-100 cursor-pointer flex flex-col gap-y-2 justify-between"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="flex gap-y-2 p-1 items-center">
            <h4 className="text-lg">{task?.title}</h4>
          </div>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
