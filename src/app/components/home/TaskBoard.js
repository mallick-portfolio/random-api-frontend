import Link from "next/link";
import React from "react";

const TaskBoard = ({ board }) => {
  return (
    <Link
      href={`/board/${board?.unique_id}`}
      // onClick={() => handleTaskOpen(task)}
      className="rounded-lg shadow-md p-3 text-black min-h-90 bg-base-300 cursor-pointer flex flex-col gap-y-2 justify-between relative"
    >
      <div className="flex gap-y-2 p-1 items-center">
        <h4 className="text-lg">{board?.title}</h4>
      </div>
    </Link>
  );
};

export default TaskBoard;
