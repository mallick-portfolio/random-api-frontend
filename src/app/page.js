"use client";
import TaskBoard from "./components/home/TaskBoard";
import Header from "./components/shared/Header";
import { getPublicBoard } from "./utils/getPublicBoard";

export default async function Home() {
  const data = await getPublicBoard();
  let boardLog;
  if (data && data?.data?.length) {
    boardLog = data?.data?.map((board) => (
      <TaskBoard key={board?.id} board={board} />
    ));
  }
  return (
    <main className="">
      <Header />
      <div className="container">
        <h3 className="text-3xl">Notice board</h3>
        <div className="grid grid-cols-4 gap-5 mt-8">{boardLog}</div>
      </div>
    </main>
  );
}
