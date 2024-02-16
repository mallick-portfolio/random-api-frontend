"use client";
import { Slide } from "react-toastify";
import TaskBoard from "./components/home/TaskBoard";
import Header from "./components/shared/Header";
import { getPublicBoard } from "./utils/getPublicBoard";
import Slider from "./components/home/Slider";
import Footer from "./components/shared/Footer";

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
      <Slider />
      <div className="container">
        <h3 className="text-3xl">Notice board</h3>
        <div className="grid grid-cols-4 gap-5 mt-8">{boardLog}</div>
      </div>
      <Footer />
    </main>
  );
}
