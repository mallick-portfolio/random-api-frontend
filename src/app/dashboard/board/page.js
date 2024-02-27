"use client";
import Column from "@/app/components/board/Column";
import AddBoard from "@/app/components/modal/AddBoard";
import Loading from "@/app/components/shared/Loading";
import { useGetAllBoardQuery } from "@/app/store/api/taskApi";
import { setShowAddBoardModal } from "@/app/store/reducer/modalSlice";
import initialData from "@/lib/data";
import isAuth from "@/lib/isAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import empty from "../../../../public/image/board.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";

const Board = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllBoardQuery();

  useEffect(() => {
    if (data && data?.success) {
      toast.success(data.message);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className=" p-2 border-primary py-5 flex text-2xl justify-center items-center  text-center">
          Task board
        </h1>
        <button
          onClick={() => dispatch(setShowAddBoardModal(true))}
          className="btn btn-sm bg-first"
        >
          Add board
        </button>
      </div>
      {data && data?.data?.length ? (
        <div className="flex justify-center flex-col items-center">
          <h1 className=" p-2 border-primary py-5 flex text-2xl justify-start items-center  text-center">
            List of your board
          </h1>
          <ul className="menu bg-base-200 w-56 rounded-box">
            {data?.data?.map((board) => (
              <li key={board?.unique_id}>
                <Link href={`/dashboard/board/${board?.unique_id}`}>
                  {board?.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-center text-secondary">
            Ops!!!. You have no board yet. <br />
            Start from add board button
          </h2>
          <Image className=" " src={empty} />
        </div>
      )}
      <AddBoard />
    </div>
  );
};

export default isAuth(Board);
