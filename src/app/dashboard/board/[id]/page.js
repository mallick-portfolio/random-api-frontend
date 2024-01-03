"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetBoardDetailsQuery } from "@/app/store/api/taskApi";
import Loading from "@/app/components/shared/Loading";
import { toast } from "react-toastify";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "@/app/components/board/Column";
import isAuth from "@/lib/isAuth";
import AddColumnModal from "@/app/components/modal/AddColumnModal";
import { setShowAddColumnModal } from "@/app/store/reducer/modalSlice";
import { useDispatch } from "react-redux";
import AddTask from "@/app/components/modal/AddTask";
const BoardDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

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
    <div>
      <h1 className=" p-2 border-primary py-5 flex text-2xl justify-center items-center  text-center">
        Task board
      </h1>
      <div className="overflow-auto min-h-[calc(100vh-6.5rem)] p-4 rounded-md">
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

                <div
                  onClick={() => dispatch(setShowAddColumnModal(true))}
                  className="rounded-md border min-w-[250px] border-dashed p-2 border-primary flex  w-1/4 text-2xl justify-center items-center bg-[#dddcdc] h-12 text-center cursor-pointer"
                >
                  Add column
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <AddColumnModal />
      <AddTask />
    </div>
  );
};

export default isAuth(BoardDetails);
