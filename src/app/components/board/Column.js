import React from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  setSelectedTaskItem,
  setShowAddTaskModal,
  setShowDeleteTaskItemModal,
} from "@/app/store/reducer/modalSlice";
import { MdDelete } from "react-icons/md";

const Column = ({ tasks, column, index }) => {
  const dispatch = useDispatch();
  return (
    <Draggable
      draggableId={`draggableId${column.id}`}
      index={index}
      type="column"
    >
      {(provided) => (
        <div>
          <div
            className="rounded-md border border-dashed p-2 border-primary  w-1/4 min-w-[250px] bg-[#ebe9e9]"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex justify-between items-center">
              <h2 className="p-2 text-2xl">{column.title}</h2>

              <button
                onClick={() => {
                  dispatch(setShowDeleteTaskItemModal(true));
                  dispatch(setSelectedTaskItem(column.id));
                }}
                className="p-1 rounded-full border border-red-500 ml-auto text-red-500 float-right font-semibold outline-none focus:outline-none"
              >
                <span className=" text-red-500  text-sm block outline-none focus:outline-none">
                  <MdDelete />
                </span>
              </button>
            </div>
            <Droppable droppableId={`droppableId${column.id}`} type="task">
              {(provided, snapshot) => (
                <div
                  className="flex flex-col flex-grow gap-2 h-auto"
                  isDraggingOver={snapshot.isDraggingOver}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks.map((task, index) => (
                    <Task key={task?.id} task={task} index={index} />
                  ))}

                  {provided.placeholder}
                  <div
                    onClick={() => {
                      dispatch(setShowAddTaskModal(true));
                      dispatch(setSelectedTaskItem(column.id));
                    }}
                    className="rounded-md border btn btn-sm mt-4 border-primary flex  text-xl justify-center items-center bg-[#dddcdc] text-center cursor-pointer"
                  >
                    Add Task
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
