import React from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({ tasks, column, index }) => {
  return (
    <Draggable
      draggableId={`draggableId${column.id}`}
      index={index}
      type="column"
    >
      {(provided) => (
        <div
          className="rounded-md border border-dashed p-2 border-primary py-5 flex flex-col w-1/4 min-w-[250px] bg-[#ebe9e9] "
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2 className="p-2 text-2xl">{column.title}</h2>
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
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
