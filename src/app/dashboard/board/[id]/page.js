"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetBoardDetailsQuery } from "@/app/store/api/taskApi";
import Loading from "@/app/components/shared/Loading";
import { toast } from "react-toastify";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "@/app/components/board/Column";
import initialData from "@/lib/data";
import isAuth from "@/lib/isAuth";
const BoardDetails = () => {
  const params = useParams();
  const [starter, setStarter] = useState(initialData);

  const { data, isLoading, isError } = useGetBoardDetailsQuery(params.id);
  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
    }
  }, [data]);
  const onDragEnd = (e) => {
    console.log(e);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError && !isLoading) {
    toast.error("Board id not found. Invalid board id");
  }
  return (
    <div className="overflow-x-auto h-[calc(100vh-100px)">
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
              {data?.data?.task_item?.length &&
                data?.data?.task_item.map((taskItem, index) => {
                  const column = taskItem;
                  return (
                    <Column
                      index={index}
                      key={column.id}
                      column={column}
                      tasks={taskItem?.tasks}
                    />
                  );
                })}
              {provided.placeholder}
              <div className="rounded-md border min-w-[250px] border-dashed p-2 border-primary py-5 flex  w-1/4 text-2xl justify-center items-center bg-[#dddcdc] h-16 text-center cursor-pointer">
                Add new column
              </div>
              <div className="rounded-md border min-w-[250px] border-dashed p-2 border-primary py-5 flex  w-1/4 text-2xl justify-center items-center bg-[#dddcdc] h-16 text-center cursor-pointer">
                Add new column
              </div>
              <div className="rounded-md border min-w-[250px] border-dashed p-2 border-primary py-5 flex  w-1/4 text-2xl justify-center items-center bg-[#dddcdc] h-16 text-center cursor-pointer">
                Add new column
              </div>
              <div className="rounded-md border min-w-[250px] border-dashed p-2 border-primary py-5 flex  w-1/4 text-2xl justify-center items-center bg-[#dddcdc] h-16 text-center cursor-pointer">
                Add new column
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default isAuth(BoardDetails);
