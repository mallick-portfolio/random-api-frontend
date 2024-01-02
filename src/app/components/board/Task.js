import React from "react";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className="rounded-lg shadow-md p-8 text-black mb-8 min-h-90 ml-10 mr-10 bg-[#444] cursor-pointer flex flex-col justify-between"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {"  "}
              </small>
            </span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", padding: 2 }}
          >
            <div>{task.title}</div>
          </div>
          <div className="flex justify-end p-2">
            <div>
              <img
                onClick={() => console.log(task)}
                src={"https://joesch.moe/api/v1/random?key=" + task.id}
              />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
