import { setShowChatBox } from "@/app/store/reducer/modalSlice";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Message from "./Message";
import MessageInput from "./MessageInput";

const Widget = () => {
  const dispatch = useDispatch();
  const { showChatBox } = useSelector((state) => state.modal);

  return (
    <div className="">
      <div
        className={`fixed right-3  shadow-2xl bottom-4 bg-gradient-to-r from-emerald-400 to-cyan-400 artboard phone-1 rounded-2xl max-h-[480px] transition-opacity ease-in-out delay-150 duration-300 ${
          showChatBox ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative h-full">
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-t-xl px-2 py-3 flex justify-between items-center">
            <h3>hello world </h3>
            <button
              onClick={() => dispatch(setShowChatBox(false))}
              className="p-1 rounded-full border border-white ml-auto float-right font-semibold outline-none focus:outline-none"
            >
              <span className=" text-white  text-2xl block outline-none focus:outline-none">
                <HiMiniXMark />
              </span>
            </button>
          </div>
          <Message />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Widget;
