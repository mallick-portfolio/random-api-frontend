import Header from "@/app/components/shared/Header";
import { getBoardById } from "@/app/utils/getPublicBoard";
import React from "react";

const BoardDetails = async ({ params }) => {
  const data = await getBoardById(params.id);
  let boardDetailsLog;
  if (data && data?.data) {
    boardDetailsLog = data?.data?.task_item?.map((column) => (
      <div key={column?.id}>
        <div>
          <div className="rounded-md border border-dashed p-2 border-primary  w-1/4 min-w-[250px] bg-[#ebe9e9]">
            <div className="flex justify-between items-center">
              <h2 className="p-2 text-2xl">{column?.title}</h2>
            </div>
            <div type="task">
              <div className="flex flex-col flex-grow gap-2 h-auto">
                {column?.tasks?.map((task, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-md p-3 text-black min-h-90 bg-base-100 cursor-pointer flex flex-col gap-y-2 justify-between relative"
                  >
                    <div className="flex gap-y-2 p-1 items-center">
                      <h4 className="text-lg">{task?.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div>
      <Header />
      <div className="container overflow-auto min-h-[calc(100vh-6.5rem)] p-4 rounded-md flex gap-5">
        {boardDetailsLog}
      </div>
    </div>
  );
};

export default BoardDetails;
