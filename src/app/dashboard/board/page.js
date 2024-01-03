"use client";
import Column from "@/app/components/board/Column";
import initialData from "@/lib/data";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [starter, setStarter] = useState(initialData);

  const onDragEnd = (e) => {
    console.log(e);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-column"
          type="column"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              className="flex gap-3"
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {starter.columnOrder.map((columnId, index) => {
                const column = starter.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => starter.tasks[taskId]
                );

                return (
                  <Column
                    index={index}
                    key={column.id}
                    column={column}
                    tasks={tasks}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
