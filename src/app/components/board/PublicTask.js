"use client";
import React, { useState } from "react";
import PublicTaskDetails from "../modal/PublicTaskDetails";

const PublicTask = ({ task, index }) => {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  return (
    <>
      <div
        onClick={() => {
          setSelectedTask(task);
          setShowTaskDetails(true);
        }}
        key={index}
        className="rounded-lg shadow-md p-3 text-black min-h-90 bg-base-100 cursor-pointer flex flex-col gap-y-2 justify-between relative"
      >
        <div className="flex gap-y-2 p-1 items-center">
          <h4 className="text-lg">{task?.title}</h4>
        </div>
      </div>
      <PublicTaskDetails
        setShowTaskDetails={setShowTaskDetails}
        showTaskDetails={showTaskDetails}
        taskDetails={selectedTask}
      />
    </>
  );
};

export default PublicTask;
