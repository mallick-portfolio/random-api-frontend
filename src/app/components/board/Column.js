import React from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({ tasks, column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index} type="column">
      {(provided) => (
        <div
          className="m-2 rounded-md border border-primary flex flex-col w-1/3 bg-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2 className="p-2">{column.title}</h2>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className="p-2 flex-grow min-h-[100px]"
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
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
