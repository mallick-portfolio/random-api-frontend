"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetBoardDetailsQuery,
  useMoveColumnMutation,
  useMoveTaskMutation,
} from "@/app/store/api/taskApi";
import { toast } from "react-toastify";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "@/app/components/board/Column";
import isAuth from "@/lib/isAuth";
import AddColumnModal from "@/app/components/modal/AddColumnModal";
import {
  setShowAddColumnModal,
  setShowDeleteBoardModal,
  setShowInviteBoardModal,
} from "@/app/store/reducer/modalSlice";
import { useDispatch } from "react-redux";
import AddTask from "@/app/components/modal/AddTask";
import Link from "next/link";
import { IoIosArrowDropdown } from "react-icons/io";
import DeleteBoardModal from "@/app/components/modal/DeleteBoardModal";
import DeleteTaskItemModal from "@/app/components/modal/DeleteTaskItemModal";
import TaskDetails from "@/app/components/modal/TaskDetails";
import Widget from "@/app/components/widget/Widget";
import { useSelector } from "react-redux";
import WidgetToggler from "@/app/components/widget/WidgetToggler";
import InviteIntoBoard from "@/app/components/modal/InviteIntoBoard";
import { setMessages } from "@/app/store/reducer/dataSlice";

const BoardDetails = () => {
  const dispatch = useDispatch();
  const {
    showChatBox,
    showAddColumnModal,
    showAddTaskModal,
    showDeleteBoardModal,
    showDeleteTaskItemModal,
    showTaskDetailModal,
    showInviteBoardModal,
  } = useSelector((state) => state.modal);

  const params = useParams();
  const [handleMoveColumn, { data: cData, isLoading: cIsLoading }] =
    useMoveColumnMutation();
  const [handleMoveTask, { data: tData, isLoading: tIsLoading }] =
    useMoveTaskMutation();

  const { data, isLoading, isError } = useGetBoardDetailsQuery(params.id);

  useEffect(() => {
    if (data && data?.success) {
      dispatch(setMessages(data?.data?.messages));
    }
  }, [data]);

  const onDragEnd = async (e) => {
    const { source, destination, type, draggableId } = e;

    if (!destination) return;
    if (type == "column") {
      const numericPart = draggableId.match(/\d+/);
      const id = parseInt(numericPart[0], 10);
      const data = {
        position: destination?.index + 1,
        board: params.id,
      };
      if (id != undefined) {
        await handleMoveColumn({ data, id });
        return;
      }
    } else if (type == "task") {
      const numericPart = destination?.droppableId?.match(/\d+/);
      const task_item = parseInt(numericPart[0], 10);
      const id = draggableId;
      const new_position = destination?.index + 1;
      const data = {
        new_position,
        task_item,
      };
      await handleMoveTask({ data, id });
    }
  };
  // if (isLoading || cIsLoading) {
  //   return <Loading />;
  // }
  if (isError && !isLoading) {
    toast.error("Board id not found. Invalid board id");
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className=" p-2 border-primary py-5 flex text-2xl justify-center items-center  text-center">
          {data?.data?.board?.title}
        </h1>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm m-1">
            <IoIosArrowDropdown className="text-xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44"
          >
            <li>
              <Link href={"/dashboard/board"}>Back</Link>
            </li>
            <li>
              <button onClick={() => dispatch(setShowInviteBoardModal(true))}>
                Invite member
              </button>
            </li>
            <li className="text-error">
              <button onClick={() => dispatch(setShowDeleteBoardModal(true))}>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
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
      {<Widget />}
      {!showChatBox && <WidgetToggler />}
      {showAddColumnModal && <AddColumnModal />}
      {showAddTaskModal && <AddTask />}
      {showDeleteBoardModal && <DeleteBoardModal />}
      {showDeleteTaskItemModal && <DeleteTaskItemModal />}
      {showTaskDetailModal && <TaskDetails />}
      {showInviteBoardModal && <InviteIntoBoard />}
    </div>
  );
};

export default isAuth(BoardDetails);
