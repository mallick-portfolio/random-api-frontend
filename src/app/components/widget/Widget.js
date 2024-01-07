import { setShowChatBox } from "@/app/store/reducer/modalSlice";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Message from "./Message";
import MessageInput from "./MessageInput";

const Widget = ({ boardDetails }) => {
  console.log(boardDetails);
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
            <div className="flex gap-2 items-center">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>{" "}
              <h3 className="font-semibold">
                {boardDetails?.title?.length < 20
                  ? boardDetails?.title
                  : boardDetails?.title?.slice(0, 20)}
              </h3>
            </div>
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
