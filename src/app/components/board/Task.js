import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task?.id}`} key={task?.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="rounded-lg shadow-md p-3 text-black min-h-90 bg-base-100 cursor-pointer flex flex-col gap-y-2 justify-between"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="flex gap-y-2 p-1 items-center">
            <h4 className="text-lg">{task?.title}</h4>
          </div>

          <div className="flex justify-end p-2">
            <div>
              <img
                onClick={() => console.log(task)}
                src={"https://joesch.moe/api/v1/random?key=" + task?.id}
              />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
