import { getPublicBoard } from "@/app/utils/getPublicBoard";
import Image from "next/image";
import React from "react";
import empty from "../../../../public/image/board.jpg";
import TaskBoard from "@/app/components/home/TaskBoard";

const page = async () => {
  const data = await getPublicBoard();
  let boardLog;
  if (data && data?.data?.length) {
    boardLog = data?.data?.map((board) => (
      <TaskBoard key={board?.id} board={board} />
    ));
  }
  return (
    <div>
      <div className="container">
        <div className="py-8 ">
          <div className="grid grid-cols-4 gap-5 mt-8">{boardLog}</div>
        </div>
        {data && !data?.data?.length ? (
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-center text-secondary">
              Ops!!!. No public board found
            </h2>
            <Image className=" " src={empty} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default page;
